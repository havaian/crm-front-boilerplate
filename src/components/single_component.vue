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

        const item_id = (window.location.href).split('/')[4];

        axios.get(import.meta.env.VITE_api_url + import.meta.env.VITE_api_add_single_item_url + item_id)
        .then((res) => {
            table_data = res.data;
            let thead_html = '';
            let tbody_html = '';

            for (let x in res.data) {
                thead_html += `
                    <th class="${x}">${x}</th>
                `;
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
                    tbody_html += `
                        <td class="${x}">
                            ${res.data[x]}
                        </td>  
                    `;
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
                window.location.href = import.meta.env.VITE_api_update_single_item_url + item_id;
            });

            const url = import.meta.env.VITE_api_url + import.meta.env.VITE_api_delete_single_item_url;

            $('#delete_button').click(() => {
                if (confirm('Are you sure you want to delete this record?')) {
                    axios.post(url + item_id)
                    .then((response) => {
                        alert('Item deleted successfully!');
                        window.location.href = '/';
                    })
                    .catch((error) => {
                        console.log(error);
                        alert('Something went wrong with deleting the item!');
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