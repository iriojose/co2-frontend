<template>
    <v-app-bar
        app :elevation="$vuetify.breakpoint.smAndDown ? 0:null" 
        :elevate-on-scroll="$vuetify.breakpoint.smAndDown ? false:true"
    >
		<div class="d-flex align-center">
			<v-img
	            alt="logo co2" class="shrink mr-2 cursor" contain
				src='@/assets/img/co2.png' transition="scale-transition"
			    width="40" height="40" @click="push"
			/>
		</div>
        <v-toolbar-title class="font-weight-bold">
            Co2
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <div v-show="!user.loggedIn" class="hidden-sm-and-down">
            <v-btn text to="/login" class="mx-1 black--text font-weight-bold text-capitalize">
                Iniciar sesión
            </v-btn>
                
            <v-hover v-slot:default="{hover}">
                <v-btn :elevation="hover ? 10:0" height="30" to="/register" class="mx-1 font-weight-bold text-capitalize">
                    Registrate
                </v-btn>
            </v-hover>
        </div>

        <!--opciones de navegacion -->
        <!--Perfil v-show="user.loggedIn && !$vuetify.breakpoint.smAndDown" /-->
        <!--MovilOpciones v-if="$vuetify.breakpoint.smAndDown && !user.loggedIn" /-->
    </v-app-bar>
</template>

<script>
import {mapState} from 'vuex';

    export default {
        components:{
            //Perfil:() => import("./Perfil"),
            //MovilOpciones:() => import("./MovilOpciones"),
        },
        computed:{
            ...mapState('sesion',{user:'user'}),
        },
        methods:{
            push(){ this.$router.push('/')}
        }
    }
</script>

<style lang="scss">
    .v-toolbar__content, .v-toolbar__extension{
        z-index:unset!important;
    }
</style>