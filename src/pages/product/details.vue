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
    margin-bottom: 20px
}
.productInfo .info .price{
	font-size: 24px;
    color: #FF0036;
    font-weight: bold;
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
					<img :src="productInfo.images[0]" alt="">
				</div>
				<div class="smallImg" v-for="img in productInfo.images">
					<img :src="img" alt="">
				</div>
			</div>
			<div class="right">
				<div class="tt">{{productInfo.name}}</div>
				<div class="activity">
					<div class="price">{{productInfo.price | money}}</div>
				</div>
				<div class="send">
					<span>运费：</span> <span>{{productInfo.shop_address}} 至 北京</span>
					<span>快递：</span><span>0.00元</span>
				</div>
				<div class="saler">
					<span>月销量 ：</span><span class="obcolor">{{productInfo.payers}}</span>
					<span>累计评价：</span><span class="obcolor">50</span>
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
					<div v-html="productInfo.content"></div>
				</div>
				<div class="evaluate" v-show="detailTab==2">
					ddede
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default{
	data() {
		return {
			product_id : '',
			detailTab : 1,
			productInfo : {}
		}
	},
	mounted(){
		this.product_id = this.$route.params.id;
		this.getProductInfo(this.product_id);
	},
	methods : {
		getProductInfo : function(id){
			let that = this;
			this.$http.get('../static/data/product/'+id+'.json').then(res =>{
				if(res.status == 200){
					this.productInfo = res.data;
				}
			})
		},
		changeDetailTab : function(tab){
			this.detailTab = tab;
		}
	}
}
	
</script>