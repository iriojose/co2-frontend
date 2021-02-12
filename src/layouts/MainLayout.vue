<template>
    <div>
        <router-view></router-view>
        <Footer />
    </div>
</template>

<script>
import Footer from '@/components/Footer/Index.vue';

    export default {
        components:{Footer}
    }
</script>
