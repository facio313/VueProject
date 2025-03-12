<template>
    <h1>Map</h1>
    <div id="mapBox"></div>
    <Toggle v-if="map" :map="map" :layers="layers" :createTileLayer="createTileLayer"/>
    <div class="mouseControl">
        <label><input type="radio" name="mouseGroup" v-model="selectedTool" value="feature"/>Feature</label>
        <label><input type="radio" name="mouseGroup" v-model="selectedTool" value="draw"/>Draw</label>
    </div>
    <Feature v-if="map && selectedTool == 'feature'" :map="map" :layers="layers"/>
    <Draw v-if="map && selectedTool == 'draw'" :map="map" />
    <Marker v-if="map" :map="map"/>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Toggle from '@/components/map/Toggle.vue';
import Feature from '@/components/map/Feature.vue';
import Draw from '@/components/map/Draw.vue';
import Marker from '@/components/map/Marker.vue';

import { Map, View } from 'ol';
import { XYZ, TileWMS } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import 'ol/ol.css';


const map = ref(null);
const selectedTool = ref('feature');
const API_KEY = ' CD1637AB-53A2-30F7-BF43-CD51495BEB5D';
const layers = [
    { name: 'sgg', label: 'SGG Layer', layer: 'lh:tl_sgg', style: 'lh:tl_sgg' },
    { name: 'ground', label: 'Ground Layer', layer: 'lh:tl_ground', style: 'lh:tl_ground' },
    { name: 'rw', label: 'RW Layer', layer: 'lh:tl_rw', style: 'lh:tl_rw' },
    { name: 'road', label: 'Road Layer', layer: 'lh:tl_road', style: 'lh:tl_road' },
    { name: 'basic', label: 'Basic Layer', layer: 'lh:tl_basic', style: 'lh:tl_basic' },
    { name: 'eqb', label: 'EQB Layer', layer: 'lh:tl_eqb', style: 'lh:tl_eqb' },
    { name: 'buld', label: 'Buld Layer', layer: 'lh:tl_buld', style: 'lh:tl_buld' },
    { name: 'entrance', label: 'Entrance Layer', layer: 'lh:tl_entrance', style: 'lh:tl_entrance' },
    { name: 'test', label: 'Test Layer', layer: 'lh:tl_test', style: 'lh:tl_test' },
];

// TileWMS 소스 생성 함수
const createTileWMSSource = (layer, style) => {
    return new TileWMS({
        url: 'http://localhost:8888/geoserver/lh/wms',
        params: {
            SERVICE: 'WMS',
            VERSION: '1.1.0',
            REQUEST: 'GetMap',
            LAYERS: layer,
            SRS: 'EPSG:3857',
            FORMAT: 'image/png',
            TILED: true,
            TRANSPARENT: true,
            STYLES: style,
        },
        serverType: 'geoserver',
    });
};

// TileLayer 생성 함수
const createTileLayer = (layer) => {
    return new TileLayer({
        source: createTileWMSSource(layer.layer, layer.style),
        properties: { name: layer.name }
    });
};

onMounted(() => {
    map.value = new Map({
        target: 'mapBox',
        layers: [
        new TileLayer({
                source: new XYZ({
                    url: `/vworld/req/wmts/1.0.0/${API_KEY}/Base/{z}/{y}/{x}.png`,
                    attributions: ['© VWorld'],
                    maxZoom: 19,
                }),
                properties: { name: 'base' }
            }),
            ...layers.map(layer => createTileLayer(layer)),
        ],
        view: new View({
            center: fromLonLat([126.9811405697578, 37.47833241217628]),
            zoom: 18
        }),
    });
});

</script>

<style>
#mapBox {
    width: 100%;
    height: 70%;
}
</style>