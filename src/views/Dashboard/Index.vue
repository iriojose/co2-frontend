<template>
    <div class="margen">
        <DataTable :loading="loading" :viajes="dataViajes" />
    </div>
</template>

<script>
import Data from '@/api/Data';
import {mapState} from 'vuex';

    export default {
        components:{
            DataTable:() => import("./DataTable")
        },
        data(){
            return {
                loading:false,
                viajes:[],
            }
        },
        computed:{
            ...mapState('sesion',{user:'user'}),
            ...mapState('global',{vehiculos:'vehiculos'}),

            dataViajes(){
                let data = [];
                //borra los substring de las fechas
                this.viajes.filter((a) => a.detalles.created_at = a.detalles.created_at.substr(0,10));
                //elimina el pivote y separa el objeto raiz con assign
                this.viajes.filter(a => data.push(Object.assign({},a.detalles)));
                //buscar el nombre del vehiculo para mostrar en la tabla
                this.viajes.filter((a,i) => this.vehiculos.filter(b => a.detalles.medio_transporte_id == b.id ? data[i].vehiculo = b.nombre+` (${b.descripcion} )`:null));
                //determina si es ida y vuelta para cambiar el mensaje en la tabla
                data.filter((a,i) =>a.idayvuelta == 0 ? a.idayvuelta = "si":a.idayvuelta="no");
                //hace el calculo del kgco2 por viaje tomando en cuenta ida y vuelta
                data.filter(a => a.idayvuelta == "si" ? a.total = (+a.kilometros) * this.calculoVehiculo(a.medio_transporte_id) * 2 : a.total= +a.kilometros * this.calculoVehiculo(a.medio_transporte_id));
                //elimina datos innecesarios para el excel
                data.filter(a => delete a.updated_at);
                data.filter(a => delete a.medio_transporte_id);
                return data;
            },
        },
        created(){
            this.getViajes();
        },
        methods:{
            getViajes(){//llamada para traer todos los viajes del usuario logueado
                this.loading = true;
                Data().get(`/usuario/${this.user.data.id}/viajes`).then((response) => {
                    this.viajes = response.data.pivotes;
                }).catch((e) => {
                    console.log(e);
                }).finally(() => {
                    this.loading = false;
                });
            },
            calculoVehiculo(id){//busca el factor de emision del vehiculo a buscar
                let valor = 0;
                this.vehiculos.filter(a => a.id == id ? valor = a.factor_emision:null);
                return +valor;
            }
        }        
    }
</script>

<style lang="scss"scoped>
    .margen{
        margin-top:100px;
    }
</style>