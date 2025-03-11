<template>
    <label for="type">Geometry type &nbsp;</label>
    <select id="type" v-model="typeSelect">
        <option value="">-선택-</option>
        <option value="Point">Point</option>
        <option value="LineString">LineString</option>
        <option value="Polygon">Polygon</option>
        <option value="Circle">Circle</option>
    </select>
    <button @click="insertDraw">전송</button>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { Draw, Modify, Snap } from 'ol/interaction.js';
import { Vector as VectorSource } from 'ol/source.js';
import { Vector as VectorLayer } from 'ol/layer.js';
import GeoJSON from 'ol/format/GeoJSON';
import { Style, Stroke, Fill, Circle as CircleStyle } from 'ol/style';

// `props`로 map 받기
const props = defineProps({
    map: Object
});

const vectorSource = new VectorSource();
const vectorLayer = new VectorLayer({
    source: vectorSource,
    style: new Style({
        fill: new Fill({
            color: 'rgba(255, 255, 255, 0.7)',
        }),
        stroke: new Stroke({
            color: '#ffcc33',
            width: 2,
        }),
        image: new CircleStyle({
            radius: 7,
            fill: new Fill({
                color: '#ffcc33',
            }),
        }),
    }),
});

const draw = ref(null);
const snap = ref(null);
const modify = ref(null);

const typeSelect = ref('');

const addInteractions = () => {
    if (typeSelect.value) {
        draw.value = new Draw({
            source: vectorSource,
            type: typeSelect.value,
        });
        props.map.addInteraction(draw.value);

        snap.value = new Snap({ source: vectorSource });
        props.map.addInteraction(snap.value);
    }
};

function insertDraw() {
    const features = vectorSource.getFeatures();
    const geoJsonFormat = new GeoJSON();
    const geoJson = JSON.parse(geoJsonFormat.writeFeatures(features)).features[0].geometry;

    const requestBody = {
        page: null,
        dto: {
            geoJson: JSON.stringify(geoJson)
        }
    }

    fetch('http://localhost:9999/api/draw/insert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
        .then(response => {
            if (response.ok) {
                console.log(response);
                vectorSource.clear();
            }
        })
        .catch(error => console.error('Error:', error));
}

// 화면에 표시된 후
onMounted(() => {
    props.map.addLayer(vectorLayer);
    modify.value = new Modify({ source: vectorSource });
    props.map.addInteraction(modify.value);
    addInteractions();
});

// 컨포넌트가 사라지기 직전전
onBeforeUnmount(() => {
    if (draw.value) {
        props.map.removeInteraction(draw.value);
    }
    if (snap.value) {
        props.map.removeInteraction(snap.value);
    }
    props.map.removeLayer(vectorLayer);
});

// 데이터 변경 감지 시
watch(typeSelect, () => {
    if (props.map) {
        if (draw.value) {
            props.map.removeInteraction(draw.value);
        }
        if (snap.value) {
            props.map.removeInteraction(snap.value);
        }
        addInteractions();
    }
}, {
    flush: "post"
});
</script>