<template>
    <label for="type">Geometry type &nbsp;</label>
    <select id="type" v-model="typeSelect">
      <option value="Point">Point</option>
      <option value="LineString">LineString</option>
      <option value="Polygon">Polygon</option>
      <option value="Circle">Circle</option>
    </select>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Draw, Modify, Snap } from 'ol/interaction.js';
import { Vector as VectorSource } from 'ol/source.js';
import { Vector as VectorLayer } from 'ol/layer.js';

// `props`로 map 받기
const props = defineProps({
  map: Object
});

const vectorSource = new VectorSource();
const vectorLayer = new VectorLayer({
  source: vectorSource,
  style: {
    'fill-color': 'rgba(255, 255, 255, 0.2)',
    'stroke-color': '#ffcc33',
    'stroke-width': 2,
    'circle-radius': 7,
    'circle-fill-color': '#ffcc33',
  },
});

const draw = ref(null);
const snap = ref(null);
const modify = ref(null);

const typeSelect = ref('Point');

const addInteractions = () => {
  draw.value = new Draw({
    source: vectorSource,
    type: typeSelect.value,
  });
  props.map.addInteraction(draw.value);

  snap.value = new Snap({ source: vectorSource });
  props.map.addInteraction(snap.value);
};

watch(() => props.map, (newMap) => {
    if (newMap) {
      newMap.addLayer(vectorLayer);
      modify.value = new Modify({ source: vectorSource });
      newMap.addInteraction(modify.value);
      addInteractions();
    }
  },
  {
    flush: "post"}
);

watch(typeSelect, () => {
    if (props.map && draw.value && snap.value) {
      props.map.removeInteraction(draw.value);
      props.map.removeInteraction(snap.value);
      addInteractions();
    }
  },
  {
    flush: "post"}
);
</script>