<template>
    <div id="wrap">
        <!-- <SidebarWrapper/> -->
        <div id="contents">
            <TopMDI @handleMDITabClose="handleMDITabClose" @handleMDITabs="handleMDITabs" :topMDIs="topMDIs" :currTabNo="currTabNo"/>
            <div class="contentsArea">
                <div class="inner">
                    <div class="cont" :id="`tab${tabNo + 1}`" role="tabpanel" v-for="(item, tabNo) in topMDIs" :key="tabNo" v-show="currTabNo === tabNo">
                        <!--
                        <template v-if="item.id === 'MAIN'">
                            <MainPage :tabNo="tabNo" :item="item"/>
                        </template>
                        <template v-else>
                            <EtcPage :tabNo="tabNo" :item="item"/>
                        </template>
                        -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue';
// import SidebarWrapper from "../components/layout/SidebarWrapper.vue";
import TopMDI from "../components/layout/TopMDI.vue";
// import MainPage from "../components/layout/MainPage.vue";
// import EtcPage from "../components/layout/EtcPage.vue";

const topMDIs = reactive([
    {id: 'MAIN', icon: 'ki ico-home', label: 'MAIN', fixed: true, active: false}
    , {id: 'AFF-40010M', label: '목록조회1', fixed: false, active: false}
    , {id: 'AFF-40130D', label: '목록조회2', fixed: false, active: false}
    , {id: 'ARA-21050D', label: '목록조회3', fixed: false, active: false}
    , {id: 'ARA-20010M', label: '목록조회4', fixed: false, active: false}
]);

const currTabNo = ref(5);

const handleMDITabs = (tabNo) => {
    currTabNo.value = tabNo;
    topMDIs[tabNo].active = true;
}

const handleMDITabClose = (tabNo) => {
    topMDIs.splice(tabNo, 1);
    if (currTabNo.value > topMDIs.length - 1) {
        currTabNo.value = topMDIs.length - 1;
    }
}


</script>