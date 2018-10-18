<style scoped lang="less">
.search-box{
	width: 900px;
}
.product{
	.productlist{
		margin-top: 24px;
	}
	.left{
		width: 75%;
		float: left;
		height: 200px;
	}
	.right{
		width: 25%;
		float: right;
		height: 200px;
		.list{
			.item{
				width : 100%;
			}
		}
	}
	.adbox{  
		padding: 0 25px;  
		box-sizing: border-box;
		.title{
		    font-size: 16px;
		    font-weight: bold;
		    border-bottom: solid 1px #cdcdcd;
		    height: 36px;
		    margin-bottom: 20px;
		}
	}
	.list{
		box-sizing: border-box;
		.item{
			width: calc(calc(100% - 30px) / 4);
		    display: inline-block;
		    box-sizing: border-box;o
		    margin-right: 10px;
		    border: solid 1px #cdcdcd;
		    vertical-align: top;
		    padding-bottom: 20px;
		    margin-top: 20px;
		    margin-right: 10px;
		    &:nth-of-type(4n){
				margin-right: 0;
			}
			.itad{
				width: auto;
				margin: 0 25px;
				margin-bottom: 10px;
			}
			img{
				width: 100%;
			}
			.info{
				margin-top: 16px;
				padding: 0 8px;
			}
			.price{
				color: #f40;
				font-size:16px;
				font-weight: bold;
			}
			.payer{
				font-size: 12px;
				color: #888888;
			}
			.name{
				height: 40px;
			    overflow: hidden;
			    font-size: 12px;
			    color: #000;
			    line-height: 16px;
			    margin-top: 8px;
			}
			.shop_address{
				width: 40%;
			    text-overflow: ellipsis;
			    white-space: nowrap;
			    overflow: hidden;
			    display: inline-block;
			}
		}
	}
}




</style>

<template>
	<div class="product">
		<input-search color="#ff5001" width="900px" @searchByKey="searchByKeyWord"></input-search>
		<div class="productlist">
			<div class="left">
				<div class="filter-group-default" role="group">
			        <button type="button" class="item" :class="{'active':currentType == 0}"  @click="changeType(0)">
			            全部商品
			        </button>
			        <button type="button" class="item" :class="{'active':currentType == 1}"  @click="changeType(1)">
			            二手
			        </button>
			    </div>
				<div class="list">
					<div class="item" v-for="(item,index) in productData.data">
						<div @click="goDetail(item)">
							<div>
								<img :src="item.images[0]" alt="">
								<div class="info">
									<div class="clearfix">
										<span class="price fl">{{item.price | money}}</span>
										<span class="payer fr">{{item.payers}}已付款</span>
									</div>
									<div class="name">{{item.name}}</div>
									<div class="clearfix payer">
										<span class="fl">{{item.shop_name}}</span>
										<span class="fr shop_address">{{item.shop_address}}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="pagination block">
				    <el-pagination background layout="prev, pager, next,jumper" :total="productData.total" :page-size="page_size" @current-change="changePage">
				    </el-pagination>
				</div>
			</div>
			<div class="right adbox">
				<div class="title">品牌精选</div>
				<div class="list">
					<div class="item itad" v-for="item in addProductList">
						<img :src="item.images[0]" alt="">
						<div class="info">
							<div class="clearfix">
								<span class="price fl">{{item.price | money}}</span>
								<span class="payer fr">{{item.payers}}已付款</span>
							</div>
							<div class="name">{{item.name}}</div>
							<div class="clearfix payer">
								<span class="fl">{{item.shop_name}}</span>
								<span class="fr shop_address">{{item.shop_address}}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			
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
			currentType : 1,
			productData : [],
			page:1,
			page_size : 8,
        	keyword:'',
		}
	},
	mounted(){
		this.$nextTick(function(){
			this.getProductList();
		})

	},
	computed:{
		addProductList : function(){
			console.log(this.productData.data);
			if(this.productData.data){
				return this.productData.data.slice(0,2);
			}
		}
	},
	methods:{
		getProductList :function(){
			let that = this;
			let params = {
				page : this.page,
				keyword : this.keyword,
				page_size : this.page_size,
			}
			axios.post(config.baseUrl + '/product/list',qs.stringify(params)).then((res)=>{
				if(res.data.status == 0){
					that.productData = res.data.data;
					that.productData.data.forEach(function(val,key){
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
		goDetail:function(item){
			this.$router.push({path:'ProductDetail', query:{id:item.id}});
		},
		changeType:function(type){
			this.currentType = type;
		},
		searchByKeyWord : function(){

		},
		changePage:function(val){
			this.page = val;
			this.getProductList();
		}

	}
}

</script>