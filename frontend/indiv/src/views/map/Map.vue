<template>
    <h1>Map</h1>
    <div id="mapBox"></div>
    <div class="layerControl">
        <span>레이어 On/Off</span>
        <button v-for="layer in layers" :key="layer.name" @click="toggleVisibility(layer.name)">{{ layer.name
        }}</button>
    </div>
    <div class="layerControl">
        <span>레이어 삭제/추가</span>
        <button v-for="layer in layers" :key="layer.name" @click="toggleLayer(layer.name)">{{ layer.name }}</button>
    </div>
    <div class="drawControl">
        <label>
            <input type="checkbox" v-model="drawEnabled" />
            Draw 기능 활성화
        </label>
    </div>
    <Draw v-if="drawEnabled" :map="map" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { XYZ, TileWMS } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import Draw from '@/components/map/Draw.vue';

const map = ref(null);
const drawEnabled = ref(false);
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
const createTileLayer = (source, name) => {
    return new TileLayer({
        source,
        properties: { name: name }
    });
};

function toggleVisibility(name) {
    const nowLayers = map.value.getLayers().getArray()
    nowLayers.forEach(layer => {
        if (layer.get('name') === name) {
            layer.setVisible(!layer.getVisible());
        }
    });
}

function toggleLayer(name) {
    const nowLayers = map.value.getLayers().getArray()
    let isExist = false;
    nowLayers.forEach(layer => {
        if (layer.get('name') === name) {
            map.value.removeLayer(layer);
            isExist = true;
        }
    });
    if (!isExist) {
        layers.forEach(layer => {
            if (layer.name === name) {
                map.value.addLayer(createTileLayer(createTileWMSSource(layer.layer, layer.style), name));
            }
        });
    }
}

// onMounted 훅에서 지도 초기화
onMounted(() => {
    map.value = new Map({
        target: 'mapBox',
        layers: [
            createTileLayer(new XYZ({
                url: `/vworld/req/wmts/1.0.0/${API_KEY}/Base/{z}/{y}/{x}.png`,
                attributions: ['© VWorld'],
                maxZoom: 19,
            })),
            createTileLayer(createTileWMSSource('lh:tl_sgg', 'lh:tl_sgg'), 'sgg'),
            createTileLayer(createTileWMSSource('lh:tl_ground', 'lh:tl_ground'), 'ground'),
            createTileLayer(createTileWMSSource('lh:tl_rw', 'lh:tl_rw'), 'rw'),
            createTileLayer(createTileWMSSource('lh:tl_road', 'lh:tl_road'), 'road'),
            createTileLayer(createTileWMSSource('lh:tl_basic', 'lh:tl_basic'), 'basic'),
            createTileLayer(createTileWMSSource('lh:tl_eqb', 'lh:tl_eqb'), 'eqb'),
            createTileLayer(createTileWMSSource('lh:tl_buld', 'lh:tl_buld'), 'buld'),
            createTileLayer(createTileWMSSource('lh:tl_entrance', 'lh:tl_entrance'), 'entrance'),
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
    height: 70vh;
}
</style>