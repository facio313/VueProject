<template>
    <h1>Show</h1>
    <div id="mapBox"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import 'ol/ol.css';
import { Map } from 'ol';
import { View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { OSM, TileWMS } from 'ol/source';
import { transform } from 'ol/proj';
import { register } from "ol/proj/proj4";
import proj4 from "proj4";

const map = ref(null);

// EPSG:5174 좌표계 정의 추가 (한국 중부 원점)
proj4.defs(
  "EPSG:5174",
  "+proj=tmerc +lat_0=38 +lon_0=127.0028902777778 +k=1 +x_0=200000 +y_0=600000 +ellps=bessel +towgs84=-146.43,507.89,681.46,0.0,0.0,0.0,0.0 +units=m +no_defs"
);
register(proj4); // OpenLayers에 등록

// onMounted 훅에서 지도 초기화
onMounted(() => {
    map.value = new Map({
        target: document.querySelector('#mapBox'),
        layers: [
            new TileLayer({
                source: new OSM(),
            }),
            new TileLayer({
                source : new TileWMS({
                    url: 'http://localhost:8888/geoserver/lh/wms',
                    params: {
                        SERVICE: "WMS",
                        VERSION: "1.1.0",
                        REQUEST: "GetMap",
                        LAYERS: "lh:tl_ground", // 정확한 레이어 이름 설정
                        TILED: true,
                        FORMAT: "image/png",
                        TRANSPARENT: true, // 배경 투명 처리
                        STYLES: "",                        
                    },
                    serverType: 'geoserver',
                })
            })
        ],
        view: new View({
            center: transform([191438.5, 541771.625], "EPSG:5174", "EPSG:3857"), // 좌표 변환
            zoom: 15, // 줌 레벨 조정
            projection: "EPSG:3857", // OpenLayers 기본 Web Mercator (EPSG:3857
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