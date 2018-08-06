import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ShopCart from '@/pages/shopcart'
import Address from '@/pages/address'
import Product from '@/pages/product'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Product',
      component: Product
    },
    {
      path: '/shopcart',
      name: 'ShopCart',
      component: ShopCart
    },
    {
      path: '/address',
      name: 'Address',
      component: Address
    }
  ]
})
