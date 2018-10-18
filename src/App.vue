<template>
  <div id="app">
    <div class="menu">
      <el-header>
        <el-menu :router="true"  class="el-menu-demo fl" mode="horizontal" @select="handleSelect">
          <el-menu-item index="/">商城首页</el-menu-item>
          <el-menu-item index="/shopcart">购物车</el-menu-item>
          <el-menu-item index="/store/list">商铺管理</el-menu-item>
        </el-menu>
        <div class="fr">
          <span v-if="isLogin == 1">
            <span>{{userInfo.name}}</span>
            <a href="" @click="logout">退出</a>
          </span>
          <span v-else>
            <span data-toggle="modal" data-target="#myModal">登录</span>
            <span>注册</span>
          </span>
        </div>
      </el-header>
    </div>
    <div class="content">
        <router-view/>
    </div>

    <!-- 登录弹出框 BEGIN -->
    <div class="modal fade" tabindex="-1" role="dialog" id="myModal">
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">用户登录</h4>
          </div>
          <div class="modal-body">
            <el-form ref="form" :model="loginInfo" label-width="80px" label-position="top">
              <el-form-item label="用户名" prop="uname">
                <el-input v-model="loginInfo.uname"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="loginInfo.password" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
            <div class="oper text-center">
              <a href="" @click="login">登录</a>
              <!-- <router-link to="/User">没有账号，前去注册</router-link> -->
            </div>
          </div>
          <!-- <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div> -->
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
    <!-- 登录弹出框 END -->

  </div>
</template>

<script>

import axios from 'axios';
import qs from 'qs';
import inputSearch from '@/components/inputSearch';
import config from '@/config';
import util from '@/utils';
export default {
  name: 'App',
  data(){
    return {
      loginInfo:{
        uname:'fuyanan',
        password:'1'
      },
      province:[],
      city:[],
      area:[],
      current_province : null,
      current_city : null,
      current_area : null,
      storeInfo : {
        name : '',
        address : ''
      },
      userInfo : null,
      isLogin : null
    }
  },
  mounted() {
  },
  created(){
    this.userInfo = this.$store.state.userInfo;
    this.isLogin = this.$store.state.isLogin;
  },
  methods : {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    login(){
      let that = this;
      axios.post(config.baseUrl + '/admin/login',qs.stringify(this.loginInfo)).then(function(res){
        if(res.data.status == 0){
          that.$store.commit('loginStatus',1);
          that.$store.commit('setUserInfo',res.data.data);
        }else{
          alert(res.data.statusinfo);
        }
      })
    },
    logout(){
      this.$store.commit('loginStatus',0);
      this.$store.commit('setUserInfo',{});
    }
  }
}
</script>
