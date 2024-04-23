<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <router-link :to="{ name: 'book' }" class="navbar-brand">
            Quản lý
        </router-link>
        <div class="mr-auto navbar-nav d-flex">
            <li class="nav-item">
                <router-link :to="{ name: 'book' }" class="nav-link">
                    Sách
                    <i class="fas fa-book"></i>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'nxb' }" class="nav-link">
                    Nhà xuất bản
                    <i class="fas fa-building"></i>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'borrowManage' }" class="nav-link">
                    Xử lý sách mượn
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
            this.$root.isLoggedIn = false;
            this.$router.push({ name: "signIn" });
        },
    },
};
</script>
