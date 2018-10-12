<style scoped lang="less">
.store{
	
	
}


	
</style>

<template>
	<div class="store">
		<input-search color="#409EFF" radius="4px" @searchByKey="searchByKeyWord"></input-search>
		<el-table :data="storeData.data" style="width: 100%">
	      <el-table-column prop="name" label="名称"></el-table-column>
	      <el-table-column prop="address" label="地址"></el-table-column>
	      <el-table-column prop="create_time" label="创建时间"></el-table-column>
	      <el-table-column prop="update_time" label="更新时间"></el-table-column>
	      <el-table-column
		      fixed="right"
		      label="操作"
		      width="180">
		      <template slot-scope="scope">
		        <el-button @click="editThis(scope.row)" type="text" size="small">编辑</el-button>
		        <el-button @click="deleteThis(scope.row)" type="text" size="small">删除</el-button>
		        <el-button @click="openProductList(scope.row)" type="text" size="small">商品列表</el-button>
		      </template>
		    </el-table-column>
	    </el-table>
	    <div class="pagination block">
		  <el-pagination background layout="prev, pager, next,jumper" :total="storeData.total" :page-size="10" @current-change="changePage">
		  </el-pagination>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
import inputSearch from '@/components/inputSearch';
import config from '@/config';

export default{
	components : {
    	inputSearch
    },
	data(){
		return {
			storeData : {},
			// page_size : 1,
			page:1,
        	keyword:''
		}
	},
	mounted() {
		this.getList();
	},
	created(){
	},
	methods : {
		getList(){
			let that = this;
			let params = {
				page : this.page,
				keyword : this.keyword,
				page_size : this.page_size
			}
			axios.post(config.baseUrl + '/store/list',qs.stringify(params)).then((res)=>{
				console.log(res)
				if(res.data.status == 0){
					that.storeData = res.data.data;
				}else{
					alert(res.data.statusinfo);
				}
			}).catch((res)=>{

			})
		},
		changePage(val){
			this.page = val;
			this.getList();
		},
		searchByKeyWord(keyword){
			this.keyword = keyword;
			this.getList();
		},
		//编辑店铺
		editThis(row){
			this.$router.push({ path: '/store/addStore', query: { tag: row.id }})
		},
		//删除店铺
		deleteThis(row){
			axios.post(config.baseUrl + '/store/delete',qs.stringify({id:row.id})).then((res)=>{
				console.log(res);
				this.page = 1;
				this.getList();
			}).catch((res)=>{
				console.log(res);
			})
		},
		//查看该店铺下的商品
		openProductList(row){
			this.$router.push({ path: '/store/productList', query: { tag: row.id }})
		}


		
	}
}
</script>