<template>
    <v-card class="d-flex align-content-center flex-wrap" height="100%" elevation="0">
        <v-card-text>
            <v-row justify="center">
                <slot />
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'LoadLayout'
}
</script>