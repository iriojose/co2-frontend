<template>
    <v-bottom-navigation
        color="#2950c3"
        height="50"
        fixed
        class="pt-1"
    >
        <v-btn to="/" active-class="#2950c3">
            <span>Inicio</span>
            <v-icon>mdi-home</v-icon>
        </v-btn>

        <v-btn to="/account" active-class="#2950c3">
            <span>Perfil</span>
            <v-icon>mdi-account</v-icon>
        </v-btn>
    </v-bottom-navigation>
</template>