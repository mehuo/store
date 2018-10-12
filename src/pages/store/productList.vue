<style scoped lang="less">
.store{
	table{
		.tag{
			background: #409eff;
		    display: inline-block;
		    color: #fff;
		    border-radius: 4px;
		    padding: 0px 8px;
		    margin-right : 8px;
		    margin-bottom : 4px;
		}
	}
	
}

</style>

<template>
	<div class="store">
		<input-search class="fl" color="#409EFF" radius="4px" width="500px;" @searchByKey="searchByKeyWord"></input-search>
		<a class="btn-min sbtn-primary fr" @click="addProduct()" >添加产品</a>
		<el-table :data="data.data" style="width: 100%">
	      <el-table-column prop="name" label="名称"></el-table-column>
	      <el-table-column prop="key_words" label="关键词">
	      	<template slot-scope="scope">
	      		<div class="tag" v-for="item in scope.row.key_words">
		      		{{item}}
		      	</div>
	      	</template>
	      </el-table-column>
	      <el-table-column prop="price" label="价格"></el-table-column>
	      <el-table-column prop="size_detail" label="尺码">
	      	<template slot-scope="scope">
	      		<div class="tag" v-for="item in scope.row.size_detail">
		      		{{item.text}}
		      	</div>
	      	</template>
	      </el-table-column>
	      <el-table-column prop="type_detail" label="分类">
	      	<template slot-scope="scope">
	      		<div class="tag" v-for="item in scope.row.type_detail">
		      		{{item.text}}
		      	</div>
	      	</template>
	      </el-table-column>
	      <el-table-column prop="part_ids" label="附加商品"></el-table-column>
	      <el-table-column
		      fixed="right"
		      label="操作"
		      width="200">
		      <template slot-scope="scope">
		        <el-button @click="editThis(scope.row)" type="text" size="small">编辑</el-button>
		        <el-button @click="deleteThis(scope.row)" type="text" size="small">删除</el-button>
		      </template>
		    </el-table-column>
	    </el-table>
	    <div class="pagination block">
		  <el-pagination background layout="prev, pager, next,jumper" :total="data.total" :page-size="10" @current-change="changePage">
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
			data : {},
			// page_size : 1,
			page:1,
        	keyword:'',
        	shop_id : ''
		}
	},
	mounted() {
		let query = this.$route.query;
		this.shop_id = query.tag;
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
				page_size : this.page_size,
				shop_id : this.shop_id
			}
			axios.post(config.baseUrl + '/product/list',qs.stringify(params)).then((res)=>{
				console.log(res)
				if(res.data.status == 0){
					that.data = res.data.data;
					that.data.data.forEach(function(val,key){
						val.key_words = JSON.parse(val.key_words);
						val.size_detail = JSON.parse(val.size_detail);
						val.type_detail = JSON.parse(val.type_detail);
						val.images = JSON.parse(val.images);
					})
				}else{
					alert(res.data.statusinfo);
				}
			}).catch((res)=>{
				console.log(res);
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
		//编辑商品
		editThis(row){
			this.$router.push({ path: '/store/addProduct', query: { tag: this.shop_id, row_id:row.id }})
		},
		//删除商品
		deleteThis(row){
			if(confirm('确认要删除这个商品吗？')){
				axios.post(config.baseUrl + '/product/delete',qs.stringify({id:row.id})).then((res)=>{
					console.log(res);
					this.page = 1;
					this.getList();
				}).catch((res)=>{
					console.log(res);
				})
			}
		},
		//在该店铺下增加商品
		addProduct(shop_id){
			this.$router.push({ path: '/store/addProduct', query: { tag: this.shop_id }})
		},
	}
}
</script>