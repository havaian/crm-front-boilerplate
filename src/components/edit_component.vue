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

        axios.get(import.meta.env.VITE_api_get_single_item_url + item_id)
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
                <th class="edit_upload_button"></th>
                <th class="edit_delete_button"></th>
            `
            $('thead').html(thead_html);
                tbody_html += `
                    <tr class="element">
                `
                for (let x in res.data) {
                    tbody_html += `
                        <td>
                            <input name="${res.data[x]}" value="${res.data[x]}" required></input>    
                        </td>
                    `
                }
                tbody_html += `
                        <td class="buttons" id="edit_upload_button">✅</td>
                        <td class="buttons" id="edit_delete_button">↩️</td>
                    </tr>
                `
            $('tbody').html(tbody_html);
        
            $('#edit_upload_button').click(() => {
                if(confirm('Are you sure you want to upload all your changes?')) {
                    let data = {
                        "input": "value"
                    };

                    const url = import.meta.env.VITE_api_update_single_item_url;

                    axios.post(url + item_id, data)
                    .then(function (response) {
                        alert('Item updated successfully!');
                        window.location.href = import.meta.env.VITE_api_get_single_item_url + item_id;
                    })
                    .catch(function (error) {
                        console.log(error);
                        alert('Something went wrong while updating the item!');
                    });
                }
            });
            $('#edit_delete_button').click(() => {
                if(confirm('Are you sure you want to leave your changes unsaved?')) {
                    window.location.href = import.meta.env.VITE_api_get_single_item_url + item_id;
                }
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

    td._id {
        max-width: 100px;
        word-wrap: break-word;
    }

    textarea[name=item_description] {
        min-height: 400px;
        resize: none;
    }

</style>