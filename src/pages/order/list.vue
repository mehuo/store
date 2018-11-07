<style scoped lang="less">
.store{
	
	
}
	
</style>

<template>
	<div class="store">
		<input-search color="#409EFF" radius="4px" @searchByKey="searchByKeyWord"></input-search>
		<el-table :data="pageData.data" style="width: 100%">
	      <el-table-column prop="code" label="编号"></el-table-column>
	      <el-table-column prop="order_price" label="订单价格"></el-table-column>
	      <el-table-column prop="order_status" label="订单状态"></el-table-column>
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
		  <el-pagination background layout="prev, pager, next,jumper" :total="pageData.total" :page-size="10" @current-change="changePage">
		  </el-pagination>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
import inputSearch from '@/components/inputSearch';
import config from '@/config';
import util from '@/utils';
import { mapGetters , mapState} from 'vuex'


export default{
	components : {
    	inputSearch
    },
    computed : {
		...mapState([
			'userInfo',
		])
	},
	data(){
		return {
			pageData : {},
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
				user_id : this.userInfo.id,
				order_status : 1,
				page : this.page,
				page_size : this.page_size
			}
			axios.post(config.baseUrl + '/order/list',qs.stringify(params)).then((res)=>{
				if(res.data.status == 0){
					that.pageData = res.data.data;
					console.log(that.pageData);
					that.pageData.data.forEach(function(value,key){
						console.log(value.create_time,new Date(value.create_time))
						value.create_time = util._dateFormat(new Date(value.create_time));
						value.update_time = util._dateFormat(value.update_time);
					})

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
			if(confirm('确认要删除这个商铺吗？')){
				axios.post(config.baseUrl + '/store/delete',qs.stringify({id:row.id})).then((res)=>{
					console.log(res);
					this.page = 1;
					this.getList();
				}).catch((res)=>{
					console.log(res);
				})
			}
			
		},
		//查看该店铺下的商品
		openProductList(row){
			this.$router.push({ path: '/store/productList', query: { tag: row.id }})
		}


		
	}
}
</script>