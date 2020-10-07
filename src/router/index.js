import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// Configuración rutas
const routerOptions = [
	{ path: '/', name: 'Home',meta:{auth:false}},
	{ path: '/dashboard', name: 'Dashboard',meta:{auth:true}},
	{ path: '/account', name: 'Perfil',meta:{auth:true}},
	{ path: '/login', name: 'Login',meta:{auth:false}},
	{ path: '/register', name: 'Register',meta:{auth:false}},
	{ path: '/forgot', name: 'Forgot',meta:{auth:false}},
	{ path: '/resetpassword/:email/:token', name: 'Reset',meta:{auth:false}},
	{ path: '*', redirect: { name: 'Home' } }
]

// Rutas
const routes = routerOptions.map(r => {
	return {
		...r,
		// Lazy load
		component: () => import(/* webpackChunkName: "[request]" */`@/views/${r.name}/Index.vue`)
	}
})

const router = new Router({
	mode: 'history',
	base: "/",
	routes,
	linkActiveClass: 'router-link-active', 
    linkExactActiveClass: 'router-link-exact-active', 
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
    parseQuery: q => q,
    fallback: true,
});

router.beforeEach((to,from,next) => {
	let user = window.sessionStorage.getItem('token_client');

	if(to.meta.auth){
		if(user !== null){
			next();
		}else{
			next({name: 'Home'});
		}
	}else{
		if(to.name == 'Login' && user !== null){
			next({name:'Dashboard'});
		}else if(to.name == 'Login' && user !== null){
			next({name:'Dashboard'});
		}else if(to.name == 'Register' && user !== null){
			next({name:'Dashboard'});
		}else if(to.name == 'Reset' && user !== null){
			next({name:'Dashboard'});
		}else if(to.name == 'Forgot' && user !== null){
			next({name:'Dashboard'});
		}else{
			next();
		}
	}
});

export default router