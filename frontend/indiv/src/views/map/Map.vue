<template>
    <h1>Map</h1>
    <div id="mapBox"></div>
</template>

<script setup>
import 'ol/ol.css';
import { onMounted, ref } from 'vue';
import { Map } from 'ol';
import { Tile as TileLayer } from 'ol/layer';
import { OSM } from 'ol/source';
import { View } from 'ol';
import { fromLonLat } from 'ol/proj';

// onMounted 훅에서 지도 초기화
onMounted(() => {
    const map = new Map({
        target: document.querySelector('#mapBox'),
        layers: [
            new TileLayer({
            source: new OSM(),
            }),
        ],
        view: new View({
            center: fromLonLat([127.7669, 35.9078]),
            zoom: 2,
        }),
    });
});
</script>

<style>
#mapBox {
    width: 100%;
    height: 50%;
}
</style>