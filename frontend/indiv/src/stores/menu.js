import { defineStore } from 'pinia';
import menuData from '@/router/menu.json';

export const useMenuStore = defineStore('menu', {
    state: () => ({
        selectedMenu: null,
        priorMenu: 'Home',
        mainMenu: menuData.filter(menu => menu.level == 0),
        subMenu: [],
        tab: []
    }),
    actions: {
        setMenu(menu) {
            this.priorMenu = this.selectedMenu;
            this.selectedMenu = menu;
            if (this.priorMenu != this.selectedMenu) {
                this.setSubMenu();
            }
        },
        setSubMenu() {
            this.subMenu = menuData.filter(subMenu => subMenu.sort == this.selectedMenu);
        }
    }
});