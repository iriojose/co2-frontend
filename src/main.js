import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//plugins
import vuetify from './plugins/vuetify';
import head from './plugins/head';
import toasted from './plugins/toasted';

//ICONS 
//import "@mdi/font/css/materialdesignicons.css";

// CSS global
import './assets/css/main.scss'

Vue.config.productionTip = false

new Vue({
	router,
	store,
	vuetify,
	head,
	toasted,
	/*methods: {reestauracion de sesion
		init () {
			let token = JSON.parse(window.sessionStorage.getItem("token_client"));
        	if(token !== null) store.dispatch('sesion/getSesion', token, { root: true });
		}
	},
	created () {
		this.init()
	},*/
  render: h => h(App)
}).$mount('#app')