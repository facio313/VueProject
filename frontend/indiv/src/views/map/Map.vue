<template>
    <h1>Map</h1>
    <div id="mapBox"></div>
    <Draw :map="map"/>
</template>

<script setup>
import { onMounted } from 'vue';
import 'ol/ol.css';
import { Map } from 'ol';
import { View } from 'ol';
import { TileLayer } from 'ol/layer';
import { OSM } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import { Draw } from '@/components/map/Draw.vue';

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