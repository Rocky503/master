<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <router-link :to="{ name: 'bookScreen' }" class="navbar-brand">Books Library</router-link>
        <div class="mr-auto navbar-nav d-flex">
            <li class="nav-item">
                <router-link :to="{ name: 'bookScreen' }" class="nav-link">
                    Sách
                    <i class="fas fa-book"></i>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'borrow' }" class="nav-link">
                    Theo dõi mượn sách
                    <i class="fas fa-book-open"></i>
                </router-link>
            </li>
        </div>
        <div class="navbar-nav">
            <div class="nav-item">
                <button @click="logout" class="btn btn-danger">Đăng xuất </button>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    methods: {
        logout() {
            this.$store.dispatch('updateLoggedInStatus', false);
            this.$root.isLoggedInGuest = false;
            this.$router.push({ name: "login" });
        },
    },
};
</script>
