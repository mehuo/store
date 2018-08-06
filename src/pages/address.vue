<style>
.steps{
	width: 100%;
	margin:50px 0;
}
.steps .item{
	width: 25%;
	height:2px;
	position: relative;
	background: #cdcdcd;
	display: inline-block;
}

.steps .item .circle{
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
.steps .item .tt{
	text-align: center;
    font-size: 14px;
    margin-top: 16px;
    color: #757575;
}
.steps .item.active{
	background: #f40;
}
.steps .item.active .circle{
	background: #f40;
	color: #fff
}
.steps .item.active .tt{
	color: #f40
}



.address{
	border: solid 1px #cdcdcd;
    padding: 10px;
    box-shadow: 0px 0px 12px #cdcdcd;
    margin-bottom: 40px
}
.address .title-line{
	position: relative;
	width: 100%;
	height: 1px;
	background: #cdcdcd;
	margin:40px 0;
}
.address .title-line .title{
	position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    top: 100%;
    background: #fff;
    padding: 0 20px;
}
.addressList{

}
.addressList .more{
	text-align: center;
	height: 40px;
	margin-top: 20px;
}
.addressList .item{
	box-sizing: border-box;
    padding: 10px 16px;
    border: solid 1px #cdcdcd;
    margin: 20px 0;
    display: inline-block;
    font-size: 14px;
    height: 120px;
    width: calc(calc(100% - 36px) / 4);
    margin-right: 10px;
}
.addressList .item:nth-of-type(4n){
	margin-right: 0;
}
.addressList .item.active{
	border-color: #f40;
}
.addressList .item:hover{
	border-color: #f40;
}
.addressList .name{
	font-size: 20px;
	color: #000;
}
.addressList .tel{
	margin-top: 12px;
}
.addressList .isdefault{
	font-size: 12px;
	color: #f40;
}
.addressList .addAddress{
	line-height: 100px;
	text-align: center;
	vertical-align: top;
}
.addressList .addAddress:hover{
	border-color: #cdcdcd;
}

.sendway{
	text-align: center;
}
.sendway .item{
	width: 200px;
    display: inline-block;
    border: solid 1px #cdcdcd;
    margin: 0 10px;
    padding: 8px 0px;
}
.sendway .item.active{
	border-color: #f40;
}


</style>

<template>
	<div>
		
		<div class="address">
			<div class="steps">
				<div class="item" v-for="(item,index) in [1,2,3,4]" :class="{ active : index < curStep}" @click="curStep = item">
					<div class="circle">{{item}}</div>

					<div class="tt" v-if="index == 0">地址确认</div>
					<div class="tt" v-else-if="index == 1">查看订单</div>
					<div class="tt" v-else-if="index == 2">支付</div>
					<div class="tt" v-else>完成</div>
				</div>
			</div>

			<div class="title-line"><div class="title">配送地址</div></div>
			<div class="addressList">
				<div class="item" v-for="(item,index) in filterAddressList" :class="{active : currentIndex == index}" @click="currentIndex = index">
					<div class="name">{{item.userName}}</div>
					<div>{{item.streetName}}</div>
					<div class="tel">{{item.tel}}</div>
					<div>
						<span class="isdefault" v-if="item.isDefault">默认地址</span>
						<span v-else @click="setDefault(item)">设为默认</span>
					</div>
				</div>
				<div class="item addAddress" >添加新地址</div>
				<div class="more" @click="loadMore(addressIsOpen)">
					<span v-if="!addressIsOpen">点击查看更多</span>
					<span v-else>点击收起</span>
				</div>
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
		</div>
	</div>
</template>

<script>
export default{
	name: 'Address',
	data(){
		return{
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
		filterAddressList :function(){
			return this.addressList.slice(0, this.limitNum);
		}
	},
	methods:{
		getAddressList:function(){
			var that = this;
			this.$http.get('../static/data/address.json').then(res =>{
				console.log(res.data)
				if(res.status == 200){
					that.addressList = res.data;
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
			this.addressList.forEach(function(value,key){
				value.isDefault = 0;
			})
			address.isDefault = 1;

		}
	}


}
	
</script>