<template>
    <div class="wrapper">
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

        const product_id = (window.location.href).split('/')[4];

        axios.get('http://localhost:8080/get-product/' + product_id)
        .then((res) => {
            table_data = res.data;
            let thead_html = '';
            let tbody_html = '';

            for (let x in res.data) {
                if (x != '__v') {
                    thead_html += `
                        <th class="${x}">${x}</th>
                    `;
                }
            }

            thead_html += `
                <th class="edit"></td>
                <th class="delete"></td>
                <th class="delete"></td>
            `
            $('thead').html(thead_html);
                tbody_html += `
                    <tr class="element">
                `
                for (let x in res.data) {
                    if (x != '__v') {
                        if (x != '_id' && x != '_id' && x != 'createdAt' && x != 'updatedAt' && x != 'price') {
                            tbody_html += `
                                <td class="${x}">
                                    ${res.data[x]}
                                </td>  
                            `;
                        } else {
                            if (x === '_id') {
                                tbody_html += `
                                    <td class="${x}">
                                        <code>${res.data[x]}</code>
                                    </td>
                                `;
                            }  else if (x === 'price') {
                                tbody_html += `
                                    <td class="${x}">
                                        $${res.data[x]}
                                    </td>  
                                `;
                            } else if (x === '_v') {
                                tbody_html += `
                                    <td class="${x}">
                                        <code>${res.data[x]}</code>
                                    </td>
                                `;
                            } else if (x === 'createdAt') {
                                let new_string = new Date(res.data[x]).toLocaleString('uz-UZ');
                                tbody_html += `
                                    <td class="${x}">
                                        ${new_string}
                                    </td>  
                                `;
                            } else if (x === 'updatedAt') {
                                let new_string = new Date(res.data[x]).toLocaleString('uz-UZ');
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
                        <td data-id=${res.data._id} class="buttons" id="edit_button">
                            ✏️
                        </td>
                        <td data-id=${res.data._id} class="buttons" id="delete_button">
                            ❌
                        </td>
                        <td class="buttons" id="back_button">
                            ↩️
                        </td>
                    </tr>
                `
            $('tbody').html(tbody_html);

            $('#edit_button').click(() => {
                window.location.href = '/edit/' + product_id;
            });

            $('#delete_button').click(() => {
                if (confirm('Are you sure you want to delete this record?')) {
                    axios.post('http://localhost:8080/delete-product/' + product_id)
                    .then((response) => {
                        alert('Product deleted successfully!');
                        window.location.href = '/';
                    })
                    .catch((error) => {
                        console.log(error);
                        alert('Something went wrong with deleting the product!');
                    })
                }
            });

            $('#back_button').click(() => {
                window.location.href = '/';
            });
        });

    }
}
</script>

<style>

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

    .buttons:hover {
        background-color: rgb(226, 226, 226);
    }

</style>