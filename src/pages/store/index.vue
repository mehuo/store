<style scoped lang="less">
	
</style>

<template>
	<div class="store">
		<div class="leftMenus">
			<el-menu :router="true"  class="el-menu-demo" @select="handleSelect">
	          <el-menu-item index="/store/list">商铺列表</el-menu-item>
	          <el-menu-item index="/store/addStore">添加商铺</el-menu-item>
	        </el-menu>
		</div>
		<div class="contentbox">
			<router-view/>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
import config from '@/config';

export default{
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