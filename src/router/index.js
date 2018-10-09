import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ShopCart from '@/pages/shopcart'
import Address from '@/pages/address'
import Product from '@/pages/product/product'
import AddProduct from '@/pages/product/addProduct'
import AddStore from '@/pages/product/addStore'
import ProductDetail from '@/pages/product/details'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Product',
      component: Product
    },
    {
      path: '/addStore', //添加商铺
      name: 'addStore',
      component: AddStore 
    },
    {
      path: '/addProduct', //添加商品页面
      name: 'AddProduct',
      component: AddProduct
    },
    {
      path: '/productdetail?tag=:id',
      name: 'ProductDetail',
      component: ProductDetail
    },
    {
      path: '/shopcart?tag=:id&size=:size&color=:color',
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
