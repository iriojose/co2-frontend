<template>
    <v-card width="100%" elevation="0">
        <v-card-title>
            <v-btn color="#2950c3" class="white--text font-weight-bold caption">
                Nuevo viaje
                <v-icon color="#fff" class="mx-2">mdi-plus-circle</v-icon>
            </v-btn>

            <v-btn @click="exportExcel(viajes)" class="mx-2 caption white--text font-weight-bold" color="#2950c3">
                Exportar a excel
            </v-btn>
        </v-card-title>

        <v-card-text>
            <v-data-table
                :loading="loading && '#2950c3'" 
                :headers="headers" 
                :items="viajes" 
                class="elevation-0" 
            >   
            </v-data-table>
        </v-card-text>
    </v-card>
</template>

<script>
import {mapState} from 'vuex';
import excel from '@/mixins/excel';

    export default {
        props:{
            viajes:{
                type:Array,
                default:() => ([])
            },
            loading:{
                type:Boolean,
                default:false
            }
        },
        mixins:[excel],
        data(){
            return {
                headers: [
                    { text: 'Id', value: 'id'},
                    { text: "Fecha",sortable:true,value:"created_at"},
                    { text: 'Salida',sortable: true, value: 'punto_inicio'},
                    { text: 'Llegada', value: 'punto_fin'},
                    { text: 'Kilometros', value: 'kilometros',align:'center'},
                    { text: 'Ida y vuelta', value: 'idayvuelta',align:'center'},
                    { text: 'Transporte', value: 'vehiculo',align:'center'},
                    { text: 'KgCo2', value: 'total',align:'center'},
                ],
            }
        }, 
    }
</script>

