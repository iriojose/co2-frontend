<template>
    <div>
        dashboard
    </div>
</template>

<script>
import Data from '@/api/Data';
import {mapState} from 'vuex';

    export default {
        data(){
            return {
                loading:false,
                viajes:[],
            }
        },
        computed:{
            ...mapState('sesion',{user:'user'}),
        },
        created(){
            this.getViajes();
        },
        methods:{
            getViajes(){
                this.loading = true;
                Data().get(`/usuario/${this.user.data.id}/viajes`).then((response) => {
                    console.log(response);
                    this.viajes = response.data.data;
                }).catch((e) => {
                    console.log(e);
                }).finally(() => {
                    this.loading = false;
                });
            }
        }        
    }
</script>
