<template>
  <div id="app">
    <div class="menu">
      <el-header>
        <el-menu :router="true"  class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="/">商城首页</el-menu-item>
          <el-menu-item index="/shopcart">购物车</el-menu-item>
          <el-menu-item index="/addProduct">添加商品</el-menu-item>
          <el-menu-item index="/store/list">商铺管理</el-menu-item>
        </el-menu>
      </el-header>
    </div>
    <div class="content">
        <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      province:[],
      city:[],
      area:[],
      current_province : null,
      current_city : null,
      current_area : null,
      storeInfo : {
        name : '',
        address : ''
      }
    }
  },
  mounted() {
  },
  created(){
  },
  methods : {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>
