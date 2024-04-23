<template>
    <Form @submit="submitGuest" :validation-schema="guestFormSchema">
        <div class="form-group">
            <label for="taiKhoan">Tài khoản </label>
            <Field name="taiKhoan" type="text" class="form-control" v-model="guestLocal.taiKhoan" />
            <ErrorMessage name="taiKhoan" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="password">Mật khẩu</label>
            <Field name="password" type="text" class="form-control" v-model="guestLocal.password" />
            <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary">Đăng nhập</button>
        </div>
    </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import nxbService from "@/services/nxb.service";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:guest", "delete:guest"],
    props: {
        guest: { type: Object, required: true }
    },
    data() {
        const guestFormSchema = yup.object().shape({
            taiKhoan: yup
                .string()
                .required("Hãy nhập tài khoản!."),
            password: yup
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
    async mounted() {
        this.nxbs = await nxbService.getAll();
    },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>