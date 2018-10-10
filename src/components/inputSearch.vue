<template>
	<div class="search-box clearfix">
		<div class="page-search">
	        <div class="form-group">
	            <input type="search" placeholder="" value="" class="form-control" placeholder="搜索关键字" v-model="keyword" @keyup.enter="search">
	            <button class="btn search" type="submit" @click="search">搜索</button>
	        </div>
	    </div>
	</div>
</template>

<script>
	export default{
		props : ['color','radius'],
		data(){
			return{
				keyword : ''
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
	    input{
		  height: 34px;
		  line-height: 34px;
		  position: relative;
		  z-index: 2;
		  float: left;
		  margin-bottom: 0;
		  -webkit-appearance: none;
		  border: solid 1px #cdcdcd;
		  padding: 0px 8px;
		  width: 100%;
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
		}
	}
	/*搜索框 END*/
</style>