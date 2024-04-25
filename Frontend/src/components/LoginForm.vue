<template>
    <Form @submit="submitGuest" :validation-schema="guestFormSchema">
        <div class="form-group">
            <label for="TaiKhoan">Tài khoản </label>
            <Field name="TaiKhoan" type="text" class="form-control" v-model="guestLocal.taiKhoan" />
            <ErrorMessage name="TaiKhoan" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="Password">Mật khẩu</label>
            <Field name="Password" type="text" class="form-control" v-model="guestLocal.Password" />
            <ErrorMessage name="Password" class="error-feedback" />
        </div>
        <div class="form-group d-flex justify-content-between">
            <button class="btn btn-primary">Đăng nhập</button>
            <router-link :to="{ name: 'signUp' }" class="nav-link">
                Đăng ký
            </router-link>
        </div>
    </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:guest"],
    props: {
        guest: { type: Object, required: true }
    },
    data() {
        const guestFormSchema = yup.object().shape({
            taiKhoan: yup
                .string()
                .required("Hãy nhập tài khoản!."),
            Password: yup
                .string()
                .required("Hãy nhập mật khẩu!.")
        });
        return {
            guestLocal: this.guest,
            guestFormSchema,
        };
    },
    methods: {
        submitGuest() {
            this.$emit("submit:guest", this.guestLocal);
        },
    },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>