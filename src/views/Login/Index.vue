<template>
    <div class="margen">
        <v-card color="transparent" elevation="0" width="100%">
            <v-card-text>
                <v-row justify="center" class="py-2">
                    <v-col cols="12" md="9" sm="12">
                        <v-card
                            color="#eee" width="100%" elevation="0"
                            style="padding: 0 15px"
                        >
                            <v-row justify="center">
                                <v-col cols="12" md="6" class="hidden-sm-and-down">
                                    <v-img 
                                        width="100%" height="400"
                                        contain :src="require('@/assets/img/undrawlogin.svg')"
                                    ></v-img>
                                </v-col>
                                <v-col cols="12" md="6" sm="12" class="px-8 py-12">
                                    <div class="headline text-center mb-5">
                                        Inicia sesión ahora!
                                    </div>

                                    <v-form v-model="valid" @submit.prevent="">
                                        <v-text-field
                                            filled
                                            rounded
                                            :disabled="loading"
                                            v-model="data.user"
                                            single-line
                                            dense
                                            :rules="[
                                                required('Email'),
                                                emailFormat()
                                            ]"
                                            label="Ingrese correo electrónico"
                                        >
                                        </v-text-field>

                                        <v-text-field
                                            filled rounded
                                            dense @click:append="showPassword = !showPassword"
                                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                            :disabled="loading" v-model="data.password"
                                            single-line :type="showPassword ? 'text':'password'"
                                            :rules="[
                                                required('Contraseña'),
                                                minLength('Contraseña', 6),
                                            ]"
                                            label="Contraseña"
                                        ></v-text-field>

                                        <v-btn
                                            roundedccolor="#005598" block
                                            :loading="loading" height="40"
                                            :disabled="!valid" color="#005598"
                                            @click="login()"
                                            class="text-capitalize caption white--text"
                                        >
                                            Iniciar sesión
                                        </v-btn>
                                    </v-form>

                                    <v-divider class="my-5"></v-divider>

                                    <div
                                        class="subtitle-2 text-center color"
                                        @click="forgot()"
                                    >
                                        ¿Olvidaste tu contraseña? ¡Recuperala!
                                    </div>

                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import Auth from "@/api/Auth";
import validations from "@/validations/validations";
import mensajes from '@/mixins/mensajes';
import { mapActions, mapState } from "vuex";

    export default {
        mixins:[mensajes],
        data() {
            return {
                ...validations,
                showPassword:false,
                loading: false,
                valid: false,
                data: {
                    user: "",
                    password: "",
                },
            };
        },
        head: {
            title() {
                return {
                    inner: "Iniciar sesión",
                    separator: " ",
                    complement: " ",
                };
            },
        },
        methods:{
            ...mapActions('sesion',["logged"]),

            forgot(){
                this.$router.push("/forgot");
            },
            login() {
                this.loading = true;
                Auth().post("/login", { data: this.data }).then((response) => {
                    this.logged(response.data);
                    this.success("Bienvenido");
                    this.$router.push("/dashboard")
                }).catch(() => {
                    this.error("Contraseña y/o usuario incorrecto")
                }).finally(() => {
                    this.loading = false;
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .margen{
        margin-top:100px;   
    }
    .color:hover{
        cursor:pointer;
        text-decoration:underline;
        background:#eee;
    }
     .color{
        color:#000;
        background:#eee;
    }
</style>