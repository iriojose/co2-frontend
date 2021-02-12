<template>
	<v-card v-if="loading" class="d-flex align-content-center flex-wrap" height="100%" elevation="0">
        <v-card-text>
			<v-row justify="center">
				<LoadLayout>
					<BaseLoading/>
				</LoadLayout>
		 	</v-row>
        </v-card-text>
    </v-card>

	<v-card v-else class="d-flex align-content-center flex-wrap" height="100%" elevation="0">

        <v-card-text>
			<v-row justify="center">
				<div class="headline black--text" style="margin-bottom:20px;margin-top:50px;align:center">
					Bienvenido {{user.data.nombre }} {{ user.data.apellido}}

					<v-btn fab small @click="salir" class="mx-2">
						<v-icon>mdi-exit-to-app</v-icon>
					</v-btn>
				</div>
			</v-row>
            <v-row justify="center">
				<Table :notas="notas" />
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
import LoadLayout from '@/layouts/LoadLayout.vue';
import BaseLoading from '@/components/BaseLoading.vue';
import Table from './Table';
import Data from "@/api/Data";
import { mapState,mapActions} from "vuex";

	export default {
		components: {LoadLayout, BaseLoading,Table },
		name: 'Home',
		data() {
            return {
				notas:[],
				loading:true
            };
		},
		created() {
			this.getNotas();
		},
		computed:{
			...mapState('sesion', {user: 'user'})
		},
		head: {
			title() {
				return {
					inner: "Inicio",
					separator: " ",
					complement: " ",
				};
			},
		},
		methods:{
			...mapActions('sesion',{logout:'logout'}),

			salir(){
				this.logout();
				this.$router.push("/login");
			},

			getNotas() {	
                Data().get(`/usuario/${this.user.data.id}/notas`).then((response) => {
					this.notas = response.data.pivotes;
                }).finally(() => {
                    this.loading = false;
                });
            },
		}
	}
</script>

<style lang="scss" scoped>
	.margen{
		margin-top:150px;
	}
	.center{
		align:center;
	}
</style>
