import axios from 'axios';
import { defineStore } from 'pinia';

export const loginInfo = defineStore('loginInfo', () => {
    let pageInfo: string = '/main';
    let pageQuery: object = {};
    let userInfo: any = {
        moduleList: [
            {moduAtrbNm: '빈 화면 (템플릿)', moduId: 'emptyTemplate', moduSeNm: 'empty', urlAddr: '/empty/template', useYn: 'Y', vuePathNm: './src/views/template/empty.vue'}
            , {moduAtrbNm: '팝업 (템플릿)', moduId: 'popupTemplate', moduSeNm: 'popip', urlAddr: '/popup/template', useYn: 'Y', vuePathNm: './src/views/template/popup.vue'}
        ]
        , userInfo: {menuList: [
            {deleteAt: 'Y', downloadAt: 'Y', indictAt: 'N', insertAt: 'Y', lwprtMenuCnt: 0, lwprtMenuIndictCnt: 0, menuId: '1', menuLevel: 1, menuNm: 'MAIN', selectAt: 'Y', sortOrder: 1, title: 'MAIN', updateAt: 'Y', upperMenuId: 'root', url: '/mainPage', useAt: 'Y', vue: './src/views/MainPage.vue'}
            , {deleteAt: 'Y', downloadAt: 'Y', indictAt: 'N', insertAt: 'Y', lwprtMenuCnt: 0, lwprtMenuIndictCnt: 0, menuId: '2', menuLevel: 1, menuNm: '통합지도', selectAt: 'Y', sortOrder: 2, title: '통합지도', updateAt: 'Y', upperMenuId: 'root', url: '/searchMapPage', useAt: 'Y', vue: './src/views/SearchMapPage.vue'}
        ]}
    }
    
    function setLoginInfo(results: any) {
        let accessToken = '';
        let grantType = '';

        if (typeof results === 'string' || results instanceof String) {
            accessToken = results.toString();
            grantType = 'Bearer';
        } else if (results !== null) {
            accessToken = results.accessToken;
            grantType = results.grantType;
        }

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('grantType', grantType);
    }

    function getUserInfo() {
        return userInfo
    }

    function setUserInfo(value: any) {
        if (value == null) {
            this.setLoginInfo(null);
        }
        userInfo = value;
    }

    function setPageInfo(value: string) {
        pageInfo = value;
    }

    function setPageQuery(value: object) {
        pageQuery = value;
    }

    function callMenuConectLog(url: string) {
        axios.get('/api/login/menuConectLog', {url: url});
    }

    return { getUserInfo, setLoginInfo, setUserInfo, setPageInfo, setPageQuery, callMenuConectLog  }
});