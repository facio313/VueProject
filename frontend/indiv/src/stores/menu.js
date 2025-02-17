import { defineStore } from 'pinia';
import menuData from '@/router/menu.json';

export const useMenuStore = defineStore('menu', {
    state: () => ({
        selectedMenu: 'Home',
        activeMainMenu: 'Home',
        activeTab: 'Home',
        priorMainMenu: '',
        priorMenu: menuData.filter(menu => menu.id == 'Home'),
        mainMenus: menuData.filter(menu => menu.level == 0),
        subMenus: menuData.filter(menu => menu.sort == 'Home'),
        tabs: [menuData.filter(menu => menu.id == 'Home')[0]],
    }),
    actions: {
        setMainMenu(menuId) {
            this.priorMenu = menuData.filter(menu => menu.id == this.selectedMenu);
            this.priorMainMenu = this.priorMenu.sort;
            this.selectedMenu = menuId;
            this.activeMainMenu = menuData.filter(menu => menu.id == menuId)[0].sort;
            if (this.priorMainMenu != this.activeMainMenu) {
                this.setSubMenus();
            }
        },
        setSubMenus() {
            this.subMenus = menuData.filter(subMenu => subMenu.sort == this.selectedMenu);
        },
        setTabs(event) {
            const tabId = event.target.id;
            const tabIds = this.tabs.map(tab => tab.id);

            if (!tabIds.includes(tabId)) {
                this.tabs.push(menuData.filter(menu => menu.id == tabId)[0]);
            }
            this.activeTab = tabId;
        },
        deleteTab(tabId) {
            this.tabs.forEach((tab, index) => {
                if (tab.id == tabId) {
                    this.tabs.splice(index, 1);
                }
            });
            // activeTab이랑 router 보여주는 것 바꾸기
        },
    }
});