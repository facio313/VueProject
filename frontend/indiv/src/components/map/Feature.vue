<template>
    <div class="featureControl">
        Features
        <label v-for="layer in layers" :key="layer.name">
            <input type="radio" name="featureGroup" v-model="selectedLayer" :value="layer.name" :checked="layer.name == 'buld'"/>
            {{ layer.name }}
        </label>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, toRaw } from 'vue';
import { Point, LineString, Polygon, MultiPoint, MultiLineString, MultiPolygon } from 'ol/geom';
import Feature from 'ol/Feature';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

const props = defineProps({
    map: Object,
    layers: Array,
});

const map = props.map;
const selectedLayer = ref('buld');

const highlightLayer = new VectorLayer({
    source: new VectorSource(),
    style: new Style({
        stroke: new Stroke({
            color: 'red',
            width: 2
        }),
        fill: new Fill({
            color: 'rgba(255, 0, 0, 0.3)'
        })
    })
});

function getFeatureInfo(event) {
    const viewResolution = map.getView().getResolution();
    const nowLayer = toRaw(map.getLayers().getArray().filter(layer => layer.get('name') == selectedLayer.value)[0]);
    const url = nowLayer.getSource().getFeatureInfoUrl(
        event.coordinate,
        viewResolution,
        'EPSG:3857',
        { 
            REQUEST: 'GetFeatureInfo',
            INFO_FORMAT: 'application/json'
        }
    );

    if (url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.features.length === 0) {
                    console.log('No features found');
                    return;
                }
                markVectorLayer(data.features[0].geometry);
            })
            .catch(error => console.error(error));
    }
}

function markVectorLayer(geometry) {
    let feature;
    switch (geometry.type) {
        case 'Point':
            feature = new Feature({
                geometry: new Point(geometry.coordinates)
            });
            break;
        case 'LineString':
            feature = new Feature({
                geometry: new LineString(geometry.coordinates)
            });
            break;
        case 'Polygon':
            feature = new Feature({
                geometry: new Polygon(geometry.coordinates)
            });
            break;
        case 'MultiPoint':
            feature = new Feature({
                geometry: new MultiPoint(geometry.coordinates)
            });
            break;
        case 'MultiLineString':
            feature = new Feature({
                geometry: new MultiLineString(geometry.coordinates)
            });
            break;
        case 'MultiPolygon':
            feature = new Feature({
                geometry: new MultiPolygon(geometry.coordinates)
            });
            break;
        default:
            console.log('Unsupported geometry type: ' + geometry.type);
            return;
    }

    feature.setStyle(new Style({
        stroke: new Stroke({
            color: 'rgba(255, 0, 0)',
            width: 2
        }),
        fill: new Fill({
            color: 'rgba(255, 0, 0, 0.3)'
        })
    }));
    highlightLayer.getSource().clear();
    highlightLayer.getSource().addFeature(feature);
}

onMounted(() => {
    map.addLayer(highlightLayer);
    map.on('click', getFeatureInfo);
});

onBeforeUnmount(() => {
    map.removeLayer(highlightLayer);
    map.un('click', getFeatureInfo);
});
</script>

<style scoped>

</style>