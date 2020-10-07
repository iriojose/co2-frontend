<template>
	<v-card class="d-flex align-content-center flex-wrap" height="100%" elevation="0">
        <v-card-text>
            <v-row justify="center">
				<div class="margen">
					<v-img contain width="300" height="300" src="@/assets/img/co2.png"></v-img>
					<div class="text-center font-weight-black headline mt-5 black--text">
						Bienvenidos A co2 App
					</div>
				</div>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
  	name: 'Home',
}
</script>

<style lang="scss" scoped>
	.margen{
		margin-top:150px;
	}
</style>
