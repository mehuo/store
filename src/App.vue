<template>
  <div id="app">
    <div class="menu">
      <ul>
        <li>
          <router-link to="/">商城首页</router-link>
        </li>
        <li>
          <router-link to="/shopcart">购物车</router-link>
        </li>
      </ul>
    </div>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
