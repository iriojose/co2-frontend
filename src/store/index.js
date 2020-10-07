import Vue from 'vue'
import Vuex from 'vuex'

import sesion from './modules/sesion'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		sesion,
	}
})
