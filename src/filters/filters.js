export default{
	money:function(value){
		if(typeof value == 'string'){
			value = Number(value);
		}
		return '¥' +value.toFixed(2);
	}
}