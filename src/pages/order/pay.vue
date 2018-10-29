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
.steps{
	width: 100%;
	margin:50px 0;
	.item{
		width: 25%;
		height:2px;
		position: relative;
		background: #cdcdcd;
		display: inline-block;
		.circle{
			width: 20px;
		    height: 20px;
		    background: #cdcdcd;
		    text-align: center;
		    line-height: 20px;
		    position: absolute;
		    border-radius: 50%;
		    top: -10px;
		    left: 50%;
		    transform: translateX(-50%);
		    z-index: 2;
		    font-size: 12px;
		}
		.tt{
			text-align: center;
		    font-size: 14px;
		    margin-top: 16px;
		    color: #757575;
		}
		&.active{
			background: #f40;
			.circle{
				background: #f40;
				color: #fff
			}
		}
	}
}


.address{
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
.addressList{
	.item{
		box-sizing: border-box;
	    padding: 10px 16px;
	    border: solid 1px #cdcdcd;
	    margin: 20px 0;
	    font-size: 14px;
	    height: 120px;
	    width: calc(calc(100% - 36px) / 4);
	    margin-right: 10px;
	    position: relative;
	    float: left;
	    top: 0;
	    &:nth-of-type(4n){
			margin-right: 0;
		}
		&.active{
			border-color: #f40;
		}
		&:hover{
			border-color: #f40;
		}
		.name{
			font-size: 20px;
			color: #000;
		}
		.path{font-size: 12px;}
		.tel{
			/*margin-top: 12px;*/
			position: absolute;
			bottom: 22px;
		}
		.oper{
			font-size: 12px;
			/*color: #409EFF;*/
		}
		.isdefault{
			color: #f40;
			position: absolute;
			bottom: 4px;
		}
		.setdefault{
			position: absolute;
			bottom: 4px;
			font-size: 12px;
		}
		.edit{
			position: absolute;
		    bottom: 4px;
		    right: 10px;
		}
		.delete{
			position: absolute;
		    bottom: 4px;
		    right: 40px;
		}
	}
	.addAddress{
		line-height: 100px;
		text-align: center;
		vertical-align: top;
		&:hover{
			border-color: #cdcdcd;
		}
	}
}
.more{
	text-align: center;
	height: 40px;
	margin-top: 20px;
}

.sendway{
	text-align: center;
	.item{
		width: 200px;
	    display: inline-block;
	    border: solid 1px #cdcdcd;
	    margin: 0 10px;
	    padding: 8px 0px;
	    &.active{
			border-color: #f40;
		}
	}
}




</style>

<template>
	<div>
		<div class="address">
			<div>商品信息</div>
			<div class="cartList">
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
			<div>地址信息</div>

		
			

			<div class="commit_order" >支付</div>
		</div>

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
			addressInfo : {
				name : '付亚男',
				phone : '18610942018',
				address : '北京市昌平区',
			},
			order_id : null,
			products : [],
			orderInfo : null, //订单详情
		}
	},
	mounted(){
		this.order_id = this.$route.query.id;
		this.$nextTick(function(){
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
			let params = {
				order_id : this.order_id,
				user_id : this.userInfo.id
			}
			axios.post(config.baseUrl + '/order/getInfo',qs.stringify(params)).then(res=>{
				that.orderInfo = res.data.data;
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