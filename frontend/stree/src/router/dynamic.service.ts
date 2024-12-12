import router from '../router';
import { loginInfo } from '../stores/login/loginInfo';
const modules = import.meta.glob('./src/views/**/*.vue');

export function buildRoutes() 
     const userInfo = loginInfo().getUserInfo();

    // 메뉴 router 등록
    if (userInfo !== null && userInfo.userInfo !== null) {
        const jsonInput = userInfo.userInfo.menuList

        const newRoutes = jsonInput
                            .filter((item: any) => item.url != null && item.url != '' && item.vue != null && item.vue != '')
                            .map((item: any) => ({
                                name: item.menuId.toString()
                                , path: item.url
                                , props: true
                                , component: modules[item.vue.replace('@/views', '/src/views')]
                            }));

        newRoutes.forEach((route: any) => {
            router.addRoute('main', route)


        //모듈 router 등록
        if (userInfo !== null && userInfo.modulteList !== null && userInfo.moduleList.length > 0) {
            for (const item of userInfo.moduleList) {
                if (item.url != null && item.url != '' && item.vue != null && item.vue != '') {
                    router.addRoute(item.moduleSe, {
                        name: item.moduleId
                        , path: item.url
                        , component: modules[item.vue.replace('@/views', '/src/views')]
                    });
                }
            }
        }
    }
}