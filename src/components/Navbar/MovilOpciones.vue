<template>
    <v-menu left bottom>
        <template v-slot:activator="{ on }">
            <v-btn 
                icon fab small 
                v-on="on" 
            >
                <v-icon color="#232323">mdi-dots-vertical</v-icon>
            </v-btn>
        </template>

        <v-list dense flat>
            <v-list-item v-for="(item,i) in items" :key="i" :to="item.to">
                <v-list-item-icon>
                    <v-icon>{{item.icon}}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{item.text}}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
    export default {
        data() {
            return {
                items:[
                    {text:'Iniciar sesón',icon:'mdi-account-box',to:'/login'},
                    {text:'Registrate',icon:'mdi-account-details',to:'/register'},
                ]
            }
        },
    }
</script>