<style lang="less" scoped> 
@border-color : #e5e5e5;

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

.pagebd{
	border: solid 1px #cdcdcd;
    padding: 10px;
    box-shadow: 0px 0px 12px #cdcdcd;
    margin-bottom: 40px;
    .title-line{
		position: relative;
		width: 100%;
		height: 1px;
		background: #cdcdcd;
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
	  .totalPrice{
	  	text-align: right;
	  	margin: 10px 0;
	  	span{
	  		color: #f40;
	  		font-size: 16px;
	  	}
	  }
	}
	.detailbd{
		margin-top: 20px;
		.tt{
			font-weight: 600;
			margin-bottom: 10px;
		}
	}
	.commit_order{
		margin: 40px 0;
		width: 100px;
	    height: 40px;
	    background: #f40;
	    text-align: center;
	    display: inline-block;
	    line-height: 40px;
	    color: #fff;
	    margin-left: 50%;
	    transform: translateX(-50%);
	}
}










</style>

<template>
	<div class="pagebd">
		<div class="detailbd">
			订单编号 : {{orderInfo.code}}
		</div>
		<div class="cartList detailbd">
			<div class="tt">商品信息</div>
			<table class="tablefix">
		  		<tbody>
		  			<tr v-if="products.length>0" v-for="(item,index) in products">
		  				<td class="productinfo">
		            		<div class="name">{{item.product_name}}</div>
		  					<div class="part" v-if="item.part && item.part.length>0">
		  						<div class="give">赠送：</div>
		  						<div class="partlist">
		  							<div v-for="i in item.part">{{i.partName}}</div>
		  						</div>
		  					</div>
		  				</td>
		          		<td>
				            <div class="name">{{item.select_size}}{{item.select_type}}</div>
				        </td>
		  				<td class="money">{{item.product_price || 0 | money}}</td>
		  				<td class="quantity">
		  					{{item.product_quantity}}
		  				</td>
		  				<td class="money">{{item.product_price * item.product_quantity || 0  | money }}</td>
		  			</tr>
		  		</tbody>
		  	</table>	
		  	<div class="totalPrice">
		  		总价 : <span>{{totalPrice || 0 | money}}</span>
		  	</div>
		</div>
		
		<div class="detailbd">
			<div class="tt">地址信息</div>
			<div>{{addressInfo.address}}</div>
			<div>{{addressInfo.name}}</div>
			<div>{{addressInfo.phone}}</div>
		</div>

		<div class="detailbd">
			<div class="tt">配送信息</div>
			<div>{{deliveryInfo.type}}</div>
			<div>{{deliveryInfo.cost}}</div>
		</div>

		<div class="commit_order" >支付</div>
	</div>

	
</template>

<script>
import axios from 'axios';
import qs from 'qs';
import inputSearch from '@/components/inputSearch';
import config from '@/config';
import { mapGetters , mapState} from 'vuex'
export default{
	name: 'Address',
	data(){
		return{
			order_id : null,
			products : [],
			orderInfo : {
				code : ''
			}, //订单详情
			addressInfo : {
				address : '',
				name : '',
				phone : ''
			},
			deliveryInfo : {
				type : '',
				cost : ''
			},
		}
	},
	mounted(){
		this.order_id = this.$route.query.id;
		this.$nextTick(function(){
			this.getOrderInfo();
			this.getOrderProducts();
		})
	},
	watch:{

	},
	computed:{
		...mapState([
			'userInfo',
		]),
		...mapGetters([
	      'order_products'
	    ]),
		totalPrice : function(){
			let totalPrice = 0;
			if(this.products){
				this.products.forEach(function(value,key){
					totalPrice = totalPrice + value.product_price * value.product_quantity;
				})
			}
			return totalPrice;
		}
		
	},
	methods:{
		getOrderInfo : function(){
			let that = this;
			let params = {
				order_id : this.order_id,
				user_id : this.userInfo.id
			}
			axios.post(config.baseUrl + '/order/getInfo',qs.stringify(params)).then(res=>{
				that.orderInfo = res.data.data;
				console.log(that.orderInfo);
			}).then(res=>{
				axios.post(config.baseUrl + '/address/getAddressInfo',qs.stringify({id:that.orderInfo.address_id})).then(res=>{
					that.addressInfo = res.data.data;
				})
				axios.post(config.baseUrl + '/address/getDeliveryInfo',qs.stringify({id:that.orderInfo.delivery_id})).then(res=>{
					console.log(res);
					that.deliveryInfo = res.data.data;
				})
			})
		},
		getOrderProducts : function(){
			let that = this;
			let params = {
				order_id : this.order_id,
				user_id : this.userInfo.id
			}
			axios.post(config.baseUrl + '/order/getProducts',qs.stringify(params)).then(res=>{
				console.log(res);
				that.products = res.data.data;
				console.log(that.products);
			})
		},
		
	}


}
	
</script>