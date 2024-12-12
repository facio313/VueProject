import {ref, nextTick} from 'vue';
import {defineStore} from 'pinia';
import router from '../router';
import {loginInfo} from './login/loginInfo';
import $const from '../stores/constant';
import type {RouteLocationNormalized, RouteLocationNormalizedLoaded} from 'vue-router';
import TopMDI from '../components/layout/TopMDI.vue';

/*
const handleMDITabClose = (index) => {
    $mdiInfo().fnSetIgnoreChecksOnExit();
    $mdiInfo().fnClose(index);
}
const handleOpenNewWindow = (index, url) => {
    $mdiInfo().fnGotoNewWindow(index, url);
}
*/

export const $mdiInfo = defineStore('$mdiInfo', () => {

    interface MDIItem {
        menuId: string;
        url: string;
        vue: string;
        title: string;
        upperMenuId: string,

        menuNm: string;
        menuLevel: number;
        excludeCachingYn: string;

        fullUrl: string;
        activeUrl: string;
        active: boolean;
        mdiChildren: MDIItem[]|undefined;
        topMenuId: string|undefined;

        fixed: boolean
        , icon: string
    }

    const topMDIs = ref<MDIItem[]>([]);
    const maxMDI = 10;
    const currTabNo = ref(0);
    const cachedComponents = ref<any[]>([]);
    let ignoreChecksOnExit = false;
    const isOnlyOneTab = ref(false);

    function fnSetIgnoreChecksOnExit() {
        ignoreChecksOnExit = false;
    }    

    function fnGetIgnoreChecksOnExit() {
        return ignoreChecksOnExit;
    }

    function getVueNameFromFilePath(filePath: string) {
        try {
            if (filePath != undefined) {
                const match = filePath.match(/\/([^/]+)\.vue$/);
                const fileName = match ? match[1] : '';

                return fileName;
            }
        } catch (e) {
            console.log(e);
        }
        return '';
    }

    function fnSaveLocalStorage(mdis?: MDIItem[]) {
        if (mdis != undefined) {
            localStorage.setItem('topMDIs', JSON.stringify(mdis));
            localStorage.setItem('cachedComponents', JSON.stringify(cachedComponents.value));
        } else {
            localStorage.setItem('topMDIs', JSON.stringify(topMDIs.value));
            localStorage.setItem('cachedComponents', JSON.stringify(cachedComponents.value));
        }
    }

    function fnUpdateCachedComponents() {
        cachedComponents.value = [];

        const vueName = getVueNameFromFilePath($const.menu.mainPage.vue);
        if (vueName && vueName != '') {
            cachedComponents.value.push(vueName);
        }

        topMDIs.value.forEach(mdi => {
            const vueName = mdi.menuId == '1' ? '' : mdi.menuId;
            if (vueName && vueName != '' && (mdi.excludeCachingYn == undefined || mdi.excludeCachingYn == 'N')) {
                cachedComponents.value.push(vueName);
            }

            if (mdi.mdiChildren != undefined) {
                mdi.mdiChildren.forEach(mdiChild => {
                    const vueName = mdiChild.menuId;
                    if (vueName && vueName != '' && (mdiChild.excludeCachingYn == undefined || mdiChild.excludeCachingYn == 'N')) {
                        cachedComponents.value.push(vueName);
                    }
                })
            }
        });
    }

    function fnClose(index: number) {
        if (window.event) {
            window.event.stopPropagation();
        }

        topMDIs.value.splice(index, 1);
        fnUpdateCachedComponents();

        if (currTabNo.value == index) {
            if (index >= topMDIs.value.length) {
                currTabNo.value = topMDIs.value.length - 1;
                if (currTabNo.value >= 0) {
                    topMDIs.value[currTabNo.value].active = true;
                    router.replace({name: topMDIs.value[currTabNo.value].menuId});
                } else {
                router.replace({name: $const.menu.mainPage.menuId});
                }
            } else if (topMDIs.value.length > 0) {
                topMDIs.value[currTabNo.value].active = true;
                router.replace({name: topMDIs.value[currTabNo.value].menuId});
            } else {
                router.replace({name: $const.menu.mainPage.menuId});
            }
        } else if (currTabNo.value > index) {
            currTabNo.value -= 1;
        }
        
        fnSaveLocalStorage();
    }

    function fnSave() {
        fnSaveLocalStorage();
    }

    function fnGotoNewWindow(index: number, url: string) {
        const mdi = topMDIs.value[index];
        const mdis = topMDIs.value.filter(x => x.menuId == mdi.menuId);

        const win = window.open(url, '_blank');
        if (win) {
            win.focus();
        }

        fnClose(index);
        fnSaveLocalStorage(mdis);
    }

    function fnResetIgnoreChecksOnExit() {
        ignoreChecksOnExit = false;        
    }

    function createMenu_MainPage(): MDIItem {
        const menu = Object.assign($const.menu.mainPage, <MDIItem> {
            icon: 'ki ico-home'
            , fixed: true
            , active: false
        });

        return menu;
    }

    function fnGetMenu(toPath: string): MDIItem | undefined {
        let menu = <MDIItem>{};

        switch (toPath) {
            case '/main': return;
            case $const.menu.mainPage.url: menu = createMenu_MainPage(); break;
            default: {
                const menuList = loginInfo().getUserInfo().userInfo.menuList.filter((x: any) => x.url == toPath);
                if (menuList == undefined || menuList.length == 0) {
                    return;
                } else if (menuList.length > 1) {
                    return;
                }
            }
        }

        return menu;
    }

    function fnGetMDI(target: MDIItem[], menuId: string): MDIItem|undefined {
        let tmpMdi: any = undefined;
        target.forEach(parent => {
            if (parent.menuId == menuId) {
                tmpMdi = parent;
                return true;
            } else if (parent.mdiChildren != undefined){
                const mdi = fnGetMDI(parent.mdiChildren, menuId);
                if (mdi != undefined) {
                    tmpMdi = mdi;
                    return true;
                }
            }
        });

        return tmpMdi;
    }

    function fnGetMDIByMenuId(menuId: string): MDIItem|undefined {
        return fnGetMDI(topMDIs.value, menuId);
    }

    function fnGetTopMenu(menu: any): any {
        const menuList = loginInfo().getUserInfo().userInfo.menuList.filter((x: any) => x.url != undefined && x.url.trim().length > 0 && x.menuId == menu.upperMenuId);
        if (menuList != undefined && menuList.length == 1) {
            return fnGetTopMenu(menuList[0]);
        }

        return menu;
    }

    function fnIsRoutable(to: any) {
        const tabCount = topMDIs.value.length - topMDIs.value.filter(x => x.menuId == $const.menu.mainPage.menuId).length;

        if (tabCount >= maxMDI) {
            const menu = fnGetMenu(to.path);
            if (menu == undefined) {
                return false;
            }

            const target = fnGetMDIByMenuId(menu.menuId);

            if (target == undefined) {
                const targetParent = fnGetMDIByMenuId(menu.upperMenuId);

                if (targetParent == undefined) {
                    const topMenu = fnGetTopMenu(menu);
                    const targetTopParent = fnGetMDIByMenuId(topMenu.menuId);

                    if (targetTopParent == undefined) {
                        return false;
                    }
                }
            }
        }
    }

    function fnLoadLocalStorage() {
        const isTopMDIs = localStorage.getIedm('topMDIs');
        const isCachedComponents = localStorage.getItem('cachedComponents');

        if (isTopMDIs != undefined) {
            topMDIs.value = JSON.parse(isTopMDIs);
        }
        if (isCachedComponents != undefined) {
            cachedComponents.value = JSON.parse(isCachedComponents);
        }
    }

    function fnPush(to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded) {
        if (from.path == '/') {
            if (from.name == undefined) {
                fnLoadLocalStorage();

                if (topMDIs.value.length == 1 && topMDIs.value[0].menuId != $const.menu.mainPage.menuId) {
                    if (topMDIs.value[0].menuId != to.name) {
                        console.log('크롬탭으로 드래그 거부');
                        return;
                    }

                    isOnlyOneTab.value = true;
                    document.title = `DAIP - ${topMDIs.value[0].title}`;

                    console.log('새탭으로 이동');
                } else {
                    console.log('새로고침');
                }
            } else {
                console.log('새로운 케이스');
            }
        }

        if (currTabNo.value >= 0 && currTabNo.value < topMDIs.value.length) {
            topMDIs.value.forEach(x => {x.active = false});
        }

        const menu = fnGetMenu(to.path);
        if (menu == undefined) {
            return;
        }

        const target = fnGetMDIByMenuId(menu.menuId);

        if (target != undefined) {
            if (target.topMenuId != undefined) {
                if (target.topMenuId == target.menuId) {
                    target.mdiChildren = undefined;
                } else {
                    console.log('fnPush');
                }
                const mdiList = topMDIs.value.filter(x => x.menuId == target.topMenuId);
                const idx = topMDIs.value.findIndex(x => x.menuId == target.topMenuId);
                currTabNo.value = idx;
                if (mdiList != undefined && mdiList.length == 1) {
                    mdiList[0].activeUrl = to.fullPath;
                    mdiList[0].active = true;
                }
            } else {
                console.log('있을 수 없다.');
            }
        } else {
            const targetParent = fnGetMDIByMenuId(menu.upperMenuId);
            if (targetParent != undefined) {
                if (targetParent.topMenuId != undefined) {
                    if (targetParent.topMenuId == targetParent.menuId) {
                        console.log('fnPush');
                    } else {
                        console.log('fnPush');
                    }
                    const newTarget = Object.assign({}, menu);
                    newTarget.fullUrl = to.fullPath;
                    newTarget.topMenuId = targetParent.topMenuId;
                    if (targetParent.mdiChildren == undefined) {
                        targetParent.mdiChildren = <MDIItem[]>[];
                    }
                    targetParent.mdiChildren.push(newTarget);

                    const mdiList = topMDIs.value.filter(x => x.menuId == newTarget.topMenuId);
                    const idx = topMDIs.value.findIndex(x => x.menuId == newTarget.topMenuId);
                    currTabNo.value = idx;
                    if (mdiList != undefined && mdiList.length == 1) {
                        mdiList[0].activeUrl = fnGetActiveUrl(newTarget);
                        mdiList[0].active = true;
                    }
                } else {
                    console.log('있을 수 없다.');
                }
            } else {
                const topMenu = fnGetTopMenu(menu);
                let targetTopParent = fnGetMDIByMenuId(topMenu.menuId);
                const newTarget = Object.assign({}, menu);

                if (targetTopParent != undefined) {
                    console.log('fnPush');
                } else {
                    targetTopParent = Object.assign({}, topMenu);
                    const allMenuList = loginInfo().getUserInfo().userInfo.useInfo.meunuList;
                    let tmpChild = <MDIItem|undefined>{};
                    tmpChild = newTarget;
                    while (tmpChild != undefined) {
                        let menuList = allMenuList.filter((x: any) => tmpChild != undefined && x.menuId == tmpChild.menuId);
                        let upperMenuId = '';
                        if (menuList != undefined && menuList.length == 1) {
                            upperMenuId = menuList[0].upperMenuId;
                        }

                        menuList = allMenuList.filter((x: any) => x.url != undefined && x.url.trim().length > 0 && x.menuId == upperMenuId);
                        if (menuList != undefined && menuList.length == 1) {
                            const newTargetParent = Object.assign({}, menuList[0]);
                            newTargetParent.topMenuId = (targetTopParent != undefined) ? targetTopParent.menuId : undefined;
                            if (newTargetParent.mdiChildren == undefined) {
                                newTargetParent.mdiChildren = <MDIItem[]>[];
                            }
                            newTargetParent.mdiChildren.push(tmpChild);
                            tmpChild.topMenuId = (targetTopParent != undefined) ? targetTopParent.menuId : undefined;
                            tmpChild.fullUrl = to.fullPath;
                            tmpChild = newTargetParent;
                        } else {
                            topMDIs.value.push(tmpChild);
                            tmpChild.topMenuId = (targetTopParent != undefined) ? targetTopParent.menuId : undefined;
                            tmpChild.fullUrl = to.fullPath;
                            tmpChild.activeUrl = fnGetActiveUrl(newTarget);
                            tmpChild.active = true;
                            tmpChild = undefined;
                        }
                    }
                }

                if (targetTopParent != undefined) {
                    targetTopParent.activeUrl = fnGetActiveUrl(newTarget);
                    targetTopParent.active = true;
                    const idx = topMDIs.value.findIndex(x => x.menuId == ((targetTopParent != null) ? targetTopParent.menuId : ''));
                    currTabNo.value = idx;
                }
            }
        }

        fnUpdateCachedComponents();
    }

    function fnGetActiveUrl(mdi: MDIItem) {
        if (mdi.menuId == $const.menu.searchMapPage.menuId) {
            return mdi.url;
        }

        return mdi.fullUrl;
    }

    return {
        topMDIs, currTabNo, cachedComponents, isOnlyOneTab, 
        fnUpdateCachedComponents, fnClose, fnGotoNewWindow, fnSetIgnoreChecksOnExit, fnGetIgnoreChecksOnExit, fnSave, fnResetIgnoreChecksOnExit, fnIsRoutable, fnPush
    }
});