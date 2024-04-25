<template>
    <div class="page mt-5 pt-5">
        <h4>Đăng nhập nhân viên</h4>
        <AuthForm :staff="newStaff" @submit:staff="loginStaff" />
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
import AuthForm from "@/components/AuthForm.vue";
import StaffService from "@/services/staff.service";

export default {
    components: {
        AuthForm,
    },
    data() {
        return {
            newStaff: {},
            message: "",
        };
    },
    methods: {
        async loginStaff(data) {
            try {
                const staffList = await StaffService.getAll();
                const matchedStaff = staffList.find(staff => staff.TaiKhoan === data.TaiKhoan && staff.Password === data.Password);
                if (matchedStaff) {
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
    color: #fff;
}
</style>
