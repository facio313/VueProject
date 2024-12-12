const constantValues = {
    menu: {
        mainPage: {
            menuId: '1'
            , url: '/mainPage'
            , title: 'MAIN'
            , vue: './src/views/MainPage.vue'
        }
        , searchPage: {
            menuId: '2'
            , url: '/searchPage'
            , title: '찾기'
            , vue: './src/views/SearchPage'
        }
        , searchPage1: {
            menuId: '12'
            , url: '/searchPage1'
            , title: '찾기'
            , vue: './src/views/SearchPage1'
        }        
    }
    , getKeys: function(data) {
        if (data instanceof Object) {
            return Object.keys(data);
        } else if (typeof(data) === 'string') {
            const obj = this[data];
            return Object.keys(obj);
        }
        return '';
    }
}
export default constantValues;