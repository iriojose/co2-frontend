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
                                        contain :src="require('@/assets/img/forgot.svg')"
                                    ></v-img>
                                </v-col>
                                <v-col cols="12" md="6" sm="12" class="px-8 py-12">
                                    <div class="headline text-center mb-5">
                                        ¿Olvido su contraseña?
                                    </div>

                                    <v-form v-model="valid" @submit.prevent="">
                                        <v-text-field
                                            filled
                                            rounded
                                            :disabled="loading"
                                            v-model="email"
                                            single-line
                                            color="#0f2441"
                                            :rules="[
                                                required('Email'),
                                                emailFormat()
                                            ]"
                                            label="Ingrese correo electrónico"
                                        >
                                        </v-text-field>

                                        <v-btn
                                            rounded
                                            color="#005598"
                                            block
                                            :disabled="!valid"
                                            :loading="loading"
                                            height="40"
                                            @click="sendMail"
                                            class="text-capitalize caption"
                                        >
                                            Enviar email
                                        </v-btn>
                                    </v-form>

                                    <v-divider class="my-10"></v-divider>

                                    <div class="subtitle-2 text-center color" @click="login">Recordé mi contraseña</div>
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
import validations from '@/validations/validations';
import Auth from '@/api/Auth';

    export default {
        data() {
            return {
                ...validations,
                valid:false,
                loading:false,
                email:""
            }
        },
        head:{
            title(){
                return {
                    inner:'Recupear contraseña',
                    separator:' ',
                    complement: ' '
                }
            }
        },
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
            login(){
                this.$router.push("/login");
            },
            sendMail(){
                this.loading = true;
                Auth().post("/sendmail",{data:{user:this.email}}).then(() => {
                    this.success("Email enviado exitosamente.");
                    this.login();
                }).catch(() => {
                    this.error("Error al enviar el Email");
                }).finally(()=> {
                    this.loading = false;
                });
            },
        }
    }
</script>

<style lang="scss" scoped>
    .color{
        color:#000;
        background:#eee;
    }
    .color:hover{
        cursor:pointer;
        text-decoration:underline;
        background:#eee;
    }
    .margen{
        margin-top:100px;   
    }
</style>