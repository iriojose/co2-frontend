import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// Configuración rutas
const routerOptions = [
	{ path: '/', name: 'Home',meta:{auth:true}},
	{ path: '/login', name: 'Login',meta:{auth:false}},
	{ path: '/register', name: 'Register',meta:{auth:false}},
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
		if(user !== null) next();
		else next({name: 'Login'});
	}else{
		if(user !== null) next({name: 'Home'});
		else next();
	}
});

export default router