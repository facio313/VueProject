import { createRouter, createWebHistory, RouterLink, type NavigationFailure, type RouteLocationRaw } from 'vue-router';
import { loginInfo } from '../stores/login/loginInfo';
import { buildRoutes } from './dynamic.service';
import RedirectView from '../views/RedirectView.vue';
import { $mdiInfo } from '../stores/mdiInfo';
import $const from '../stores/constant'
import axios from 'axios';
import lodash from 'lodash';

const router = createRouter({
    // history: createWebHistory(import.meta.env.BASE_URL)
    history: createWebHistory()
    , routes: [
        {
            path: '/'
            , name: 'login'
            , props: () => ({userInfo: loginInfo().getUserInfo()})
            , component: () => import('../views/LoginView.vue')
        }
        /*
        , {
            path: '/'
            , name: 'empty'
            , component: () => import('../views/EmptyView.vue')
            , children: []
        }
        , {
            path: '/'
            , name: 'popup'
            , props: () => ({userInfo: loginInfo().getUserInfo()})
            , component: () => import('../views/PopupView.vue')
        }
            */
        , {
            path: '/redirect'
            , name: 'redirect'
            , component: RedirectView
        }
    ]
    , scrollBehavior() {
        return {top: 0}
    }
});

// 라우터 후킹 (뒤로가기 체크하지 않기 위함)
const routerPushOrg = router.push.bind(router);
const routerReplaceOrg = router.replace.bind(router);
const routerGoOrg = router.go.bind(router);
router.push = function(to: RouteLocationRaw): Promise<void | NavigationFailure | undefined> {
    $mdiInfo().fnSetIgnoreChecksOnExit();
    return routerPushOrg(to);
}
router.replace = function(to: RouteLocationRaw): Promise<void | NavigationFailure | undefined> {
    $mdiInfo().fnSetIgnoreChecksOnExit();
    return routerReplaceOrg(to);
}
router.go = function(delta: number): void {
    $mdiInfo().fnSave();
    $mdiInfo().fnSetIgnoreChecksOnExit();
    return routerGoOrg(delta);
}

router.beforeEach(async (to, from, next) => {
    $mdiInfo().fnResetIgnoreChecksOnExit();

    if ($mdiInfo().fnIsRoutable(to) == false) {
        return;
    }

    // 로그인 체크
    const userInfo = loginInfo().getUserInfo();
    if ((userInfo == null || userInfo.userInfo == null) && !(to.path == '/' || to.path.startsWith('/open'))) {
        if (to.path != '/redirect') {
            loginInfo().setPageInfo(to.path);
            to.query.path = to.path;
            loginInfo().setPageQuery(to.query);
        }   
        return next('/');
    }

    // 로그인되어 있는 경우 메인 화면으로 이동
    if (userInfo != null && userInfo.userInfo != null && to.path =='/') {
        return next('/main');
    }

    // 메뉴 접속 로그 등록 호출
    if (userInfo != null && userInfo.userInfo != null && to.path != '/redirect') {
        loginInfo().callMenuConectLog(to.path);
    }

    // 메뉴 권한
    if (userInfo != null && userInfo.userInfo != null && to.path != '/redirect') {
        const authInfo = {
            selectAt: 'N'
            , insertAt: 'N'
            , updateAt: 'N'
            , deleteAt: 'N'
            , downloadAt: 'N'
        };
        if (userInfo.menuInfo) {
            userInfo.beforMenuInfo = userInfo.menuInfo
        }

        let menuInfo = {};

        for (const i of userInfo.userInfo.menuList) {
            if (i.url !== undefined && i.url === to.path) {
                menuInfo = i;
                if (i.selectAt == 'Y') authInfo.selectAt = 'Y';
                if (i.insertAt == 'Y') authInfo.insertAt = 'Y';
                if (i.updateAt == 'Y') authInfo.updateAt = 'Y';
                if (i.deleteAt == 'Y') authInfo.deleteAt = 'Y';
                if (i.downloadAt == 'Y') authInfo.downloadAt = 'Y'; 
            }
        }
        userInfo.authInfo = authInfo;
        userInfo.menuInfo = menuInfo;
        if (!userInfo.beforMenuInfo) {
            userInfo.beforeMenuInfo = userInfo.menuInfo;
        }
        loginInfo().setUserInfo(userInfo);
    }
    
    // 화면 이동
    return next()

});

router.afterEach((to, from) => {
    // MDI 탭을 이동하면 여기 한 번 더 호출되는데 두 번째 호출될 때는 to와 from이 같다.
    if (from.path == to.path) {
        return;
    }

    const userInfo = loginInfo().getUserInfo();

    // 메인 화면 이동 시 메인 페이지 열기
    if (userInfo != null && userInfo.userInfo != null && to.path == '/main') {
        router.push($const.menu.mainPage.url);
    }

    if (to.path != '/' && to.path != '/login' && to.path != 'main') {
        $mdiInfo().fnPush(to, from);''
    }
});

export default router;