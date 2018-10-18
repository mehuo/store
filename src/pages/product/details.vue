<style>
img{
	width: 100%;
	height: 100%;
}
.obcolor{
	color: #FF0036;
}
.productInfo{
}
.productInfo .info{

}
.productInfo .info .left{
	float: left;
	width: 500px;
}
.productInfo .info .bigImg{
	border: solid 1px #e5e5e5;
}
.productInfo .info .smallImg{
	width: 90px;
	height: 90px;
	display: inline-block;
	margin-right: 4px;
	border:solid 1px #e5e5e5;
	margin-top: 12px;
}
.productInfo .info .right{
	float: right;
	width: calc(100% - 500px);
    text-align: left;
    padding: 10px 24px;
    box-sizing: border-box;
}
.productInfo .info .tt{
	font-size: 20px;
    color: #000;
}
.productInfo .info .activity{
	background: #e5e4e4;
	padding: 10px;
    margin: 20px 0;
}
.productInfo .info .price{
	font-size: 24px;
    color: #FF0036;
    font-weight: bold;
}
.productInfo .info .size{
	margin: 24px 0;
}
.productInfo .info .size .item{
	border: dashed 1px #cdcdcd;
    padding: 0 8px;
    min-width: 32px;
    margin-right: 8px;
    line-height: 32px;
    display: inline-block;
    text-align: center;
}
.productInfo .info .size .item.active{
	border: solid 2px #ff0036;
}

.productInfo .info .send{
	border:dashed 1px #e5e5e5;
	height: 32px;
	line-height: 32px;
}
.productInfo .info .saler{
	border:dashed 1px #e5e5e5;
	height: 32px;
	line-height: 32px;
}
.productInfo .btns{
	text-align: center;
	margin-top: 20px;
}
.productInfo .btns button{
	line-height: 40px;
    padding: 0 50px;
    border: none;
    text-align: center;
    margin-right: 20px;
    color: #fff;
}
.productInfo .btns .addCart{
	background: #ff0036
}
.productInfo .btns .shop{
	background: rgba(255,68,0);
}

.detail{
	margin-top: 40px;
}
.detail .menus{
	height: 60px;
    border-bottom: solid 1px #e5e5e5;
    line-height: 60px;
}
.detail .menus .item{
	width: 100px;
	display: inline-block;
	text-align: center;
}
.detail .menus .item.active{
	border-top: solid 2px #f40;
    border-left: solid 1px #cdcdcd;
    border-right: solid 1px #cdcdcd;
    border-bottom: solid 1px #fff;
    height: 59px;
}
.detail .cont{
	position: relative;
	padding: 20px 16px;

}
.detail .cont .detailInfo{

}


	
</style>

<template>
	<div class="productInfo">
		<div class="info clearfix">
			<div class="left">
				<div class="bigImg">
					<img :src="productInfo.big_image" alt="">
				</div>
				<div class="smallImg" v-for="img in productInfo.images" @click="productInfo.big_image = img">
					<img :src="img" alt="">
				</div>
			</div>
			<div class="right">
				<div class="tt">{{productInfo.name}}</div>
				<div class="activity">
					<div class="price">{{productInfo.price || 0 | money}}</div>
				</div>
				<div class="choose">
					<div class="size">
						<div class="item" v-for="item in productInfo.size_detail" :class="{'active':productInfo.select_size == item.text}" @click="selectSize(item)">{{item.text}}</div>
					</div>
					<div class="size">
						<div class="item" v-for="item in productInfo.type_detail" :class="{'active':productInfo.select_type == item.text}"  @click="selectColor(item)">{{item.text}}</div>
					</div>
				</div>
				<div class="send">
					<span>运费：</span> <span>{{productInfo.shop_address}} 至 北京</span>
					<span>快递：</span><span>0.00元</span>
				</div>
				<div class="saler">
					<span>月销量 ：</span><span class="obcolor">{{productInfo.payers}}</span>
					<span>累计评价：</span><span class="obcolor">50</span>
				</div>
				<div class="btns">
					<button class="addCart" @click="addToCart">加入购物车</button>
					<button class="shop">立即购买</button>	
				</div>
			</div>
		</div>
		<div class="detail">
			<div class="menus">
				<div class="item" :class="{'active' : detailTab==1}" @click="changeDetailTab(1)">商品详情</div>
				<div class="item" :class="{'active' : detailTab==2}" @click="changeDetailTab(2)">累计评价</div>
			</div>
			<div class="cont">
				<div class="detailInfo" v-show="detailTab==1">
					<div v-html="productInfo.detail"></div>
				</div>
				<div class="evaluate" v-show="detailTab==2">
					ddede
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
	data() {
		return {
			product_id : '',
			detailTab : 1,
			productInfo : {},
		}
	},
	mounted(){
		this.product_id = this.$route.query.id;
		this.$nextTick(function(){
			this.getProductInfo(this.product_id);
		})
	},
	methods : {
		getProductInfo : function(id){
			let that = this;
			let params = {
				id : id
			}
			axios.post(config.baseUrl+'/product/getThis',qs.stringify(params)).then(res=>{
				console.log(res)
				this.productInfo = res.data.data;
				this.productInfo.key_words = JSON.parse(this.productInfo.key_words);
				this.productInfo.size_detail = JSON.parse(this.productInfo.size_detail);
				this.productInfo.type_detail = JSON.parse(this.productInfo.type_detail);
				this.productInfo.images = JSON.parse(this.productInfo.images);
				this.$set(this.productInfo,'big_image',this.productInfo.images[0])
				if(this.productInfo.size_detail.length>0){
					this.$set(this.productInfo,'select_size',this.productInfo.size_detail[0].text);
				}
				if(this.productInfo.type_detail.length>0){
					this.$set(this.productInfo,'select_type',this.productInfo.type_detail[0].text);
				}
				console.log(this.productInfo)
			})
		},
		changeDetailTab : function(tab){
			this.detailTab = tab;
		},
		selectSize : function(item){
			this.productInfo.select_size = item.size;
		},
		selectColor : function(item){
			this.productInfo.select_type = item.color;
		},
		//添加购物车
		addToCart:function(){
			// this.$router.push({ name: 'ShopCart', params: { id : this.productInfo.id , size : this.productInfo.select_size ,color : this.productInfo.select_type }})
			let params = JSON.parse(JSON.stringify(this.productInfo));
			params.user_id = this.$store.state.userInfo.id; //设置用户ID
			params.images = JSON.stringify(params.images);
			params.quantity = 1;
			//获取改用户的购物车商品
			axios.post(config.baseUrl + '/product/getCart',qs.stringify({user_id : params.user_id})).then(res=>{
				console.log(res)
				if(res.data.status == 0){
					let cartList = res.data.data;
					if(cartList.length>0){
						cartList.forEach(function(value,key){
							if(params.id == value.product_id && params.select_size == value.select_size && params.select_type == value.select_type){
								params.quantity = value.quantity+1;
								params.item_id = value.id;
							}
						})
					}
				}
			}).then(function(){
				//添加商品到购物车
				if(params.quantity == 1){
					axios.post(config.baseUrl + '/product/addToCart',qs.stringify(params)).then(res=>{
						console.log(res);
					})
				}else{
					axios.post(config.baseUrl + '/product/editToCart',qs.stringify(params)).then(res=>{
						console.log(res);
					})
				}
				
			})
			

		}
	}
}
	
</script>