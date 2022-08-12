<template>
  <div id="map">
  </div>
</template>

<script>

    import axios from 'axios';

    export default {
        name: "Map",
        
        mounted() {

            for (var x = 0; x < document.querySelector('.active.exact-active').attributes.length; x++) {
                if (document.querySelector('.active.exact-active').attributes[x].name == 'modelvalue') {
                    document.querySelector('#page-title').innerHTML = '';
                    document.querySelector('#page-title').append(document.querySelector('.active.exact-active').attributes[x].nodeValue);
                }
            }

            const map = L.map('map', {
                drawControl: false,
            }).setView([41.31, 69.28], 16);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
            }).addTo(map);

            var layer;
            var allLayers;

            var popupContent;

            var area;
            var polygon;
            var geometry;

            var drawControl;
            var drawOptions;

            var latlngs;
            var polygon;

            var drawnItems = new L.FeatureGroup();
            map.addLayer(drawnItems);
            var editItems = new L.FeatureGroup();
            map.addLayer(editItems);

            const defineDrawOptions = (options) => {
                drawOptions = {
                    position: 'topright',
                    draw: options.can_draw ? {
                    polygon: {
                        allowIntersection: false, // Restricts shapes to simple polygons
                        drawError: {
                            color: 'red', // Color the shape will turn when intersects
                            message: 'Lines should not intersect', // Message that will show when intersect
                        },
                        shapeOptions: {
                            color: '#50b8e7',
                        }
                    },
                    circle: false,
                    circlemarker: false,
                    marker: false,
                    polyline: false,
                    rectangle: false,
                    } : false,
                    edit: options.can_edit ? {
                    featureGroup: options.operatingLayer,
                    remove: options.can_delete ? true : false,
                    } : false,
                }
            }

            const reloadDrawControl = (events, options) => {
                if (events === 'initial') {
                    defineDrawOptions(options);
                    drawControl = new L.Control.Draw(drawOptions);
                    map.addControl(drawControl);
                } else if (events === 'secondary') {
                    map.removeControl(drawControl);
                    defineDrawOptions(options);
                    drawControl = new L.Control.Draw(drawOptions);
                    map.addControl(drawControl);
                }
            }

            const findArea = (layer) => {
                var objects = layer.getLatLngs()[0];
                geometry = [[]];
                var first = "";
                for (var i = 0; i < objects.length; i++) {
                    if (i == 0) {
                        first = new L.latLng(objects[i].lng, objects[i].lat)
                    };

                    var latlng = new L.latLng(objects[i].lng, objects[i].lat);
                    var point = latlng;

                    geometry[0].push([point['lng'], point['lat']]);
                }
                geometry[0].push([first['lng'], first['lat']]);

                polygon = turf.polygon(geometry);
                area = turf.area(polygon) / 10000;
            }

            const loadPopup = (events, layer) => {
            
                if (events === 'created') {
                    popupContent = `
                    <div id="popup-content">
                        <table id="created-table">
                            <tr>
                                <td><label for="name" class="label-name"></label><span class="content-name">Name</span></td>
                                <td><input name="name" type="text" required></td>
                            </tr>
                            <tr>
                                <td><label for="area" class="label-name"></label><span class="content-name">Area (ha)</span></td>
                                <td><input name="area" type="number" value="${area.toFixed(2)}" required disabled></td>
                            </tr>
                            <tr>
                                <td><label for="description"></label><span class="content-name">Description</span></td>
                                <td><input name="description" type="text" required></td>
                            </tr>
                        </table>
                        <div id="save-layer">
                            <button id="save-button">save</button>
                            <button id="cancel-button">cancel</button>
                        </div>
                    </div>
                    `;

                    layer.bindPopup(popupContent).openPopup();

                    $('#cancel-button').click(() => {
                        drawnItems.clearLayers();
                    });

                    $('#save-button').click(() => {
                        var data = polygon;
                        data.properties = {
                            'name': $('input[name="name"]').val(),
                            'area': $('input[name="area"]').val(),
                            'description': $('input[name="description"]').val()
                        }
                        if (data.properties['name'] != null && 
                            data.properties['area'] != null && 
                            data.properties['description'] != null) {
                                axios.post('/api/add-building', data)
                                .then(function (response) {
                                    // handle success
                                    console.log(response);
                                    fireAlert('Building created successfully!');
                                })
                                .catch(function (error) {
                                    // handle error
                                    console.log(error);
                                    fireAlert('Some thing went wrong while creating the buliding!');
                                });
                        } else {
                            fireAlert('Some fields remain not filled!');
                        }
                        
                    });

                } else if (events === 'generated') {
                    var data = layer.properties;
                    return popupContent = `
                        <div id="popup-content">
                            <table id="generated-table">
                                <tr>
                                    <td>Name</td>
                                    <td>${data.name}</td>
                                </tr>
                                <tr>
                                    <td>Area</td>
                                    <td>${data.area}</td>
                                </tr>
                                <tr>
                                    <td>Description</td>
                                    <td>${data.description}</td>
                                </tr>
                            </table>
                        </div>
                    `;
                } else if (events === 'edited') {

                    var data = layer.properties;
                    var id = data._id;

                    layer.unbindPopup();

                    popupContent = `
                    <div id="popup-content">
                        <table id="created-table">
                            <tr>
                                <td><label for="name" class="label-name"></label><span class="content-name">Name</span></td>
                                <td><input name="name" type="text" value="${data.properties.name}" required></td>
                            </tr>
                            <tr>
                                <td><label for="area" class="label-name"></label><span class="content-name">Area (ha)</span></td>
                                <td><input name="area" type="number" value="${data.properties.area}" required disabled></td>
                            </tr>
                            <tr>
                                <td><label for="description"></label><span class="content-name">Description</span></td>
                                <td><input name="description" type="text" value="${data.properties.description}" required></td>
                            </tr>
                        </table>
                        <div id="save-layer">
                            <button id="save-button">save</button>
                            <button id="cancel-button">cancel</button>
                        </div>
                    </div>
                    `;
                    layer.bindPopup(popupContent).openPopup();

                    $('.leaflet-popup-close-button').click((e) => {
                        layer.closePopup();
                    })

                    $('#cancel-button').click((e) => {
                        editItems.clearLayers();
                        var options = {
                            can_draw: true, 
                            can_edit: true, 
                            can_delete: true,
                            operatingLayer: drawnItems,
                        }
                        reloadDrawControl('secondary', options);
                        getAllBuildings();
                    });

                    $('#save-button').click(() => {
                        var data = polygon;
                        data.properties = {
                            'name': $('input[name="name"]').val(),
                            'area': $('input[name="area"]').val(),
                            'description': $('input[name="description"]').val(),
                        }
                        if (data.properties['name'] != null && 
                            data.properties['area'] != null && 
                            data.properties['description'] != null) {
                                axios.post('/api/update-building/' + id, data)
                                .then(function (response) {
                                    // handle success
                                    console.log(response);
                                    fireAlert('Building updated successfully!');
                                })
                                .catch(function (error) {
                                    // handle error
                                    console.log(error);
                                    fireAlert('Some thing went wrong while updating the building!');
                                });
                                editItems.clearLayers();
                                getAllBuildings();
                        } else {
                            fireAlert('Some fields remain not filled!');
                        }
                    });
                }

            }

            const fireAlert = (message) => {
                Swal.fire({
                    icon: 'success',
                    title: message,
                    showConfirmButton: false,
                    timer: 1500
                })
            }

            const getAllBuildings = () => {
                axios.get('/api/get-all-buildings')
                .then(function (response) {
                    allLayers = response.data;
                    for (var i in Object.keys(response.data)) {
                        layer = response.data[i];
                        latlngs = layer.geometry.coordinates[0];
                        polygon = L.polygon(latlngs, {color: '#42C2FF'})
                        polygon.properties = response.data[i];
                        polygon.addTo(map);
                        loadPopup('generated', layer);
                        polygon.bindPopup(popupContent);

                        polygon.on('click', (e) => {
                            layer = polygon;
                            editItems.addLayer(polygon);
                            var options = {
                                can_draw: false, 
                                can_edit: true, 
                                can_delete: true,
                                operatingLayer: editItems,
                            }
                            reloadDrawControl('secondary', options);
                            $('.leaflet-popup-close-button').click((e) => {
                                editItems.clearLayers();
                                var options = {
                                    can_draw: true, 
                                    can_edit: true, 
                                    can_delete: true,
                                    operatingLayer: drawnItems,
                                }
                                reloadDrawControl('secondary', options);
                                getAllBuildings();
                            })
                        });
                    }                    
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
            };
            
            var options = {
                can_draw: true, 
                can_edit: true, 
                can_delete: true,
                operatingLayer: drawnItems,
            }
            reloadDrawControl('initial', options);
            getAllBuildings();

            map.on("draw:created", (e) => {

                var options = {
                    can_draw: false, 
                    can_edit: true, 
                    can_delete: true,
                    operatingLayer: drawnItems,
                }
                reloadDrawControl('secondary', options);

                layer = e.layer;
                drawnItems.addLayer(layer);

                findArea(layer);
                loadPopup('created', layer);
            
            });

            map.on("draw:edited", (e) => {

                var options = {
                    can_draw: false, 
                    can_edit: true, 
                    can_delete: true,
                    operatingLayer: editItems,
                }
                reloadDrawControl('secondary', options);

                findArea(layer);

                loadPopup('edited', layer);
            
            });

            map.on("draw:deleted", (e) => {

                // var options = {
                //     can_draw: true, 
                //     can_edit: true, 
                //     can_delete: true,
                //     operatingLayer: drawnItems,
                // }
                // reloadDrawControl('secondary', options);

                console.log(polygon);

            });

        }
    }

</script>

<style scoped>

</style>
