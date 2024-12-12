<script setup>
import { ref } from "vue";

const visible = ref(false);

</script>

<template>
    <Button icon="pi pi-arrow-right" @click="visible = true" class="sidebarBtn"/>
    <Drawer v-model:visible="visible">
        <template #container="{ closeCallback }">
            <div class="flex flex-column h-full">
                <div class="flex align-items-center justify-content-between px-6 pt-4 flex-shrink-0">
                    <span class="inline-flex align-items-center gap-2">
                        <img width="35" height="40" src="">
                        <span class="font-semibold text-5xl text-primary">STREE</span>
                    </span>
                    
                </div>
                <div class="overflow-auto">
                    <ul class="list-none p-4 m-0">
                        <li>
                            <div v-ripple v-styleclass="{selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-slidedown', leaveToClass: 'hidden', leaveActiveClass: 'animate-slideup'}" class="p-4 flex align-items-center justify-content-between text-surface-500 dark:text-surface-400 cursor-pointer p-ripple">
                                <span class="font-medium">FAVORITES</span>
                                <i class="pi pi-chevron-down"></i>
                            </div>
                            <ul class="list-none py-0 pl-4 pr-0 m-0 hidden overflow-hidden transition-all transition-duration-400 ease-in-out">
                                <li>
                                    <a v-ripple class="flex align-items-center cursor-pointer p-4 border-round text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 transition-duration-150 transition-colors p-ripple">
                                        <i class="pi pi-table mr-2"></i>
                                        <span class="font-medium">hello</span>
                                    </a>
                                </li>
                                <li>
                                    <a v-ripple class="flex align-items-center cursor-pointer p-4 border-round text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 transition-duration-150 transition-colors p-ripple">
                                        <i class="pi pi-search mr-2"></i>
                                        <span class="font-medium">bitch</span>
                                    </a>
                                </li>
                            </ul>
                            <ul class="list-none p-0 m-0 overflow-hidden">
                                <li>
                                    <a v-ripple class="flex align-items-center cursor-pointer p-4 border-round text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 transition-duration-150 transition-colors p-ripple">
                                        <i class="pi pi-home mr-2"></i>
                                        <span class="font-medium">Dashboard</span>
                                    </a>
                                </li>
                                <li>
                                    <a v-ripple class="flex align-items-center cursor-pointer p-4 border-round text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 transition-duration-150 transition-colors p-ripple">
                                        <i class="pi pi-bookmark mr-2"></i>
                                        <span class="font-medium">Bookmarks</span>
                                    </a>
                                </li>
                                <li>
                                    <a v-ripple v-styleclass="{selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-slidedown', leaveToClass: 'hidden', leaveActiveClass: 'animate-slideup'}" class="flex align-items-center cursor-pointer p-4 border-round text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 transition-duration-150 transition-colors p-ripple">
                                        <i class="pi pi-chart-line mr-2"></i>
                                        <span class="font-medium">Reports</span>
                                        <i class="pi pi-chevron-down ml-auto"></i>
                                    </a>
                                    <ul class="list-none py-0 pl-4 pr-0 m-0 hidden overflow-hidden transition-all transition-duration-400 ease-in-out">
                                        <li>
                                            <a v-ripple class="flex align-items-center cursor-pointer p-4 border-round text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 transition-duration-150 transition-colors p-ripple">
                                                <i class="pi pi-table mr-2"></i>
                                                <span class="font-medium">View</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a v-ripple class="flex align-items-center cursor-pointer p-4 border-round text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 transition-duration-150 transition-colors p-ripple">
                                                <i class="pi pi-search mr-2"></i>
                                                <span class="font-medium">Search</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a v-ripple class="flex align-items-center cursor-pointer p-4 border-round text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 transition-duration-150 transition-colors p-ripple">
                                        <i class="pi pi-users mr-2"></i>
                                        <span class="font-medium">Team</span>
                                    </a>
                                </li>
                                <li>
                                    <a v-ripple class="flex align-items-center cursor-pointer p-4 border-round text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 transition-duration-150 transition-colors p-ripple">
                                        <i class="pi pi-comments mr-2"></i>
                                        <span class="font-medium">Messages</span>
                                        <span class="inline-flex align-items-center justify-content-center ml-auto bg-primary text-primary-contrast border-circle" style="min-width: 1.5rem; height: 1.5rem">3</span>
                                    </a>
                                </li>
                                <li>
                                    <a v-ripple class="flex align-items-center cursor-pointer p-4 border-round text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 transition-duration-150 transition-colors p-ripple">
                                        <i class="pi pi-calendar mr-2"></i>
                                        <span class="font-medium">Calendar</span>
                                    </a>
                                </li>
                                <li>
                                    <a v-ripple class="flex align-items-center cursor-pointer p-4 border-round text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 transition-duration-150 transition-colors p-ripple">
                                        <i class="pi pi-cog mr-2"></i>
                                        <span class="font-medium">Settings</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="mt-auto">
                    <hr class="mb-4 mx-4 border-top-1 border-none border-surface-200 dark:border-surface-700" />
                    <a v-ripple class="m-4 flex align-items-center cursor-pointer p-4 gap-2 border-round text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 transition-duration-150 transition-colors p-ripple">
                        <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
                        <span class="font-bold">Amy Elsner</span>
                    </a>
                </div>
            </div>
        </template>
    </Drawer>
</template>

<style scoped>
.sidebarBtn {
    position: fixed;
    top: 50%;
}
</style>