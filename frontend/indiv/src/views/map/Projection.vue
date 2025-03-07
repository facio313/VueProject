<template>
    <h1>Show</h1>
    <div id="mapBox"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { XYZ, TileWMS } from 'ol/source';
import { get as getProjection } from 'ol/proj';
import { register } from 'ol/proj/proj4';
import proj4 from 'proj4';

const map = ref(null);
const API_KEY = ' CD1637AB-53A2-30F7-BF43-CD51495BEB5D';

// 좌표계를 openlayers에 등록해야 인식한다.
proj4.defs(
    'EPSG:5174',
    '+proj=tmerc +lat_0=38 +lon_0=127.0028902777778 +k=1 +x_0=200000 +y_0=600000 +ellps=bessel +towgs84=-146.43,507.89,681.46,0.0,0.0,0.0,0.0 +units=m +no_defs'
);
register(proj4);
const projection5174 = getProjection("EPSG:5174");

// TileWMS 소스 생성 함수
const createTileWMSSource = (layer, style) => {
    return new TileWMS({
        url: 'http://localhost:8888/geoserver/lh/wms',
        params: {
            SERVICE: 'WMS',
            VERSION: '1.1.0',
            REQUEST: 'GetMap',
            LAYERS: layer,
            SRS: 'EPSG:5174',
            FORMAT: 'image/png',
            TILED: true,
            TRANSPARENT: true,
            STYLES: style,
        },
        serverType: 'geoserver'
    });
};

// TileLayer 생성 함수
const createTileLayer = (source) => {
    return new TileLayer({ source });
};

// onMounted 훅에서 지도 초기화
onMounted(() => {
    map.value = new Map({
        target: 'mapBox',
        layers: [
            // 기본 XYZ 타일 레이어 추가
            createTileLayer(new XYZ({
                url: `/vworld/req/wmts/1.0.0/${API_KEY}/Base/{z}/{y}/{x}.png`,
                attributions: ['© VWorld'],
                maxZoom: 19,
            })),
            // WMS 타일 레이어 추가
            createTileLayer(createTileWMSSource('lh:tl_sgg', 'lh:tl_sgg')),
            createTileLayer(createTileWMSSource('lh:tl_ground', 'lh:tl_ground')),
            createTileLayer(createTileWMSSource('lh:tl_purpose', 'lh:tl_purpose')),
            createTileLayer(createTileWMSSource('lh:tl_juso', 'lh:tl_juso')),
        ],
        view: new View({
            center: [195197.28181, 544538.61928], // 초기 중심 좌표 설정
            zoom: 14, // 초기 줌 레벨 설정
            projection: projection5174 // OpenLayers에서 렌더링할 뷰의 좌표계
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