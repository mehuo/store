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
	.extra{
		margin-left: 125px;
		margin-top: 12px;
	}
	.price{
		/*span{
			width: 40px;
			text-align: center;
			display: inline-block;
			line-height: 32px;
			height: 34px;
			background: #cdcdcd;
		}
		input{
			width: 100px;
		}*/
	}
	.key_words{
		.item{
			margin-right: 12px;
			height: 32px;
		    display: inline-block;
		    background: #e5e5e5;
		    line-height: 32px;
		    padding: 0 12px;
		    border-radius: 4px;
		    border: solid 1px #cdcdcd;
			span{
				&:last-child{
					margin-left:4px;
					color: #f95759;
				}
			}
		}
	}
	.images{
		.item{
			width: 100px;
			height:100px;
			float: left;
			margin-right: 12px;
			position: relative;
			img{
				width: 100%;
			}
			.del{
				position: absolute;
				right: 0;
				top: 0;
				color: #f95759;
			}
		}
	}
	.fwb{
		display:inline-block;
		vertical-align:text-top;
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
			<label for="">名称:</label>
			<input type="text" v-model="prodInfo.name">
		</div>
		<div class="form-group">
			<label for="">关键字:</label>
			<input placeholder="可以设置多个关键字，回车添加" type="text" v-model="key_words" @keyup.enter="addItem('key_words')">
			<div class="extra key_words">
				<span class="item" v-for="(item,index) in prodInfo.key_words">
					<span>{{item}}</span><span @click="delItem('key_words',index)">删除</span>
				</span>
			</div>
		</div>
		<div class="form-group price">
			<label for="">价格:</label>
			<!-- <span @click="">-</span><input type="text"><span>+</span> -->
			<input type="text">
		</div>
		<div class="form-group">
			<label for="">商品尺寸:</label>
			<input placeholder="回车添加" type="text" v-model="size_detail" @keyup.enter="addItem('size_detail')">
			<div class="extra key_words">
				<span class="item" v-for="(item,index) in prodInfo.size_detail">
					<span>{{item.text}}</span><span @click="delItem('size_detail',index)">删除</span>
				</span>
			</div>
		</div>
		<div class="form-group">
			<label for="">商品种类:</label>
			<input placeholder="回车添加" type="text" v-model="type_detail" @keyup.enter="addItem('type_detail')">
			<div class="extra key_words">
				<span class="item" v-for="(item,index) in prodInfo.type_detail">
					<span>{{item.text}}</span><span @click="delItem('type_detail',index)">删除</span>
				</span>
			</div>
		</div>
		<div class="form-group">
			<label for="">图片:</label>
			<input type="text" placeholder="请输入图片地址" @keyup.enter="addItem('images')">
			<div class="extra images clearfix">
				<div class="item" v-for="(item,index) in prodInfo.images">
					<img :src="item" alt=""/>
					<span class="del" @click="delItem('images',index)">删除</span>
				</div>
			</div>
		</div>
		<div class="form-group">
			<label for="">附加商品:</label>
		</div>
		<div class="form-group">
			<label for="">商品详情:</label>
			<div class="fwb">
				<script id="container" type="text/plain" style="width:500px;height:300px;"></script>
			</div>
		</div>
		<button @click="saveProduct()">保存</button>
	</div>
</template>

<script>
import '../../../static/js/ueditor/ueditor.config.js'
import '../../../static/js/ueditor/ueditor.all.min.js'
import '../../../static/js/ueditor/lang/zh-cn/zh-cn.js'
import '../../../static/js/ueditor/ueditor.parse.min.js'
import axios from 'axios';
import qs from 'qs';

export default{
	data(){
		return {
			prodInfo : {
				name:'Mind Bridge百家好夏季女装 吊带连衣裙 碎花裙女吊带裙 MROP323A',
				key_words:[
					"裙子","仙女"
				],
				price:10,
				size_detail:[
					{"text" : "S"},
					{"text" : "M"},
					{"text" : "L"},
					{"text" : "XL"}
				],
				type_detail : [
					{"text" : "白色"},
					{"text" : "黑色"},
					{"text" : "藏青色"}
				],
				images : [
					"https://img.alicdn.com/imgextra/i3/3357589328/TB2jTuhX6ZnyKJjSZFxXXabIpXa_!!3357589328.jpg_430x430q90.jpg",
					"https://img.alicdn.com/imgextra/i1/3357589328/TB2B_bFjyCYBuNkSnaVXXcMsVXa_!!3357589328.jpg_430x430q90.jpg",
					"https://img.alicdn.com/imgextra/i2/3357589328/TB2lhY0jwKTBuNkSne1XXaJoXXa_!!3357589328.jpg_430x430q90.jpg",
					"https://img.alicdn.com/imgextra/i4/3357589328/TB2zlEBfQZmBKNjSZPiXXXFNVXa_!!3357589328.jpg_430x430q90.jpg"
				],
				content : ""
			},
			key_words : '',
			images : '',
			size_detail: '',
			type_detail :'',
			category : [
				{name:'字符串',type:1},
				{name:'数字',type:2},
				{name:'长文本',type:3},
				{name:'富文本',type:4}
			],
			array : [],
			content : '',
			instance : null
		}
	},
	mounted() {
		this.initEditor();
	},
	methods : {
		initEditor () {
            //dom元素已经挂载上去了
            this.$nextTick(() => {
                this.instance = UE.getEditor('container', this.ueditorConfig);
                // 绑定事件，当 UEditor 初始化完成后，将编辑器实例通过自定义的 ready 事件交出去
                this.instance.addListener('ready', () => {
                    this.$emit('ready', this.instance);
                });
            });
        },
        getContet : function(){
        	let content = this.instance.getContent();
        	content = content.replace(/\"/g,'\'')
        	this.content = content;
        },
        addItem : function(type){
        	if(type == 'key_words'){
        		this.prodInfo.key_words.push(this.key_words);
        		this.key_words = '';
        	}else if(type == 'images'){
        		this.prodInfo.images.push(this.images);
        		this.images = '';
        	}else if(type == 'size_detail'){
        		let item = {
        			text : this.size_detail
        		}
        		this.prodInfo.size_detail.push(item);
        		this.size_detail = '';
        	}else if(type == 'type_detail'){
        		let item = {
        			text : this.type_detail
        		}
        		this.prodInfo.type_detail.push(item);
        		this.type_detail = '';
        	}
        },
        delItem : function(type,index){
        	if(type == 'key_words'){
        		this.prodInfo.key_words.splice(index,1);
        	}else if(type=='images'){
        		this.prodInfo.images.splice(index,1);
        	}else if(type == 'size_detail'){
        		this.prodInfo.size_detail.splice(index,1);
        	}else if(type == 'type_detail'){
        		this.prodInfo.type_detail.splice(index,1);
        	}
        },
        saveProduct : function(){
        	console.log(this.prodInfo);
        	let params = Object.assign({}, this.prodInfo);
        	params.key_words = JSON.stringify(params.key_words);
        	params.size_detail = JSON.stringify(params.size_detail);
        	params.type_detail = JSON.stringify(params.type_detail);
        	params.images = JSON.stringify(params.images);
        	axios.post('http://localhost:8888/product/index/add',qs.stringify(params)).then(function (response) {
				console.log(response);
			}).catch(function (error) {
				console.log(error);
			});
        	
        }
	}
}
</script>