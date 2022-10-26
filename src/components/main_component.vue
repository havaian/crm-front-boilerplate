<template>
    <div class="wrapper">
        <div class="add_product">
            <div class="add_product_icon">
                ➕
            </div>
        </div>
        <table class="data_table">
            <thead>

            </thead>
            <tbody>

            </tbody>
        </table>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {

    },
    mounted() {

        let table_data;

        axios.get('http://localhost:8080/get-all-products')
        .then((res) => {
            table_data = res.data;
            let thead_html = `
                <!-- <th></th> -->
                <th class="index">№</th>
            `;
            let tbody_html = '';

            for (let x in res.data[0]) {
                if (x != '_id' && x != '__v') {
                    thead_html += `
                        <th class="${x}">${x}</th>
                    `;
                }
            }
            thead_html += `
                <th class="link"></td>
            `
            $('thead').html(thead_html);
            for (let y in res.data) {
                tbody_html += `
                    <tr class="product">
                        <!-- <td><input class='product_checkbox_input' data-value=${res.data[y]['_id']} type="checkbox"></td> -->
                        <td class="index-number">${parseInt(y)+1}</td>
                `
                for (let x in res.data[y]) {
                    if (x != '_id' && x != '__v') {
                        if (x != 'createdAt' && x != 'updatedAt' && x != 'description' && x != 'price') {
                            tbody_html += `
                                <td class="${x}">
                                    ${res.data[y][x]}
                                </td>  
                            `;
                        } else {
                            if (x === 'description') {
                                let new_string = res.data[y][x].split('.');
                                tbody_html += `
                                    <td class="${x}">
                                        ${new_string[0] + '...'}
                                    </td>  
                                `;
                            } else if (x === 'price') {
                                tbody_html += `
                                    <td class="${x}">
                                        $${res.data[y][x]}
                                    </td>  
                                `;
                            } else if (x === '_v') {
                                tbody_html += `
                                    <td class="${x}">
                                        <code>${res.data[y][x]}</code>
                                    </td>
                                `;
                            } else if (x === 'createdAt') {
                                let new_string = new Date(res.data[y][x]).toLocaleString('uz-UZ');
                                tbody_html += `
                                    <td class="${x}">
                                        ${new_string}
                                    </td>  
                                `;
                            } else if (x === 'updatedAt') {
                                let new_string = new Date(res.data[y][x]).toLocaleString('uz-UZ');
                                tbody_html += `
                                    <td class="${x}">
                                        ${new_string}
                                    </td>
                                `;
                            }
                        }
                    }
                }
                tbody_html += `
                        <td data-id=${res.data[y]._id} class="buttons" id="link_button">
                            <div>
                                →
                            </div>
                        </td>
                    </tr>
                `
            }
            $('tbody').html(tbody_html);

            const products = document.querySelectorAll('.product');
            const link_buttons = document.querySelectorAll('#link_button');

            for (let x = 0; x < products.length; x++) {
                for (let y = 0; y < products[x].children.length; y++) {
                    products[x].children[y].addEventListener('click', () => {
                        window.location.href = '/product/' + link_buttons[x].attributes['data-id'].value;
                    });
                }
            }

            $('.add_product_icon').click(() => {
                window.location.href = '/add/';
            });

            // let product_array = [];

            // $('input[type="checkbox"]').change((e) => {
            //     const product_id = e.target.attributes['data-value'].value;
            //     console.log(product_id);
            //     const index = product_array.indexOf(product_id);
            //     console.log(index);
            //     if (product_array.includes(product_id)) {
            //         product_array.splice(product_id, index);
            //     } else {
            //         product_array.push(product_id);
            //     }
            //     console.log(product_array);
            // });
        });
    }
}
</script>

<style>

    .add_product {
        padding: 1% 1% 1% 0.5%;
        width: 100%;
    }

    .add_product_icon {
        mix-blend-mode: difference;
        padding: 1%;
        width: fit-content;
        border: thin solid black;
    }

    .add_product_icon:hover {
        background-color: lightgray;
    }

    table {
        border-collapse: collapse;
        font-size: 0.9em;
        font-family: sans-serif;
        overflow-y: scroll;
        border-radius: 5px;
        border: thin solid black;
        /* box-shadow: 0 0 10px rgb(0, 0, 0); */
    }

    thead {
        border-bottom: thin solid black;
    }

    table th, 
    table td {
        padding: 12px 15px;
        border-right: thin solid black;
    }

    table th:last-of-type, 
    table td:last-of-type {
        border: none;
    }

    tbody tr {
        border-bottom: thin solid black;
        overflow: scroll;
    }

    .buttons {
        cursor: pointer;
    }

    .buttons:hover div {
        background-color: rgb(226, 226, 226);
    }

    .buttons img {
        width: 20px;
    }

    #edit_button img {
        width: 28px;
    }

    #delete_button {
        width: 70px;
    }

    #delete_button img {
        width: 26px;
    }

</style>