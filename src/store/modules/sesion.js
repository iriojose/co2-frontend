import Auth from '@/api/Auth';
//se maneja informacion referente a la sesion del usaurio
export default {
    namespaced: true,

    state: {
        accessToken: null,
        loading:false,
        user:{
            data:null,
            loggedIn:false
        }
    },

    mutations: {
        SET_ACCESS_TOKEN (state, payload) {
            state.accessToken = payload;
            window.sessionStorage.setItem('token_client',JSON.stringify(payload));
        },
        SET_LOADING(state,payload){
            state.loading = payload;
        },
        SET_USER(state,payload){
            let data = {//se hizo asi para que los watch puedan escuchar el cambio de la variable user al iniciar sesion
                loggedIn:true,
                data:payload.data,
            };
            state.user = data;
        },
        LOGOUT(state){
            state.accessToken = null;
            state.user.data = null;
            state.user.loggedIn = false;
            window.sessionStorage.clear();//se elimina la data de la sesion
        },
    },
  
    actions: {
        setLoading({commit},payload){
            commit('SET_LOADING',payload);
        },
        logout({commit}){
            commit('LOGOUT');
        },
        logged({commit},payload){
            commit('SET_USER',payload);
            commit('SET_ACCESS_TOKEN',payload.token);
        },
        getSesion({ commit },payload) {
            commit('SET_LOADING', true);
            Auth().post("/sesion",{token:payload}).then((response) => {
                //sesion expirada
                if(response.data.code == 440) sessionStorage.removeItem("token_client");
                //token incorrecto
                if(response.data.code == 401) sessionStorage.removeItem("token_client");
                
                //sesion success
                if(response.data.code == 200){
                    commit('SET_ACCESS_TOKEN', payload);
                    commit('SET_USER',response.data.response);
                }
            }).catch(e => {
                //sessionStorage.removeItem("token_client");
            }).finally(() => {
                commit('SET_LOADING', false);
            })
        }
    }
}