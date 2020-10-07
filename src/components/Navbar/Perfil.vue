<template>
    <div>
        <v-menu
            id="noShadow"
            :transition="transition()"
            bottom
            open-on-hover 
            offset-y
            elevation="2"
        >
            <!--boton -->
            <template v-slot:activator="{ on }">
                <v-btn v-on="on" fab class="mx-3" elevation="0" small color="transparent">
                    <v-icon color="#232323">
                        mdi-account-circle
                    </v-icon>
                </v-btn>
            </template>
           
            <v-card class="customized">
                <!-- encabezado -->
                <v-list width="250" elevation="0">
                    <v-list-item class="border">
                        <v-list-item-avatar size="70">
                            <v-img :src="require('@/assets/img/user.jpg')"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title v-text="user.data.nombre+' '+user.data.apellido"></v-list-item-title>
                            <v-list-item-subtitle>Cliente</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>

                <v-divider></v-divider>
                <!--opciones -->
                <v-list dense>
                    <v-hover v-slot:default="{hover}">
                        <v-list-item to="/account">   
                            <v-list-item-icon>
                                <v-icon :color="hover ? '#232323':null">mdi-cogs</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>
                                perfil
                            </v-list-item-title>        
                        </v-list-item>
                    </v-hover>
                    
                    <v-hover v-slot:default="{hover}">
                        <v-list-item @click="logOut()">   
                            <v-list-item-icon>
                                <v-icon :color="hover ? '#232323':null">mdi-exit-to-app</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>
                                Cerrar sesíon
                            </v-list-item-title>        
                        </v-list-item>
                    </v-hover>
                </v-list>
            </v-card>
        </v-menu>
    </div>
</template>

<script>
import {mapActions,mapState} from 'vuex';

    export default {
        computed: {
            ...mapState('sesion',{user:'user'}),
        },
        methods: {
            ...mapActions('sesion',["logout"]),

            transition(){
                return "slide-y-transition"
            },
            logOut(){
                this.logout();
                this.$router.push('/login');
            },
        },
    }
</script>

<style lang="scss" scoped>
    .v-menu__content {
        box-shadow: none;
    }
</style>