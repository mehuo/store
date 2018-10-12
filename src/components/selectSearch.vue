<template>
	<div class="select-search" :style="boxStyle">
        <input type="search" class="form-control" :style="inputStyle" placeholder="--请选择--" v-model="option.name" @keyup.enter="search" @click="openSelect">
        <div class="ll" v-if="showll">
        	<div class="ls" v-for="item in list" v-if="item.isShow" @click="selectThis(item)">{{item.name}}</div>
        </div>
    </div>
</template>

<script>
	export default{
		props : ['color','radius','width','list'],
		data(){
			return{
				keyword : '',
				boxStyle : '',
				inputStyle : '',
				showll : false,
				option : {
					name : ''
				}
			}
		},
		mounted(){
			console.log(this.list);
			this.btnStyle = 'background:'+this.color+';border-color:'+this.color+';';
			if(this.radius){
				this.inputStyle = 'border-radius:'+this.radius;
			}
			if(this.width){
				this.boxStyle = 'width:' + this.width + ';'
			}
		},
		methods:{
			openSelect(){
				this.showll = !this.showll;
			},
			selectThis(item){
				this.option=JSON.parse(JSON.stringify(item))
				console.log(this.option);
			},
			search(){
				console.log(this.option.name);
				this.list.forEach(function(value,key){
					if(value.name.contains(this.option.name)){
						value.isShow = true;
					}
				})
			}
				// this.$emit('searchByKey',this.keyword);

		}
	}
	
</script>

<style scoped lang="less">
	/*搜索框 BEGIN*/
	.select-search{
	    width: 100%;
	    height: 34px;
	    position: relative;
	    input{
	    	width: 100%;
			height: 34px;
			line-height: 34px;
			z-index: 2;
			margin-bottom: 0;
			-webkit-appearance: none;
			border: solid 1px #cdcdcd;
			padding: 0px 8px;
		}
		.ll{
			width: 100%;
		    border: solid 1px #cdcdcd;
		    border-radius: 4px;
		    margin-top: 4px;
		    padding: 8px;
		    color: #757575;
		    box-sizing: border-box;
		    position: absolute;
		    z-index: 10;
		    background: #fff;
		    .ls{
				height: 28px;
		    }
		}
		
	}
	/*搜索框 END*/
</style>