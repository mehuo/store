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
			<div class="steps">
				<div class="item" v-for="(item,index) in [1,2,3,4]" :class="{ active : index < curStep}" @click="curStep = item">
					<div class="circle">{{item}}</div>
					<div class="tt" v-if="index == 0">确认商品</div>
					<div class="tt" v-else-if="index == 1">地址确认</div>
					<div class="tt" v-else-if="index == 2">支付</div>
					<div class="tt" v-else>完成</div>
				</div>
			</div>
			<div class="cartList">
				<div class="title-line"><div class="title">确认商品</div></div>
				<table class="tablefix">
			  		<thead>
			  			<tr>
			          <td width="80px;"></td>
			          <td>商品信息</td>
			  				<td>商品分类</td>
			  				<td>商品金额</td>
			  				<td>商品数量</td>
			  				<td>总金额</td>
			  			</tr>
			  		</thead>
			  		<tbody>
			  			<tr v-if="order_products.length>0" v-for="(item,index) in order_products">
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
			  					{{item.quantity}}
			  				</td>
			  				<td class="money">{{item.price * item.quantity || 0  | money }}</td>
			  			</tr>
			  		</tbody>
			  	</table>	
			  	<div class="totalPrice">
			  		总价 : <span>{{totalPrice || 0 | money}}</span>
			  	</div>
			</div>
			<div class="title-line"><div class="title">配送地址</div></div>
			<div class="addressList clearfix">
				<div class="item" v-for="(item,index) in filterAddressList" :class="{active : currentIndex == index}" @click="currentIndex = index">
					<div class="name">{{item.name}}</div>
					<div class="path">{{item.address}}</div>
					<div class="tel">{{item.phone}}</div>
					<div class="oper">
						<span class="isdefault" v-if="item.is_default == 1">默认地址</span>
						<span class="setdefault" v-else @click="setDefault(item)">设为默认</span>
						<span class="delete" @click="deleteAddress(item)">删除</span>
						<span class="edit" @click="editAddress(item)">编辑</span>
					</div>
				</div>
				<!-- @click="addAddress" -->
				<div class="item addAddress" @click="openAddAddress">添加新地址</div>
			</div>
			<div class="more" @click="loadMore(addressIsOpen)">
				<span v-if="!addressIsOpen">点击查看更多</span>
				<span v-else>点击收起</span>
			</div>


			<div class="title-line"><div class="title">配送方式</div></div>
			<div class="sendway">
				<div class="item"  :class="{active : currentSendWay == 1}" @click="currentSendWay = 1">
					<div>标准配送</div>
					<div>Free</div>
				</div>
				<div class="item" :class="{active : currentSendWay == 2}" @click="currentSendWay = 2">
					<div>高级配送</div>
					<div>¥180</div>			
				</div>
			</div>

			<div class="commit_order" @click="commitOrder">提交订单</div>
		</div>


		<!-- 弹出框 BEGIN -->
	    <div class="modal fade" tabindex="-1" role="dialog" id="myModal">
	      <div class="modal-dialog modal-md" role="document">
	        <div class="modal-content">
	          <div class="modal-header">
	            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	            <h4 class="modal-title">添加地址</h4>
	          </div>
	          <div class="modal-body">
	            <el-form ref="form" :model="addressInfo" label-width="120px" label-position="left">
	              <el-form-item label="收货人姓名" prop="name">
	                <el-input v-model="addressInfo.name"></el-input>
	              </el-form-item>
	              <el-form-item label="收货人手机号" prop="phone">
	                <el-input v-model="addressInfo.phone" auto-complete="off"></el-input>
	              </el-form-item>
	              <el-form-item label="收获地址" prop="address">
	                <el-input v-model="addressInfo.address" auto-complete="off"></el-input>
	              </el-form-item>
	            </el-form>
	          </div>
	          <div class="modal-footer">
	            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	            <button type="button" class="btn btn-primary" @click="addAddress">保存</button>
	          </div>
	        </div>
	      </div>
	    </div>
    	<!-- 弹出框 END -->
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
			curStep : 1,
			limitNum : 3,
			addressIsOpen : false,
			addressList : [],
			currentIndex : 0,
			currentSendWay : 1
		}
	},
	mounted(){
		this.$nextTick(function(){
			this.getAddressList();
		})
	},
	watch:{

	},
	computed:{
		...mapState([
			'userInfo',
			'order_products'
		]),
		...mapGetters([
	      'order_products'
	    ]),
		filterAddressList :function(){
			return this.addressList.slice(0, this.limitNum);
		},
		totalPrice : function(){
			let totalPrice = 0;
			if(this.order_products){
				this.order_products.forEach(function(value,key){
					totalPrice = totalPrice + value.price * value.quantity;
				})
			}
			return totalPrice;
		}
		
	},
	methods:{
		openAddAddress :function(){
			$('#myModal').modal('show');
			this.addressInfo = {
				name : '',
				phone : '',
				address : '',
			}
		},
		addAddress :function(){
			let that = this;
			let params = JSON.parse(JSON.stringify(this.addressInfo));
			params.user_id = this.userInfo.id;
			if(params.id){
				axios.post(config.baseUrl + '/address/edit',qs.stringify(params)).then(res=>{
					$('#myModal').modal('hide');
					that.getAddressList();
				})
			}else{
				axios.post(config.baseUrl + '/address/add',qs.stringify(params)).then(res=>{
					$('#myModal').modal('hide');
					that.getAddressList();
				})
			}
			
		},
		editAddress :function(address){
			let that = this;
			this.addressInfo = address;
			$('#myModal').modal('show');
		},
		deleteAddress : function(address){
			let that = this;
			if(confirm('确认要删除这个地址吗？')){
				console.log(address.id);
				axios.post(config.baseUrl + '/address/delete',qs.stringify({user_id : this.userInfo.id , id : address.id})).then(res=>{
					that.getAddressList();
				})
			}
		},
		getAddressList:function(){
			var that = this;
			// this.$http.get('../static/data/address.json').then(res =>{
			// 	console.log(res.data)
			// 	if(res.status == 200){
			// 		that.addressList = res.data;
			// 	}
			// })
			axios.post(config.baseUrl + '/address/list',qs.stringify({user_id : this.userInfo.id})).then(res=>{
				console.log(res);
				if(res.data.status == 0){
					that.addressList = res.data.data;
					console.log(that.addressList);
					that.limitNum = that.addressList.length;
				}
			})
		},
		loadMore : function(flag){
			this.addressIsOpen = !flag;
			if(this.addressIsOpen){
				this.limitNum = this.addressList.length;
			}else{
				this.limitNum = 3;
			}
		},
		setDefault:function(address){
			let that = this;
			axios.post(config.baseUrl + '/address/setDefault',qs.stringify({user_id : this.userInfo.id, id : address.id})).then(res=>{
				console.log(res);
				if(res.data.status == 0){
					that.getAddressList();
				}
			})
		},
		commitOrder : function(){
			let that = this;
			let params = {
				user_id : this.userInfo.id,
				productList : this.order_products,
				totalPrice : this.totalPrice,
				status : 1
			}
			console.log(params)
			// this.$store.commit('commitOrder',[]);
			axios.post(config.baseUrl + '/order/add',qs.stringify(params)).then(res=>{
				console.log(res);
			})
		}
	}


}
	
</script>