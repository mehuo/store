import Vue from 'vue'
import Vuex from 'vuex'
import util from '../utils/index'
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLogin: util._getCookie('isLogin'),
    userInfo : JSON.parse(util._getCookie('userInfo'))
  },
  mutations: {
    loginStatus (state,status) {
        // 变更登录状态
        state.isLogin = status
        util._setCookie('isLogin',state.isLogin);
    },
    setUserInfo (state,info){
    	util._setCookie('userInfo',JSON.stringify(info));
    }
  }
});

export default store