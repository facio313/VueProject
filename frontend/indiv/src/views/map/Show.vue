<template>
    <h1>Show</h1>
    <div id="mapBox"></div>
    <Draw :map="map"/>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import 'ol/ol.css';
import { Map } from 'ol';
import { View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import Draw from '@/components/map/Draw.vue';

const map = ref(null);

// onMounted 훅에서 지도 초기화
onMounted(() => {
    map.value = new Map({
        target: 'mapBox',
        layers: [
            new TileLayer({
            source: new OSM(),
            }),
        ],
        view: new View({
            center: fromLonLat([126.9251405697578, 37.53033241217628]),
            zoom: 17,
        }),
    });
});
</script>

<style>
#mapBox {
    width: 100%;
    height: 50vh;
}
</style>