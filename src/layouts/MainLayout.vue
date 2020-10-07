<template>
    <div>
        <Navbar />

        <router-view></router-view>

        <Footer v-if="!$vuetify.breakpoint.smAndDown" />
        <BottomNavigation v-else/>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar/Index.vue';
import Footer from '@/components/Footer/Index.vue';
import BottomNavigation from '@/components/Footer/BottomNavigation';

    export default {
        components:{Navbar,Footer,BottomNavigation}
    }
</script>
