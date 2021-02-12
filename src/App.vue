<template>
	<v-app>
		<LoadLayout v-if="loading">
			<BaseLoading/>
		</LoadLayout>
		
		<MainLayout v-else/>
	</v-app>
</template>

<script>
//componentes
import LoadLayout from './layouts/LoadLayout'
import MainLayout from './layouts/MainLayout'
import BaseLoading from '@/components/BaseLoading.vue'
import {mapState} from 'vuex';

export default {
    name: 'App',
    components: { MainLayout, LoadLayout, BaseLoading },
    head: {
		title() {
			return {
				inner: "App",
				separator: " ",
				complement: " ",
			};
		},
    },
	computed: {
        ...mapState('sesion', {loading: 'loading'})
    },	
};
</script>

<style lang="scss">
    html {
        scroll-behavior: smooth;
    }
    body {
    	overflow-x: hidden!important;
    }
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s;
    }
    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }
    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }
    ::-webkit-scrollbar-thumb {
        background: #ccc;
        border-radius: 12px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #b3b3b3;
        box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
    }
    ::-webkit-scrollbar-thumb:active {
        background-color: #999999;
    }
    ::-webkit-scrollbar-track {
        background: #fff;
        border-radius: 12px;
    }
    ::-webkit-scrollbar-track:hover,
    ::-webkit-scrollbar-track:active {
        background: #fff;
    }
</style>