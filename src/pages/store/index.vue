<style scoped lang="less">
	
</style>

<template>
	<div class="store">
		<div class="leftMenus">
	      <ul>
	        <li>
	          <router-link to="/list">商铺列表</router-link>
	        </li>
	        <li>
	          <router-link to="/add">添加商铺</router-link>
	        </li>
	      </ul>
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
		
	}
}
</script>