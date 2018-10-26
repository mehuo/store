import Vue from 'vue'
import Vuex from 'vuex'
import util from '../utils/index'
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLogin: util._getCookie('isLogin'),
    userInfo : JSON.parse(util._getCookie('userInfo')),
    commit_products : util._getItem('commit_products')
  },
  getters : {
    order_products(state){
      if(state.commit_products){
        return JSON.parse(state.commit_products);
      }else{
        return []
      }
    }
  },
  mutations: {
    loginStatus (state,status) {
        // 变更登录状态
        state.isLogin = status
        util._setCookie('isLogin',state.isLogin);
    },
    setUserInfo (state,info){
    	util._setCookie('userInfo',JSON.stringify(info));
    },
    commitOrder(state,info){
      state.commit_products = JSON.stringify(info);
      util._setItem('commit_products',JSON.stringify(info));
    }
  },
  actions : {

  }
});

export default store