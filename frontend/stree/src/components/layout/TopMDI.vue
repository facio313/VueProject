<template>
    <div class="topArea" id="MDI">
        <div class="mdiArea">
            <ul calss="mdiList" role="tablist">
                <li :class="`mdiItem ${(item.activeUrl == $const.menu.mainPage.url) ? 'MAIN' : ''} ${item.fixed ? 'fixed' : ''} ${item.active ? 'active' : ''}`" v-for="(item, index) in $mdiInfo().topMDIs" :key="item.menuId" :tabindex="index">
                    <div class=""mdiTextArea eps type01>
                        <RouterLink :to="item.activeUrl" class="mdiText" @click="$mdiInfo().fnSetIgnoreChecksOnExit()"> 
                            <i :class="item.icon" v-if="item.icon">

                            </i>
                            {{ item.title }}
                        </RouterLink>
                    </div>
                    <div class="mdiButtonArea" v-if="$mdiInfo().isOnlyOneTab == false && $mdiInfo().topMDIs.length > 1">
                        <button type="button" class="btnMdi" aria-label="윈도우로 열기" title="윈도우로 열기" @click="handleOpenNewWindow(index, item.activeUrl)">
                            <BaseIcon viewBox="0 0 10 10" width="10" height="10" fill="transparent" stroke="#fff" class="currentColor stroke">
                                <IconOpenInNew/>
                            </BaseIcon>
                        </button>
                        <button type="button" class="btnMdi" aria-label="탭 닫기" title="탭 닫기" @click="handleMDITabClose(index)">
                            <BaseIcon viewBox="0 0 10 10" width="10" height="10" fill="transparent" stroke="#fff" class="currentColor stroke">
                                <IconMdiClose/>
                            </BaseIcon>
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <ConfirmDialog/>
</template>
<script setup>
import BaseIcon from "./BaseIcon.vue";
import IconOpenInNew from "./IconOpenInNew.vue";
import IconMdiClose from "./IconMdiClose.vue";
import {$mdiInfo} from "../../stores/mdiInfo";

console.log('--------------------------');
console.log($mdiInfo);
console.log('--------------------------');

const handleMDITabClose = (index) => {
    $mdiInfo().fnSetIgnoreChecksOnExit();
    $mdiInfo().fnClose(index);
}
const handleOpenNewWindow = (index, url) => {
    $mdiInfo().fnGotoNewWindow(index, url);
}


</script>