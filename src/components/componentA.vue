<template>
	<div>
		爸爸说:{{saymsg}}
		<div>
			儿子对爸爸说: <input type="text" v-model="boysay"/>
			<button v-on:click="say">说什么</button>
		</div>
	</div>
</template>


<script>

export default {
	data(){
		return {
			boysay:''
		}
	},
	props : ['saymsg'],
	methods:{
		say : function(){
			this.$emit('boy-tell-me',this.boysay)
		}
	}

}

</script>

<style>
	
</style>