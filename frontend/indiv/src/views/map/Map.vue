<template>
    <h1>Map</h1>
    <div id="mapBox"></div>
    <div class="layerControl">
        <span>레이어 On/Off</span>
        <button v-for="layer in layers" :key="layer.name" @click="toggleVisibility(layer.name)">{{ layer.name }}</button>
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
    <Marker :map="map"/>
</template>

<script setup>
import { ref, onMounted, toRaw } from 'vue';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { XYZ, TileWMS } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import Draw from '@/components/map/Draw.vue';
import Marker from '@/components/map/Marker.vue';

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
const createTileLayer = (layer) => {
    return new TileLayer({
        source: createTileWMSSource(layer.layer, layer.style),
        properties: { name: layer.name }
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
        const layer = layers.find(layer => layer.name === name);
        if (layer) {
            map.value.addLayer(createTileLayer(layer));
        }
    }
}

function getFeatureInfo(event) {
    const viewResolution = map.value.getView().getResolution();
    const nowLayer = toRaw(map.value.getLayers().getArray().filter(layer => layer.get('name') == 'buld')[0]);
    console.log(nowLayer.getSource());
    const url = nowLayer.getSource().getFeatureInfoUrl(
        event.coordinate,
        viewResolution,
        'EPSG:3857',
        { INFO_FORMAT: 'application/json' }
    );

    console.log(url);
    
    if (url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => console.error(error));
    }
}

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
            ...layers.map(layer => createTileLayer(layer))
        ],
        view: new View({
            center: fromLonLat([126.9811405697578, 37.47833241217628]),
            zoom: 18
        }),
    });

    map.value.on('click', getFeatureInfo);
});
</script>

<style>
#mapBox {
    width: 100%;
    height: 70vh;
}
</style>