import Vue from 'vue'
import Vuex from 'vuex'

import sesion from './modules/sesion'
import global from './modules/global'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		sesion,
		global
	}
})
