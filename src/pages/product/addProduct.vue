<style>
.addProduct{}
.addProduct .left{
	float: left;
	width: 60%;
}
.addProduct .right{
	float: right;
	width: 40%;
	text-align: center;
}
.addProduct .type{
	display: inline-block;
}
.addProduct .keys{
	display: inline-block;
}
.addProduct .values{
	display: inline-block;
	width: 60%;
}
input , select{
	height: 32px;
	line-height: 32px;
}
	
</style>

<template>
	<div class="addProduct">
		<button @click="addLine">添加一行</button>
		<button @click="getContet">获取富文本内容</button>
		<div class="left">
			<script id="container" type="text/plain" style="width:500px;height:500px;"></script>
			<div class="list">
				<div v-for="item in array">
					<div class="type">
						<select v-model="item.type">
							<option v-for="one in category " :value="one.type">{{one.name}}</option>
						</select>
					</div>
					<div class="keys">
						<input type="text" v-model="item.key">
					</div>
					<div class="values">
						<input v-if="item.type == 1 || item.type == 2" type="text" v-model="item.value">
						<textarea v-else-if="item.type == 3" id="" cols="40" rows="10" v-model="item.value"></textarea>
					</div>
				</div>
			</div>
			
		</div>
		<div class="right">
			{{content}}
		</div>
	</div>
</template>

<script>
import '../../../static/js/ueditor/ueditor.config.js'
import '../../../static/js/ueditor/ueditor.all.min.js'
import '../../../static/js/ueditor/lang/zh-cn/zh-cn.js'
import '../../../static/js/ueditor/ueditor.parse.min.js'

export default{
	data(){
		return {
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
        	console.log(content)
        	this.content = content;
        },
		addLine :function(){
			var item = {
				key : '',
				value : '',
				type : 4
			}
			this.array.push(item);
		}
	}
}
</script>