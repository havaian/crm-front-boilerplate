<template>
    <div class="wrapper">
        <table>
            <thead>
                <th>title</th>
                <th>description</th>
                <th>price</th>
                <th>images</th>
                <th></th>
                <th></th>
            </thead>
            <tbody>
                <tr>
                    <td class="product_title">
                        <input type="text" name="product_title" required>
                    </td>
                    <td class="product_description">
                        <textarea name="product_description" required></textarea>
                    </td>
                    <td class="product_price">
                        <input type="text" name="product_price" required>
                    </td>
                    <td class="product_images">
                        <input type="text" name="product_images" disabled>
                    </td>
                    <td class="buttons" id="add_approve_button">
                        ✅
                    </td>
                    <td class="buttons" id="add_reject_button">
                        ❌
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {

    },
    mounted() {

        let url = import.meta.env.VITE_api_add_single_item_url

        $('#add_approve_button').click(() => {

            const title = document.querySelector('input[name="product_title"]').value;
            const description = document.querySelector('textarea[name="product_description"]').value;
            const price = document.querySelector('input[name="product_price"]').value;
            const images = "";

            if (title != '' && description != '' && price != '') {

                let data = {
                    "title": title,
                    "description": description,
                    "price": price,
                    "images": images
                };

                if (confirm('Are you sure you want to add a new record?')) {
                    axios.post(url, data)
                    .then((response) => {
                        alert('New product added successfully!');
                        window.location.href = '/';
                    })
                    .catch((error) => {
                        console.log(error);
                        alert('Something went wrong with adding new product! Please, try again later');
                    })
                };

            } else {
                alert('Please, fill in all the fields to create a new product!');
            }

        });

        $('#add_reject_button').click(() => {
            if (confirm('Are you sure you don\'t want to add new product?')) {
                window.location.href = '/';
            };
        });

    }
}
</script>

<style>

</style>