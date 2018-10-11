<style>
.product{

}
.product .productlist{
	margin-top: 24px;
}
.product .left{
	width: 75%;
	float: left;
	height: 200px;
}
.product .right{
	width: 25%;
	float: right;
	height: 200px;
}
.product .list{
	box-sizing: border-box;
}
.product .list .item{
	width: calc(calc(100% - 30px) / 4);
    display: inline-block;
    box-sizing: border-box;o
    margin-right: 10px;
    border: solid 1px #cdcdcd;
    vertical-align: top;
    padding-bottom: 20px;
    margin-top: 20px;
    margin-right: 10px;
}
.product .list .item:nth-of-type(4n){
	margin-right: 0;
}
.product .list .itad{
	width: auto;
	margin: 0 25px;
	margin-bottom: 10px;
}

.product .list .item img{
	width: 100%;
}
.product .list .item .info{
	margin-top: 16px;
	padding: 0 8px;
}
.product .list .item .price{
	color: #f40;
	font-size:16px;
	font-weight: bold;
}
.product .list .item .payer{
	font-size: 12px;
	color: #888888;
}
.product .list .item .name{
	height: 40px;
    overflow: hidden;
    font-size: 12px;
    color: #000;
    line-height: 16px;
    margin-top: 8px;
}

.adbox .title{    
	margin: 0 25px;
    font-size: 16px;
    font-weight: bold;
    border-bottom: solid 1px #cdcdcd;
    height: 36px;
    margin-bottom: 20px;
}
.search-box{
	width: 900px;
}

</style>

<template>
	<div class="product">
		<!-- <div class="search-box clearfix">
			<div class="page-search">
		        <div class="form-group">
		            <input type="search" placeholder="" value="" class="form-control" placeholder="搜索关键字">
		            <button class="btn search" type="submit">搜索</button>
		        </div>
		    </div>
		</div> -->
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
					<div class="item" v-for="(item,index) in productList">
						<router-link :to="{name:'ProductDetail',params :{id:item.id,index:index}}">
							<div>
								<img :src="item.images[0]" alt="">
								<div class="info">
									<div class="clearfix">
										<span class="price fl">{{item.price | money}}</span>
										<span class="payer fr">{{item.payers}}已付款</span>
									</div>
									<div class="name">{{item.name}}</div>
									<div class="clearfix payer">
										<span class="fl">{{item.shop}}</span>
										<span class="fr">{{item.shop_address}}</span>
									</div>
								</div>
							</div>
						</router-link>
					</div>
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
								<span class="fl">{{item.shop}}</span>
								<span class="fr">{{item.shop_address}}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
import inputSearch from '@/components/inputSearch';
export default{
	components : {
		inputSearch
	},
	data(){
		return {
			currentType : 1,
			productList : []
		}
	},
	mounted(){
		this.$nextTick(function(){
			this.getProductList();
		})

	},
	computed:{
		addProductList : function(){
			return this.productList.slice(0,2);
		}
	},
	methods:{
		getProductList :function(){
			let that = this;
			this.$http.get('../static/data/product.json',{page:1}).then(res =>{
				console.log(res);
				if(res.status == 200){
					that.productList = res.data;
				}
			})
		},
		changeType:function(type){
			this.currentType = type;

		}
	}
}

</script>