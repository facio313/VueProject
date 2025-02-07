import { defineStore } from 'pinia';
import menuData from '@/router/menu.json';

export const useMenuStore = defineStore('menu', {
    state: () => ({
        selectedMenu: null,
        priorMenu: menuData.filter(menu => menu.name == 'Home'),
        mainMenus: menuData.filter(menu => menu.level == 0),
        subMenus: menuData.filter(menu => menu.sort == 'Home'),
        tabs: [menuData.filter(menu => menu.name == 'Home')[0]],
        activeTab: null,
    }),
    actions: {
        setMenu(menuName) {
            this.priorMenu = this.selectedMenu;
            this.selectedMenu = menuName;
            if (this.priorMenu.name != this.selectedMenu) {
                this.setSubMenus();
            }
        },
        setSubMenus() {
            this.subMenu = menuData.filter(subMenu => subMenu.sort == this.selectedMenu);
        },
        setTabs(event) {
            const tabId = event.target.id;
            const tabNames = this.tabs.map(tab => tab.name);

            if (!tabNames.includes(tabId)) {
                this.tabs.push(menuData.filter(menu => menu.name == tabId)[0]);
            }
        },
        deleteTab(tabId) {
            this.tabs.forEach(tab, index => {
                if (tab.name == tabId) {
                    this.tabs.splice(index, 1);
                }
            });
        },
        activateTab(tabId) {
            const allTabs = document.querySelectorAll('.tab');
            allTabs.forEach(tab => {
                if (tab.id != tabId) {
                    tab.style.background = 'rgb(238, 235, 222)';
                } else {
                    tab.style.background = 'rgb(255, 255, 255)';
                }
            });
        }
    }
});