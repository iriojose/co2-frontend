export default {
    //se manejan estados referente a data global
    namespaced: true,

    state: {
        notas:[]
    },

    mutations: {
        SET_NOTAS(state,payload){
            state.notas = payload;
        }
    },
  
    actions: {
        setNotas({commit},payload){
            commit('SET_NOTAS',payload);
        },
    }
}