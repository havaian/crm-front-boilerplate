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
                <th class="edit_upload_button"></th>
                <th class="edit_delete_button"></th>
            `
            $('thead').html(thead_html);
                tbody_html += `
                    <tr class="element">
                `
                for (let x in res.data) {
                    if (x != '__v') {
                        if (x != '_id' && x != 'images' && x != 'createdAt' && x != 'updatedAt') {
                            if (x === 'title') {
                                tbody_html += `
                                    <td>
                                        <input name="product_title" value="${res.data[x]}" required></input>
                                    </td>  
                                `;
                            } else if (x === 'description') {
                                tbody_html += `
                                    <td class="${x}">
                                        <textarea name="product_description" required>
                                            ${res.data[x]}
                                        </textarea>
                                    </td> 
                                `;
                            } else if (x === 'price') {
                                tbody_html += `
                                    <td class="${x}">
                                        <input name="product_price" value="${res.data[x]}" required></input>
                                    </td>  
                                `;
                            }
                        } else {
                            if (x === 'createdAt') {
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
                            } else {
                                tbody_html += `
                                    <td class="${x}">
                                        ${res.data[x]}
                                    </td>  
                                `;
                            }
                        }
                    }
                }
                tbody_html += `
                        <td class="buttons" id="edit_upload_button">✅</td>
                        <td class="buttons" id="edit_delete_button">↩️</td>
                    </tr>
                `
            $('tbody').html(tbody_html);

            // const edit_button_transform = (element) => {
            //     if (element === '#edit_upload_button') {
            //         $('#edit_upload_button').replaceWith(
            //             `
            //                 <td data-id=${res.data._id} class="buttons" id="edit_approve_button">
            //                     ✔️
            //                 </td>
            //             `
            //         );
            //         $('#edit_delete_button').replaceWith(
            //             `
            //                 <td data-id=${res.data._id} class="buttons" id="edit_reject_button">
            //                     ↩️
            //                 </td>
            //             `
            //         );

            //         let data = {
            //             "title": document.querySelector('input[name="product_title"]').value,
            //             "description": document.querySelector('textarea[name="product_description"]').value,
            //             "price": document.querySelector('input[name="product_price"]').value,
            //             "images": ""
            //         };

            //         // $('#edit_approve_button').click(() => {
            //         //     console.log(data);
            //         //     axios.post(`http://localhost:8080/update-product/` + $('#edit_approve_button')[0].attributes['data-id'].value, data);
            //         // });

            //         $('#edit_reject_button').click(() => {
            //             edit_button_transform('#edit_approve_button');                        
            //         });
            //         $('#delete_reject_button').click(() => {
            //             delete_button_transform('#delete_approve_button');                        
            //         });

            //     } else if (element === '#edit_approve_button') {
            //         $('#edit_approve_button').replaceWith(
            //             `
            //                 <td class="buttons" id="edit_upload_button">✏️</td>
            //             `
            //         );
            //         $('#edit_reject_button').replaceWith(
            //             `
            //                 <td class="buttons" id="edit_delete_button">❎</td>
            //             `
            //         );
                    
            //         $('#edit_upload_button').click(() => {
            //             edit_button_transform('#edit_upload_button');
            //         });
            //         $('#edit_delete_button').click(() => {
            //             delete_button_transform('#edit_upload_button');
            //         });
            //     }
            // }

            // const delete_button_transform = (element) => {
            //     if (element === '#edit_upload_button') {
            //         $('#edit_upload_button').replaceWith(
            //             `
            //                 <td data-id=${res.data._id} class="buttons" id="delete_approve_button">
            //                     ❌
            //                 </td>
            //             `
            //         );
            //         $('#edit_delete_button').replaceWith(
            //             `
            //                 <td data-id=${res.data._id} class="buttons" id="delete_reject_button">
            //                     ↩️
            //                 </td>
            //             `
            //         );

            //         let data = {
            //             "title": document.querySelector('input[name="product_title"]').value,
            //             "description": document.querySelector('textarea[name="product_description"]').value,
            //             "price": document.querySelector('input[name="product_price"]').value,
            //             "images": ""
            //         };

            //         // $('#edit_approve_button').click(() => {
            //         //     console.log(data);
            //         //     axios.post(`http://localhost:8080/update-product/` + $('#edit_approve_button')[0].attributes['data-id'].value, data);
            //         // });

            //         $('#edit_reject_button').click(() => {
            //             edit_button_transform('#edit_approve_button');                        
            //         });
            //         $('#delete_reject_button').click(() => {
            //             delete_button_transform('#delete_approve_button');                        
            //         });

            //     } else if (element === '#delete_approve_button') {
            //         $('#delete_approve_button').replaceWith(
            //             `
            //                 <td class="buttons" id="edit_upload_button">✏️</td>
            //             `
            //         );
            //         $('#delete_reject_button').replaceWith(
            //             `
            //                 <td class="buttons" id="edit_delete_button">❎</td>
            //             `
            //         );

            //         $('#edit_upload_button').click(() => {
            //             edit_button_transform('#edit_upload_button');
            //         });
            //         $('#edit_delete_button').click(() => {
            //             delete_button_transform('#edit_upload_button');
            //         });
            //     }
            // }
            
            // $('#edit_upload_button').click(() => {
            //     edit_button_transform('#edit_upload_button');
            // });
            // $('#edit_delete_button').click(() => {
            //     delete_button_transform('#edit_upload_button');
            // });
        
            $('#edit_upload_button').click(() => {
                if(confirm('Are you sure you want to upload all your changes?')) {
                    let data = {
                        "title": document.querySelector('input[name="product_title"]').value,
                        "description": document.querySelector('textarea[name="product_description"]').value,
                        "price": document.querySelector('input[name="product_price"]').value,
                        "images": ""
                    };

                    const url = `http://localhost:8080/update-product/`;

                    axios.post(url + product_id, data)
                    .then(function (response) {
                        // handle success
                        alert('Product updated successfully!');
                        window.location.href = '/product/' + product_id;
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                        alert('Something went wrong while updating the product!');
                    });
                }
            });
            $('#edit_delete_button').click(() => {
                if(confirm('Are you sure you want to leave your changes unsaved?')) {
                    window.location.href = '/product/' + product_id;
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

    td._id {
        max-width: 100px;
        word-wrap: break-word;
    }

    textarea[name=product_description] {
        min-height: 400px;
        resize: none;
    }

</style>