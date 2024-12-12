<template>
    <svg aria-hidden="true" :width="width" :height="height" :viewBox="viewBox" :fill="fill" :stroke="stroke" :class="className">

    </svg>
</template>

<script setup>
defineProps({
    viewBox: {
        type: String
        , default: "0 0 24 24"
    }
    , iconName: {
        type: String
        , default: ""
    }
    , width: {
        type: [Number, String]
        , default: 18
    }
    , height: {
        type: [Number, String]
        , default: 18
    }
    , fill: {
        type: String
        , default: ""
    }
    , stroke: {
        type: String
        , default: ""
    }
    , className: {
        type: String
        , default: ""
    }
});
</script>