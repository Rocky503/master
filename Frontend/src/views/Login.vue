<template>
    <div class="page mt-5 pt-5">
        <h4>Đăng nhập độc giả</h4>
        <LoginForm :guest="newGuest" @submit:guest="loginGuest" />
        <div class="toast" :class="{ 'show': message !== '' }" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    {{ message }}
                </div>
                <button type="button" class="btn text-white" data-dismiss="toast" aria-label="Close"
                    @click="clearMessage">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";
import GuestService from "@/services/guest.service";

export default {
    components: {
        LoginForm,
    },
    data() {
        return {
            newGuest: {},
            message: "",
        };
    },
    methods: {
        async loginGuest(data) {
            try {
                const guestList = await GuestService.getAll();
                const matchedGuest = guestList.find(guest => guest.taiKhoan === data.taiKhoan && guest.password === data.password);
                if (matchedGuest) {
                    this.$root.isLoggedIn = true;
                    this.$router.push({ name: "book" });
                } else {
                    this.message = "Sai tài khoản hoặc mật khẩu.";
                }
            } catch (error) {
                console.log(error);
            }
        },
        clearMessage() {
            this.message = '';
        }
    },
};
</script>

<style>
.toast {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    max-width: 300px;
    background-color: red;
    color: #fff;
}
</style>