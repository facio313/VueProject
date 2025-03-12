<template>
    <div class="layerControl">
        <span>레이어 On/Off</span>
        <button v-for="layer in layers" :key="layer.name" @click="toggleVisibility(layer.name)">{{ layer.name }}</button>
    </div>
    <div class="layerControl">
        <span>레이어 삭제/추가</span>
        <button v-for="layer in layers" :key="layer.name" @click="toggleLayer(layer.name)">{{ layer.name }}</button>
    </div>
</template>

<script setup>
const props = defineProps({
    map: Object,
    layers: Array,
    createTileLayer: Function,
});

const map = props.map;
const layers = props.layers;
const createTileLayer = props.createTileLayer;

function toggleVisibility(name) {
    const nowLayers = map.getLayers().getArray()
    nowLayers.forEach(layer => {
        if (layer.get('name') === name) {
            layer.setVisible(!layer.getVisible());
        }
    });
}

function toggleLayer(name) {
    const nowLayers = map.getLayers().getArray()
    let isExist = false;
    nowLayers.forEach(layer => {
        if (layer.get('name') === name) {
            map.removeLayer(layer);
            isExist = true;
        }
    });
    if (!isExist) {
        const layer = layers.find(layer => layer.name === name);
        if (layer) {
            map.addLayer(createTileLayer(layer));
        }
    }
}
</script>

<style scoped>

</style>