<style scoped lang="less">
.addProduct{
	width: 700px;
	margin: 0 auto;
	.form-group{
		margin:20px 0;
	}
	label{
		width:100px;
		display:inline-block;
		text-align:right;
		margin-right:20px;
	}
	input , select{
		height: 32px;
		line-height: 32px;
		width:500px;
		padding: 0 8px;
	}
	.address{
		select{
			width: 170px;
		}
	}
}
button{
	height: 40px;
    padding: 0 40px;
    border-radius: 3px;
    background: #f40;
    border: none;
    color: #fff;
    font-size: 16px;
    margin-left: 50%;
    transform: translateX(-50%);
}

	
</style>

<template>
	<div class="addProduct">
		<div class="form-group">
			<label for="">商铺名称:</label>
			<input type="text" v-model="storeInfo.name">
		</div>
		<div class="form-group address">
			<label for="">商铺地址:</label>
			<select @change="changeAddress('province')" v-model="current_province">
				<option v-for="item in province" :value="item">{{item.name}}</option>
			</select>
			<select @change="changeAddress('city')" v-model="current_city">
				<option v-for="item in city" :value="item">{{item.name}}</option>
			</select>
			<select @change="changeAddress('area')" v-model="current_area">
				<option v-for="item in area" :value="item">{{item.name}}</option>
			</select>
		</div>
		<button @click="saveToDB()">保存</button>
	</div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
import config from '@/config';

export default{
	data(){
		return {
			province:[],
			city:[],
			area:[],
			current_province : null,
			current_city : null,
			current_area : null,
			storeInfo : {
				name : '',
				address : ''
			}
		}
	},
	mounted() {
		this.initProvince();
		let query = this.$route.query;
		if(query.tag){
			this.getStoreInfo(query.tag);
		}
	},
	created(){
		
	},
	methods : {
		getStoreInfo:function(id){
			//获取当前商铺的信息
			axios.post(config.baseUrl + '/store/getThisStore',qs.stringify({id:id})).then((res)=>{
				if(res.data.status == 0){
					let result = res.data.data;
					this.storeInfo = result;
					let address_arr = result.address.split(' ');
					let province = this.province.filter(function(o){
						return o.name == address_arr[0]
					})
					//重置地址
					console.log(province)
					if(province.length>0){
						this.current_province = province[0];
						this.getCity('change',address_arr);
					}
				}
			}).catch((res)=>{
				console.log(res);
			})
		},
		initProvince:function(){
			//获取省市县内容
			axios.post(config.baseUrl + '/util/getArea',qs.stringify({type:'province'})).then((res)=>{
				this.province = res.data.data;
				this.current_province = this.province[0];
				this.getCity('init');
			}).catch((res)=>{
				console.log(res);
			})
		},
		getCity : function(type,address){
			//获取省市县内容
			axios.post(config.baseUrl + '/util/getArea',qs.stringify({type:'city',code:this.current_province.code})).then((res)=>{
				this.city = res.data.data;
				this.current_city = this.city[0];
				if(address){
					let citys = this.city.filter(function(o){
						return o.name == address[1]
					})
					if(citys.length>0){
						this.current_city = citys[0];
						this.getArea('change',address);
					}
				}else{
					this.getArea('init');
				}
			}).catch((res)=>{
				console.log(res);
			})
		},
		getArea : function(type,address){
			//获取省市县内容
			axios.post(config.baseUrl + '/util/getArea',qs.stringify({type:'area',code:this.current_city.code})).then((res)=>{
				this.area = res.data.data;
				this.current_area = this.area[0];
				if(address){
					let areas = this.area.filter(function(o){
						return o.name == address[2]
					})
					if(areas.length>0){
						this.current_area = areas[0];
					}
				}
			}).catch((res)=>{
				console.log(res);
			})
		},
		changeAddress : function(type){
			if(type == 'province'){
				this.getCity('change')
			}else if(type == 'city'){
				this.getArea('change')
			}
		},
        saveToDB : function(){
        	let that = this;
        	this.storeInfo.address = this.current_province.name + ' ' + this.current_city.name+ ' ' + this.current_area.name;
			if(this.storeInfo.id){
				//编辑
				axios.post(config.baseUrl + '/store/edit',qs.stringify(this.storeInfo)).then(function (response) {
					console.log(response);
					if(response.data.status == 0){
						that.$router.push({path:'/store/list'});
					}
				}).catch(function (error) {
					console.log(error);
				});
			}else{
				//保存
				axios.post(config.baseUrl + '/store/add',qs.stringify(this.storeInfo)).then(function (response) {
					console.log(response);
					if(response.data.status == 0){
						that.$router.push({path:'/store/list'});
					}
				}).catch(function (error) {
					console.log(error);
				});
			}
        	
        }
	}
}
</script>