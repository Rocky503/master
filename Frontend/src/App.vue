<script>
import AppHeader from "@/components/AppHeader.vue";
import AppHeaderGuest from "./components/AppHeaderGuest.vue";
export default {
    components: {
        AppHeader,
        AppHeaderGuest,
    },
    data() {
        return {
            isLoggedIn: false,
            isLoggedInGuest: false,
        };
    },
    computed: {
        isHeaderVisible() {
            return this.$route.path !== '/';
        },
    },
};
</script>
<template>
    <div id="app">
        <AppHeaderGuest v-if="isLoggedInGuest" />
        <AppHeader v-if="isLoggedIn" />
        <div class="container mt-3">
            <router-view />
        </div>
    </div>
</template>
<style>
.page {
    max-width: 400px;
    margin: auto;
}
</style>