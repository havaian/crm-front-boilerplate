<template>
    <div class="wrapper">
        <div class="add_item">
            <div class="add_item_icon">
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

        axios.get(import.meta.env.VITE_api_url + import.meta.env.VITE_api_get_all_items_url)
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
                    <tr class="item">
                        <!-- <td><input class='item_checkbox_input' data-value=${res.data[y]['_id']} type="checkbox"></td> -->
                        <td class="index-number">${parseInt(y)+1}</td>
                `
                for (let x in res.data[y]) {
                    tbody_html += `
                        <td class="${x}">
                            ${res.data[y][x]}
                        </td>  
                    `;
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

            const items = document.querySelectorAll('.items');
            const link_buttons = document.querySelectorAll('#link_button');

            for (let x = 0; x < items.length; x++) {
                for (let y = 0; y < items[x].children.length; y++) {
                    items[x].children[y].addEventListener('click', () => {
                        window.location.href = import.meta.env.VITE_api_get_single_item_url + link_buttons[x].attributes['data-id'].value;
                    });
                }
            }

            $('.add_item_icon').click(() => {
                window.location.href = '/add/';
            });

            // let item_array = [];

            // $('input[type="checkbox"]').change((e) => {
            //     const item_id = e.target.attributes['data-value'].value;
            //     console.log(item_id);
            //     const index = item_array.indexOf(item_id);
            //     console.log(index);
            //     if (item_array.includes(item_id)) {
            //         item_array.splice(item_id, index);
            //     } else {
            //         item_array.push(item_id);
            //     }
            //     console.log(item_array);
            // });
        });
    }
}
</script>

<style>

    .add_item {
        padding: 1% 1% 1% 0.5%;
        width: 100%;
    }

    .add_item_icon {
        mix-blend-mode: difference;
        padding: 1%;
        width: fit-content;
        border: thin solid black;
    }

    .add_item_icon:hover {
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