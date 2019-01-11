import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  data: {
    message: "test"
  },
  render: 
  // h => h(App)
  function(h) {
    return h(App)
  }
})
