<style scoped>
.shopcart{
	border: solid 1px #cdcdcd;
    padding: 10px;
    box-shadow: 0px 0px 12px #cdcdcd;
    margin-bottom: 40px
}
.shopcart .title-line{
	position: relative;
	width: 100%;
	height: 1px;
	background: #cdcdcd;
	margin:40px 0;
}
.shopcart .title-line .title{
	position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    top: 100%;
    background: #fff;
    padding: 0 20px;
}

.tablefix{
	width: 100%;
	text-align: center;
}
.tablefix thead{
	background: #cdcdcd;
}
.tablefix thead tr{
	height:40px;
}
.tablefix tbody td{
	padding : 30px 0;
}
.cartList{

}
.cartList .isOn{
	vertical-align: top;
}
.cartList .image{
	width:100px;
	height:100px;
}
.cartList .productinfo{
	text-align: left;
	vertical-align: top;
}
.cartList .part{
	margin-top: 12px;
}
.cartList .part .give{
	display: inline-block;
	vertical-align: top;
}
.cartList .part .partlist{
	display: inline-block;
	color: #757575;
}
.cartList .quentity a{
	text-decoration: none;
    display: inline-block;
    background: #cdcdcd;
    height: 22px;
    line-height: 22px;
    padding: 0 4px;
    margin: 0;
}
.cartList .quentity input{
	width: 50px;
    padding: 0;
    margin: 0;
    height: 20px;
}
.shopcart .money{
	color: #f40
}
.shopcart .result{
	height: 40px;
	line-height: 40px;
}
.shopcart .settlement{
    width: 100px;
    height: 40px;
    background: #f40;
    color: #fff;
    text-align: center;
    display: inline-block;
    line-height: 40px;
}
.shopcart .total{
	margin-right: 40px;
}
</style>

<template>
  <div class="shopcart">
    <div class="title-line"><div class="title">购物车</div></div>
  	<table class="tablefix cartList">
  		<thead>
  			<tr>
  				<td colspan="2">商品信息</td>
  				<td>商品金额</td>
  				<td>商品数量</td>
  				<td>总金额</td>
  				<td>编辑</td>
  			</tr>
  		</thead>
  		<tbody>
  			<tr v-if="cartList.length>0" v-for="(item,index) in cartList">
  				<td>
  					<input class="isOn" type="checkbox" v-model="item.check" v-on:click="selectThis(item)">
  					<img class="image" :src="item.images[0]" alt="">
  				</td>
  				<td class="productinfo">
					<div class="name">{{item.name}}</div>
					<div class="part" v-if="item.part && item.part.length>0">
						<div class="give">赠送：</div>
						<div class="partlist">
							<div v-for="i in item.part">{{i.partName}}</div>
						</div>
					</div>
					
  				</td>
  				<td class="money">{{item.price || 0 | money}}</td>
  				<td class="quentity">
  					<a href="javascript:void(0);" @click="changeQuentity(item,-1)">-</a>
  					<input type="text" v-model="item.quentity">
  					<a href="javascript:void(0);" @click="changeQuentity(item,1)">+</a>
  				</td>
  				<td class="money">{{item.price * item.quentity || 0  | formatmoney }}</td>
  				<td @click="deleteThis(item)">删除</td>

  			</tr>
  		</tbody>
  	</table>	
  	<div class="result">
  		<input type="checkbox" v-model="all" @click="selectAll();">全选
  		<span class="settlement fr"><router-link to="/address">结算</router-link></span>
  		<span class="total money fr">总金额 : {{moneyTotal || 0 | money}} </span>

  	</div>
  </div>
</template>

<script>
export default {
  name: 'ShopCart',
  data () {
    return {
      cartList:[],
      moneyTotal : 0,
      all : false,
      product_id : "",
      product_size: "",
      product_color : ""
    }
  },
  watch:{
	  cartList : {
      handler: function (val, oldVal) { 
      	this.moneyTotal = 0;
      	let flag = true;
      	for (var i = 0; i < val.length; i++) {
      		if(val[i].check){
      			this.moneyTotal += val[i].quentity * val[i].price;
      		}else{
      			flag = false;
      		}
      	}
      	this.moneyTotal = this.moneyTotal.toFixed(2);
      	if(flag){
      		this.all = true;
      	}else{
      		this.all = false;
      	}
      },
      deep: true
    },
  },
  filters:{
  	formatmoney:function(value){
  		if(typeof value == 'string'){
  			value = Number(value);
  		}
  		return "¥" + value.toFixed(2);
  	}
  },
  mounted : function(){
    console.log('-----')
    this.$nextTick(function(){
      this.product_id = this.$route.params.id;
      this.select_size = this.$route.params.size;
      this.select_color = this.$route.params.color;

      this.getCartList()      
      this.getProductInfo(this.product_id);
    })
  },
  methods:{
    getProductInfo : function(id){
      let that = this;
      this.$http.get('../static/data/product/'+id+'.json').then(res =>{
        if(res.status == 200){
          this.productInfo = res.data;
          let prodInfo = this.productInfo;
          delete prodInfo.content;
          let existProduct = null;
          if(this.cartList.length>0){
            existProduct = this.cartList.filter(function(value){
              return value.id == id
            })
          }
          if(existProduct.length == 0){
            prodInfo.quentity = 1;
            this.cartList.push(prodInfo);
          }else{
            prodInfo.quentity = existProduct.quentity + 1;
            this.cartList.push(prodInfo);
          }
          window.localStorage.setItem('cartList',JSON.stringify(this.cartList));
        }
      })
    },
    getCartList:function(){
    	let cartList = JSON.parse(window.localStorage.getItem('cartList'));
      if(cartList && cartList.length>0){
        this.cartList = cartList;
      }
    },
    changeQuentity:function(product,way){
    	if(way > 0){
    		product.quentity++;
    	}else{
    		product.quentity--;
    		if(product.quentity < 1){
    			product.quentity = 1;
    		}
    	}
    },
    selectThis:function(product){
    	if(typeof product.check == 'undefined'){
    		this.$set(product,'check',true);
    	}else{
    		product.check = !product.check;
    	}
    },
    selectAll :function(){
    	let flag = false;
    	if(!this.all){
    		flag = true;
    	}else{
    		flag = false;
    	}
    	var that = this;
    	this.cartList.forEach(function(value,key){
			if(typeof value.check == 'undefined'){
	    		that.$set(value,'check',flag);
	    	}
			value.check = flag;
		})
    	

    },
    deleteThis:function(product,index){
    	var index = this.cartList.indexOf(product);
    	if(confirm('确认删除这个商品吗？')){
    		this.cartList.splice(index,1);
    	}
    }
  }
}
</script>



