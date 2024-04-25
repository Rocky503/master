<template>
    <div class="page">
        <h4>Đăng ký tài khoản độc giả</h4>
        <SignUpForm :guest="newGuest" @submit:guest="createGuest" />
        <div class="toast bg-success" :class="{ 'show': message !== '' }" role="alert" aria-live="assertive"
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
import SignUpForm from "@/components/SignUpForm.vue";
import GuestService from "@/services/guest.service";

export default {
    components: {
        SignUpForm,
    },
    data() {
        return {
            newGuest: {
                Ten: '',
                HoLot: '',
                Phai: '',
                DiaChi: '',
            },
            message: "",
        };
    },
    methods: {
        async createGuest(data) {
            try {
                await GuestService.create(data);
                this.message = "Tạo tài khoản thành công!";
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
