import { defineStore } from 'pinia';
import menuData from '@/router/menu.json';

export const useMenuStore = defineStore('menu', {
    state: () => ({
        selectedMenu: 'Home',
        priorMenu: menuData.filter(menu => menu.id == 'Home'),
        mainMenus: menuData.filter(menu => menu.level == 0),
        subMenus: menuData.filter(menu => menu.sort == 'Home'),
        tabs: [menuData.filter(menu => menu.id == 'Home')[0]],
        activeTab: 'Home',
    }),
    actions: {
        setMenu(menuId) {
            this.priorMenu.id = this.selectedMenu;
            this.selectedMenu = menuId;
            if (this.priorMenu.id != this.selectedMenu) {
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