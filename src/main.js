// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'; 
import filters from '@/filters/filters.js';
import ElementUI from 'element-ui';
import store from './store'

Vue.use(VueResource)
Vue.use(ElementUI)

Object.keys(filters).forEach(function(key){
    Vue.filter( key , filters[key]);
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
