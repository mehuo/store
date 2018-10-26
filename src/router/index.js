import Vue from 'vue'
import Router from 'vue-router'

//系统部分
import Login from '@/pages/system/login'
//商品部分
import Product from '@/pages/product/product'
import ProductDetail from '@/pages/product/details'

//商铺部分
import Store from '@/pages/store/index'
import StoreList from '@/pages/store/list'
import AddStore from '@/pages/store/addStore'
import AddProduct from '@/pages/store/addProduct'
import ProductList from '@/pages/store/productList'

//订单部分包括购物车
import ShopCart from '@/pages/order/shopcart'
import Order from '@/pages/order/order'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Product',
      component: Product
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/productdetail',
      name: 'ProductDetail',
      component: ProductDetail
    },
    {
      path: '/shopcart',
      name: 'ShopCart',
      component: ShopCart
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/store', //商铺模块
      name: 'store',
      component: Store,
      children : [
        {
          path: 'list', //商铺列表
          name: 'list',
          component: StoreList 
        },
        {
          path: 'addStore', //添加商铺
          name: 'addStore',
          component: AddStore 
        },
        {
          path: 'addProduct', //添加商品页面
          name: 'AddProduct',
          component: AddProduct
        },
        {
          path: 'productList', //查看商品列表
          name:'productList',
          component: ProductList
        }
      ]
    }
  ]
})
