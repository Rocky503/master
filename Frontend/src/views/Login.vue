<template>
    <div class="page mt-5 pt-5">
        <h4>Đăng nhập độc giả</h4>
        <LoginForm :guest="newGuest" @submit:guest="loginGuest" />
        <div class="toast bg-danger" :class="{ 'show': message !== '' }" role="alert" aria-live="assertive"
            aria-atomic="true">
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
                const matchedGuest = guestList.find(guest => guest.TaiKhoan === data.TaiKhoan && guest.Password === data.Password);
                if (matchedGuest) {
                    this.$root.isLoggedInGuest = true;
                    this.$store.dispatch('updateUserId', matchedGuest._id);
                    this.$router.push({ name: "BookScreen" });
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
    color: #fff;
}
</style>
