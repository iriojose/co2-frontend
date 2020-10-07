export default {//mensajes para error o success
    methods:{
        success(mensaje){
            this.$toasted.success(mensaje, { 
                theme: "toasted-primary", 
                position: "top-right", 
                duration : 2000,
                //icon : "done",
            });
        },
        error(mensaje){
            this.$toasted.error(mensaje, { 
                theme: "toasted-primary", 
                position: "top-right", 
                duration : 2000,
                //con : "error",
            });
        },
    }
}