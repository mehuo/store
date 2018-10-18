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
	.plus{
		select{
			height: auto;
		}
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
		    background: #409eff;
		    line-height: 32px;
		    padding: 0 12px;
		    border-radius: 4px;
		    border: solid 1px #409eff;
		    color: #fff;
			span{
				&:last-child{
					margin-left:10px;
					color: #fff;
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
			border:solid 1px #e5e5e5;
			img{
				width: 100%;
			}
			.del{
				position: absolute;
				right: 0;
				top: -7px;
				color: #409eff;
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
		<div class="clearfix">
			<a class="btn-min sbtn-primary" @click="reBackList">返回列表</a>
		</div>
		<div class="form-group">
			<label for="">名称:</label>
			<input type="text" v-model="prodInfo.name">
		</div>
		<div class="form-group">
			<label for="">关键字:</label>
			<input placeholder="可以设置多个关键字，回车添加" type="text" v-model="key_words" @keyup.enter="addItem('key_words')">
			<div class="extra key_words">
				<span class="item" v-for="(item,index) in prodInfo.key_words">
					<span>{{item}}</span><span @click="delItem('key_words',index)">x</span>
				</span>
			</div>
		</div>
		<div class="form-group price">
			<label for="">价格:</label>
			<!-- <span @click="">-</span><input type="text"><span>+</span> -->
			<input type="text" v-model="prodInfo.price">
		</div>
		<div class="form-group">
			<label for="">商品尺寸:</label>
			<input placeholder="回车添加" type="text" v-model="size_detail" @keyup.enter="addItem('size_detail')">
			<div class="extra key_words">
				<span class="item" v-for="(item,index) in prodInfo.size_detail">
					<span>{{item.text}}</span><span @click="delItem('size_detail',index)">x</span>
				</span>
			</div>
		</div>
		<div class="form-group">
			<label for="">商品种类:</label>
			<input placeholder="回车添加" type="text" v-model="type_detail" @keyup.enter="addItem('type_detail')">
			<div class="extra key_words">
				<span class="item" v-for="(item,index) in prodInfo.type_detail">
					<span>{{item.text}}</span><span @click="delItem('type_detail',index)">x</span>
				</span>
			</div>
		</div>
		<div class="form-group">
			<label for="">图片:</label>
			<input type="text" placeholder="请输入图片地址" v-model="images" @keyup.enter="addItem('images')">
			<div class="extra images clearfix">
				<div class="item" v-for="(item,index) in prodInfo.images">
					<img :src="item" alt=""/>
					<span class="del" @click="delItem('images',index)">x</span>
				</div>
			</div>
		</div>
		<div class="form-group">
			<label for="">商品详情:</label>
			<div class="fwb">
				<script id="container" type="text/plain" style="width:500px;height:300px;"></script>
			</div>
		</div>
		<div class="form-group plus">
			<label for="">附加商品:</label>
			<select  multiple="multiple" v-model="prodInfo.part_ids">
				<option v-for="item in productList" :value="item.id">{{item.name}}</option>
			</select>
			<!-- <select-search color="#409EFF" radius="4px" width="500px" :list="productList"></select-search> -->
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
import config from '@/config';
import selectSearch from '@/components/selectSearch';


export default{
	components:{
		selectSearch
	},
	data(){
		return {
			prodInfo : {
				name:'',
				key_words:[
					// "牛仔短裙","高腰"
				],
				price:'',
				size_detail:[
					// {"text" : "S"},
					// {"text" : "M"},
					// {"text" : "L"},
				],
				type_detail : [
					// {"text" : "粉色"},
					// {"text" : "灰色"}
				],
				images : [
					// "https://g-search3.alicdn.com/img/bao/uploaded/i4/i2/2219860958/TB1iGMUcyMnBKNjSZFCXXX0KFXa_!!0-item_pic.jpg_460x460Q90.jpg_.webp"
				],
				part_ids : [], //附加id
				content : ""
			},
			key_words : '',
			images : '',
			size_detail: '',
			type_detail :'',
			instance : null,
			productList : null,
			keyword : ''
		}
	},
	created(){
		// window.location.reload();
	},
	mounted() {
		this.initEditor();
		let query = this.$route.query;
		if(query.tag){
			this.prodInfo.shop_id = query.tag;
		}
		if(query.row_id){
			this.getThis(query.row_id);
		}
		this.getProductList(); //获取该店铺下所有商品
	},
	destroyed() {
		UE.delEditor('container');
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
        	this.prodInfo.content = content;
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
        getThis(id){
        	let that = this;
        	axios.post(config.baseUrl + '/product/getThis',qs.stringify({id:id})).then((res)=>{
				if(res.data.status == 0){
					let result = res.data.data;
					that.prodInfo = result;
					that.prodInfo.key_words = JSON.parse(result.key_words);
					that.prodInfo.images = JSON.parse(result.images);
					that.prodInfo.type_detail = JSON.parse(result.type_detail);
					that.prodInfo.size_detail = JSON.parse(result.size_detail);
					if(result.part_ids){
						that.prodInfo.part_ids = JSON.parse(result.part_ids);
					}else{
						that.prodInfo.part_ids = [];
					}
					that.instance.ready(function(){
        				that.instance.setContent(result.detail,false);
					})

				}else{
					alert(res.data.statusinfo);
				}
			}).catch((res)=>{
				console.log(res);
			})
        },
        getProductList(){
			let that = this;
			let params = {
				keyword : this.keyword,
				shop_id : this.prodInfo.shop_id
			}
			axios.post(config.baseUrl + '/product/allBy',qs.stringify(params)).then((res)=>{
				if(res.data.status == 0){
					that.productList = res.data.data;
				}else{
					alert(res.data.statusinfo);
				}
			}).catch((res)=>{
				console.log(res);
			})
		},
        saveProduct : function(){
        	let that = this;
        	this.getContet();
        	console.log(this.prodInfo);
        	let params = Object.assign({}, this.prodInfo);
        	params.key_words = JSON.stringify(params.key_words);
        	params.size_detail = JSON.stringify(params.size_detail);
        	params.type_detail = JSON.stringify(params.type_detail);
        	params.images = JSON.stringify(params.images);
        	params.part_ids = JSON.stringify(params.part_ids);
        	if(this.prodInfo.id){
        		axios.post(config.baseUrl + '/product/edit',qs.stringify(params)).then(function (response) {
					console.log(response);
					window.location.reload();
				}).catch(function (error) {
					console.log(error);
				});
        	}else{
        		axios.post(config.baseUrl + '/product/add',qs.stringify(params)).then(function (response) {
					console.log(response);
					window.location.reload();
				}).catch(function (error) {
					console.log(error);
				});
        	}
        	
        },
        reBackList(){
			this.$router.push({ path: '/store/productList', query: { tag: this.prodInfo.shop_id }});

        }
	}
}
</script>