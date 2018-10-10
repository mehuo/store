<style scoped lang="less">
.store{
	
	
}


	
</style>

<template>
	<div class="store">
		<!-- <div class="search-box clearfix">
			<div class="page-search">
		        <div class="form-group">
		            <input type="search" placeholder="" value="" class="form-control" placeholder="搜索关键字">
		            <button class="btn search" type="submit">搜索</button>
		        </div>
		    </div>
		</div> -->
		<input-search color="red" radius="4px" @searchByKey="searchByKeyWord"></input-search>
		<el-table :data="storeData.data" style="width: 100%">
	      <el-table-column prop="name" label="名称"></el-table-column>
	      <el-table-column prop="address" label="地址"></el-table-column>
	      <el-table-column prop="create_time" label="创建时间"></el-table-column>
	      <el-table-column prop="update_time" label="更新时间"></el-table-column>
	      <el-table-column
		      fixed="right"
		      label="操作"
		      width="200">
		      <template slot-scope="scope">
		        <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
		        <el-button type="text" size="small">删除</el-button>
		        <el-button type="text" size="small">添加商品</el-button>
		      </template>
		    </el-table-column>
	    </el-table>
	    <div class="pagination block">
		  <el-pagination background layout="prev, pager, next,jumper" :total="storeData.total" :page-size="1" @current-change="changePage">
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
			page_size : 1,
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
		}
		
	}
}
</script>