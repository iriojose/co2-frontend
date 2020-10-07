<template>
    <v-card width="100%" elevation="0" height="100%" class="margen">
        <v-card-text>
            <v-row justify="center"> 
                <v-col cols="12" md="9" sm="12">
                    <v-card width="100%"  elevation="0" style="padding: 0 15px 0 30px">
                        <v-row justify="center" class="mt-5">
                            <v-col cols="12" md="6" class="hidden-sm-and-down" style="padding: 0 20px">
                                <v-img width="100%" height="400" contain :src="require('@/assets/img/undrawregistro2.svg')"></v-img>
                            </v-col>
                            
                            <v-col cols="12" md="6" sm="12" class="pa-8">
                                <div class="headline text-center mb-5">Registrate ahora!</div>


                                <v-form v-model="valid" @submit.prevent class="my-5" >
                                    <v-stepper  v-model="e1" class="elevation-0" non-linear>
                                        <v-stepper-items>
                                            <v-stepper-content  step="1"  style="padding: 0px">
                                                <v-text-field
                                                    filled single-line label="Nombre"
                                                    dense rounded hint="Ejemplo: Manuel"
                                                    :rules="[required('Nombre')]" v-model="data.nombre"
                                                    persistent-hint color="#2950c3" :disabled="loading"
                                                    append-icon="mdi-account"
                                                ></v-text-field>

                                                <v-text-field
                                                    filled single-line label="Apellido" dense
                                                    rounded hint="Ejemplo: Gómez" :rules="[required('Apellido')]"
                                                    v-model="data.apellido" persistent-hint
                                                    :disabled="loading" append-icon="mdi-account"
                                                ></v-text-field>

                                                <v-menu
                                                    :close-on-content-click="false"
                                                    transition="scale-transition"
                                                    max-width="100%"
                                                    offset-overflow
                                                >
                                                    <template v-slot:activator="{ on }">
                                                        <v-text-field
                                                            dense v-model="data.fecha_nac" label="Cumpleaños"
                                                            color="#2950c3" append-icon="mdi-calendar" filled
                                                            v-on="on" rounded hint="Fecha de nacimiento:YYYY/MM/DD"
                                                            persistent-hint single-line 
                                                        ></v-text-field>
                                                    </template>
                                                    <v-date-picker
                                                        v-model="data.fecha_nac" :landscape="!$vuetify.breakpoint.smAndDown" show-current
                                                        header-color="#2950c3" color="#2950c3" locale="es"
                                                    />
                                                </v-menu>
                                            </v-stepper-content>

                                            <v-stepper-content step="2" style="padding:0px">

                                                <v-text-field
                                                    filled rounded :disabled="loading"
                                                    v-model="data.email" single-line dense
                                                    color="#2950c3" 
                                                    :rules="[
                                                        required('Email'),
                                                        emailFormat()
                                                    ]" 
                                                    label="Ingrese correo electrónico" hint="Ejemplo: ejemplo@gmail.com"
                                                    persistent-hint
                                                >
                                                </v-text-field>

                                                <v-text-field
                                                    filled rounded hint="Contraseña" persistent-hint
                                                    dense :disabled="loading" v-model="data.password"
                                                    single-line type="password" color="#0f2441"
                                                    :rules="[required('Contraseña'),minLength('Contraseña',8)]"
                                                    label="Nueva contraseña" append-icon="mdi-lock"
                                                ></v-text-field>

                                                <v-text-field
                                                    filled rounded dense hint="Confirmar contraseña"
                                                    persistent-hint :disabled="loading" v-model="password2"
                                                    single-line type="password" color="#0f2441"
                                                    :rules="[required('Confirmar contraseña'),passwordConfirmationRule()]"
                                                    label="Confirmar contraseña" append-icon="mdi-lock"
                                                ></v-text-field>

                                            </v-stepper-content>
                                        </v-stepper-items>
                                    </v-stepper>
                                    
                                    <v-card-actions style="margin-top:-5px">
                                        <v-btn fab small @click="e1=1" v-if="e1==2" :disabled="loading">
                                            <v-icon>mdi-chevron-left</v-icon>
                                        </v-btn>

                                        <v-spacer></v-spacer>

                                        <v-btn v-if="e1==2" rounded :loading="loading" 
                                            height="40" :disabled="!valid" color="#005598"
                                            @click="postUsuario()" class="text-capitalize caption white--text"
                                        >Registrarse</v-btn>
                                    </v-card-actions>
                                    
                                    <v-btn v-if="e1==1" rounded block color="#005598"
                                        height="40" @click="e1=2" class="white--text text-capitalize caption"
                                    >Siguiente</v-btn>
                                </v-form>

                                <v-divider class="hidden-sm-and-up"></v-divider>
                                <div class="subtitle-2 text-center color my-5 hidden-sm-and-up" @click="forgot"
                                >¿Olvidaste tu contraseña? ¡Recuperala!</div>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>

        </v-card-text>
    </v-card>
</template>

<script>
import validations from "@/validations/validations";
import Auth from "@/api/Auth";
import { mapActions,mapState } from "vuex";

	export default {
	data() {
		return {
		e1: 1,
		...validations,
		loading: false,
		loading2: false,
		valid: false,
		valid2: false,
		change: false,
		data: {
			nombre: "",
			apellido: "",
			fecha_nac: new Date().toISOString().substr(0, 10),
			email: "",
			password: "",
			imagen: "default.png"
		},
		password2: ""
		};
	},
	head: {
		title() {
			return {
				inner: "Registrate",
				separator: " ",
				complement: " "
			};
		}
	},
	computed: {
		passwordConfirmationRule() {
			return () => this.data.password === this.password2 || "Las contraseñas no coinciden.";
		}
	},
	methods: {
        ...mapActions('sesion',["logged"]),
        
        forgot(){
            this.$router.push("/forgot");
        },
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
		postUsuario() {
            this.loading = true;
			Auth().post("/signup", { data: this.data }).then(async response => {
                this.logged(response.data);
                console.log(response);
                this.success("Bienvenido");
                this.$router.push("/dashboard");
			}).catch(() => {
				this.error("Error al registrar intente mas tarde.");
			}).finally(() => {
                this.loading = false;
            });
		},
	}
};
</script>

<style lang="scss" scoped>
    .margen{
        margin-top:100px;
    }
    .fondo{
        background:#1f3b63;
        height: 100%;
    }   
    .color {
        color: #000;
        background: #fff;
    }
    .color:hover {
    cursor: pointer;
        text-decoration: underline;
        background: #fff;
    }
</style>