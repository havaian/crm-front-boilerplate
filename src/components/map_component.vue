<template>
  <div id="map">
  </div>
</template>

<script>

    export default {
        name: "Map",
        mounted() {

            for (let x = 0; x < document.querySelector('.active.exact-active').attributes.length; x++) {
            if (document.querySelector('.active.exact-active').attributes[x].name == 'modelvalue') {
                document.querySelector('#page-title').innerHTML = '';
                document.querySelector('#page-title').append(document.querySelector('.active.exact-active').attributes[x].nodeValue);
            }
            }

            const map = L.map('map', {
            drawControl: false,
            })
            .setView([41.31, 69.28], 16);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
            }).addTo(map);

            var layer;

            var popupContent;

            var area;
            var geometry;

            let drawControl;
            let drawOptions;

            let drawnItems = new L.FeatureGroup();
            map.addLayer(drawnItems);

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

            const reloadDrawControl = (options) => {
                if (drawControl === undefined) {
                    defineDrawOptions(options);
                    drawControl = new L.Control.Draw(drawOptions);
                    map.addControl(drawControl);
                } else {
                    if (!drawControl.getContainer()) {
                    map.removeControl(drawControl);
                    defineDrawOptions(options);
                    drawControl = new L.Control.Draw(drawOptions);
                    map.addControl(drawControl);
                    } else {

                    }
                }
            }

            const findArea = (layer) => {
                var objects = layer.getLatLngs()[0];
                geometry = [[]];
                var first = "";
                for (var i = 0; i < objects.length; i++) {
                    if (i == 0) {
                        first = new L.latLng(objects[i].lat, objects[i].lng)
                    };

                    var latlng = new L.latLng(objects[i].lat, objects[i].lng);
                    var point = latlng;

                    geometry[0].push([point['lng'], point['lat']]);
                }
                geometry[0].push([first['lng'], first['lat']]);

                var polygon = turf.polygon(geometry);
                area = turf.area(polygon) / 10000;
            }

            const loadPopup = (events, layer) => {
            
                if (events === 'created') {
                    popupContent = `
                    <div id="popup-content">
                        <table id="popup-table">
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
                    `
                    layer.bindPopup(popupContent).openPopup();

                    $('#cancel-button').click(() => {
                    drawnItems.clearLayers();
                    });

                    $('#save-button').click(() => {
                    
                    let data = {
                        'name': $('input[name="name"]').val(),
                        'area': $('input[name="area"]').val(),
                        'geometry': geometry,
                        'description': $('input[name="description"]').val(),
                    }

                    });

                } else {
                    popupContent = `
                        <table id="popup-content">
                            <tr>
                                <td>Name</td>
                                <td><input></td>
                            </tr>
                            <tr>
                                <td>Area</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Description</td>
                                <td></td>
                            </tr>
                        </table>
                    `
                }

            }

            let options = {
                can_draw: true, 
                can_edit: true, 
                can_delete: true,
                operatingLayer: drawnItems,
            }
            reloadDrawControl(options);

            map.on("draw:created", (e) => {

                let options = {
                    can_draw: false, 
                    can_edit: true, 
                    can_delete: true,
                    operatingLayer: drawnItems,
                }
                reloadDrawControl(options);

                layer = e.layer;
                drawnItems.addLayer(layer);

                findArea(layer);

                loadPopup('created', layer);
            
            });

            map.on("draw:deleted", (e) => {

                reloadDrawControl();

            });

        }
    }

</script>

<style scoped>

</style>
