<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <span>爸爸对儿子说:</span><input type="text" v-model="fathersay">
    <component-a :saymsg="fathersay" v-on:boy-tell-me="boyToMe"></component-a>
    儿子说:{{boysay}}
  </div>
</template>

<script>
import componentA from './componentA';

export default {
  name: 'HelloWorld',
  components:{componentA},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      fathersay : '你是谁呀！',
      boysay:''
    }
  },
  methods:{
    boyToMe:function(msg){
      console.log(msg);
      this.boysay = msg;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
