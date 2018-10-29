<style scoped lang='less'>
@border-color : #e5e5e5;
.shopcart{
	border: solid 1px @border-color;
  padding: 10px;
  box-shadow: 0px 0px 12px @border-color;
  margin-bottom: 40px;
  .title-line{
    position: relative;
    width: 100%;
    height: 1px;
    background: @border-color;
    margin:40px 0;
    .title{
      position: absolute;
      left: 50%;
      transform: translate(-50%,-50%);
      top: 100%;
      background: #fff;
      padding: 0 20px;
    }
  }
}
.tablefix{
	width: 100%;
	text-align: center;
  thead{
    background: @border-color;
    tr{
      height:40px;
    }
  }
  tbody{
    tr{
      &:last-child{
        border-bottom:solid 1px @border-color;
      };
    }
    td{
      padding : 30px 0;
    }
  }
}
.cartList{
  .isOn{
    vertical-align: top;
  }
  .image{
    width:80px;
    height:80px;
  }
  .name{
    margin-left: 12px;
  }
  .productinfo{
    text-align: left;
    vertical-align: top;
  }
  .part{
    margin-top: 12px;
    .give{
      display: inline-block;
      vertical-align: top;
    }
    .partlist{
      display: inline-block;
      color: #757575;
    }
  }
  .quantity{
    a{
      text-decoration: none;
        display: inline-block;
        background: @border-color;
        height: 30px;
        line-height: 30px;
        padding: 0 8px;
    }
    input{
      width: 50px;
      padding: 0;
      margin: 0;
      height: 32px;
      text-align: center;
    }
  }
  .money{color: #f40}
}

.cart_result{
  height: 40px;
  line-height: 40px;
  margin-top: 10px;
  .settlement{
    width: 100px;
    height: 40px;
    background: #f40;
    text-align: center;
    display: inline-block;
    line-height: 40px;
    a{
      color: #fff;
      text-decoration: none;
    }
  }
  .total{
    margin-right: 40px;
  }
}


</style>

<template>
  <div class="shopcart">
    <div class="title-line"><div class="title">购物车</div></div>
  	<table class="tablefix cartList">
  		<thead>
  			<tr>
          <td width="80px;">操作</td>
          <td width="80px;"></td>
          <td>商品信息</td>
  				<td>商品分类</td>
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
  				</td>
          <td>
            <img class="image fl" :src="item.images[0]" alt="">
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
          <td>
            <div class="name">{{item.select_type}}{{item.select_size}}</div>
          </td>
  				<td class="money">{{item.price || 0 | money}}</td>
  				<td class="quantity">
  					<a href="javascript:void(0);" @click="changeQuantity(item,-1)">-</a>
  					<input type="text" v-model="item.quantity">
  					<a href="javascript:void(0);" @click="changeQuantity(item,1)">+</a>
  				</td>
  				<td class="money">{{item.price * item.quantity || 0  | formatmoney }}</td>
  				<td @click="deleteThis(item)">删除</td>

  			</tr>
  		</tbody>
  	</table>	
  	<div class="cart_result">
  		<input type="checkbox" v-model="all" @click="selectAll();">全选
  		<span class="settlement fr" @click="submitOrders">
        <a>结算</a>
      </span>
  		<span class="total money fr">总金额 : {{moneyTotal || 0 | money}} </span>

  	</div>
  </div>
</template>

<script>

import axios from 'axios';
import qs from 'qs';
import inputSearch from '@/components/inputSearch';
import config from '@/config';
export default {
  name: 'ShopCart',
  data () {
    return {
      cartList:[],
      moneyTotal : 0,
      all : false,
      product_id : "",
      product_size: "",
      product_color : "",
      userInfo : null
    }
  },
  watch:{
	  cartList : {
      handler: function (val, oldVal) { 
      	this.moneyTotal = 0;
      	let flag = true;
      	for (var i = 0; i < val.length; i++) {
      		if(val[i].check){
      			this.moneyTotal += val[i].quantity * val[i].price;
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
  created : function(){
    this.userInfo = this.$store.state.userInfo;
  },
  mounted : function(){
    this.$nextTick(function(){
      this.getCartList();    
    })
  },
  methods:{
    getCartList:function(){
      axios.post(config.baseUrl + '/product/getCart',qs.stringify({user_id : this.userInfo.id})).then(res =>{
        if(res.data.status == 0){
          this.cartList = res.data.data;
          this.cartList.forEach(function(value,key){
            value.images = JSON.parse(value.images);
          })
          console.log(this.cartList);
        }
      })
    },
    changeQuantity:function(product,way){
    	if(way > 0){
    		product.quantity++;
    	}else{
    		product.quantity--;
    		if(product.quantity < 1){
    			product.quantity = 1;
    		}
    	}
      let params = {
        item_id : product.id,
        quantity : product.quantity
      }
      //改变数量后更新数据库信息
      axios.post(config.baseUrl + '/product/editToCart',qs.stringify(params)).then(res=>{
        console.log(res);
        if(res.data.status == 0){

        }
      })
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
    deleteThis:function(product){
    	if(confirm('确认删除这个商品吗？')){
    		axios.post(config.baseUrl + '/product/delCart',qs.stringify({user_id : this.userInfo.id,id : product.id})).then(res=>{
          console.log(res);
        }).then(()=>{
          this.getCartList();
        })
    	}
    },
    submitOrders:function(){
      let that = this;
      let products = [];
      let product_cart_ids = [];
      this.cartList.forEach(function(value,key){
        if (value.check) {
          products.push(value);
        }
      })
      this.$store.commit('commitOrder',products);
      this.$router.push({path : '/order'})
    }
  }
}
</script>



