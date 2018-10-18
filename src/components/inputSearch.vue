<template>
	<div class="page-search clearfix" :style="boxStyle">
        <div class="form-group">
            <input type="search" :style="inputStyle" placeholder="搜索关键字" v-model="keyword" @keyup.enter="search">
            <button class="btn search" :style="btnStyle" type="submit" @click="search">搜索</button>
        </div>
    </div>
</template>

<script>
	export default{
		props : ['color','radius','width'],
		data(){
			return{
				keyword : '',
				boxStyle : '',
				btnStyle : '',
				inputStyle : ''
			}
		},
		mounted(){
			this.btnStyle = 'background:'+this.color+';border-color:'+this.color+';';
			if(this.radius){
				this.btnStyle = this.btnStyle + 'border-radius:0 ' + this.radius +' ' + this.radius + ' 0';
				this.inputStyle = 'border-radius:'+this.radius+' 0 0 ' + this.radius + ';'
			}
			if(this.width){
				this.boxStyle = 'width:' + this.width + ';'
			}
		},
		methods:{
			search(){
				console.log(this.keyword);
				this.$emit('searchByKey',this.keyword);
			}
		}
	}
	
</script>

<style scoped lang="less">
	/*搜索框 BEGIN*/
	.page-search{
	    width: 100%;
	    height: 34px;
	    position: relative;
	    input{
	    	width: calc(100% - 99px);
			height: 34px;
			line-height: 34px;
			z-index: 2;
			float: left;
			margin-bottom: 0;
			-webkit-appearance: none;
			border: solid 1px #cdcdcd;
			padding: 0px 8px;
		}
		.search {
		    width: 100px;
		    height: 34px;
		    padding: 0 16px;
		    font-size: 14px;
		    line-height: 28px;
		    vertical-align: middle;
		    z-index: 9;
		    color: #ffffff;
		    background: #ff5000;
		    border: solid 2px #ff5000;
		    position: absolute;
		    transform: translateX(-100%);
		    left: 100%;
		    border-radius:0;
		}
	}
	/*搜索框 END*/
</style>