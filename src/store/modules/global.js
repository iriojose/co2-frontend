export default {
    namespaced: true,

    state: {
        vehiculos:[]
    },

    mutations: {
        SET_VEHICULOS(state,payload){
            state.vehiculos = payload;
        },
    },
  
    actions: {
        setVehiculos({commit},payload){
            commit('SET_VEHICULOS',payload);
        },
    }
}