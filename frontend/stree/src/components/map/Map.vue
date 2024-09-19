<script setup>
import { ref, onMounted } from 'vue';
import OlMap from 'ol/Map.js';
import OlView from 'ol/View.js';
import OlLayerTile from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj.js';
import Draw from './Draw.vue';

const mapElement = ref(null);
const map = ref(null);
const mapCenter = fromLonLat([126.9251405697578, 37.53033241217628]);

onMounted(() => {
    map.value = new OlMap({
        target: mapElement.value,
        layers: [
            new OlLayerTile({
                source: new OSM()
            })
        ],
        view: new OlView({
            center: mapCenter,
            zoom: 17,
        }),
    });
});
</script>

<template>
    <div class="map" ref="mapElement"></div>
    <Draw :map="map" />
</template>

<style scoped>
.map {
    width: 100%;
    height: 70%;
}
</style>