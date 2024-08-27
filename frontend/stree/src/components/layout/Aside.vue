<script setup>
import {ref} from 'vue';
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';

const items = ref([1, 2, 3]);

</script>

<template>
    <aside>
        <ul>
            <Accordion value="0" multiple>
                <AccordionPanel v-for="(item, index) in items" :key="index" :value="item">
                    <AccordionHeader>{{index}}</AccordionHeader>
                    <AccordionContent>
                        <p class="m-0">{{item}}</p>
                    </AccordionContent>
                </AccordionPanel>
            </Accordion>
        </ul>
        <div class="direction">▶</div>
    </aside>
</template>

<style scoped>
aside {
    background-color: whitesmoke;
    transition: all 0.7s;
    position: fixed;
    top: 0px;
    min-width: 300px;
    width: 20%;
    height: 100%;
    
    left: -410px;
}
aside:hover {
    background-color: gray;
    opacity: 0.7;
    left: 0px;
}
aside ul {
  list-style: none;
  padding: 1rem;
}
aside ul li a {
  text-decoration: none;
  color: whitesmoke;
}
.direction {
    position: absolute;
    top: 50%;
    right: 0%;
}
aside:hover .direction {
    color: whitesmoke;
}
CascadeSelect {
    min-width: 14rem
}

</style>