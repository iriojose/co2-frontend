export default {
    //se manejan estados referente a data global
    namespaced: true,

    state: {
        vehiculos:[],
        usuarios:[]
    },

    mutations: {
        SET_VEHICULOS(state,payload){
            state.vehiculos = payload;
        },
        SET_USUARIOS(state,payload){
            state.usuarios = payload;
        }
    },
  
    actions: {
        setVehiculos({commit},payload){
            commit('SET_VEHICULOS',payload);
        },
        setUsuarios({commit},payload){
            commit('SET_USUARIOS',payload);
        }
    }
}