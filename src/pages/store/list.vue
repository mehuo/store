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
			width: 150px;
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
	<div class="store">
		列表
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
	},
	created(){
	},
	methods : {
		
	}
}
</script>