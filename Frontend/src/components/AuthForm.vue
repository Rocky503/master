<template>
    <Form @submit="submitStaff" :validation-schema="staffFormSchema">
        <div class="form-group">
            <label for="taiKhoan">Tài khoản </label>
            <Field name="taiKhoan" type="text" class="form-control" v-model="staffLocal.taiKhoan" />
            <ErrorMessage name="taiKhoan" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="password">Mật khẩu</label>
            <Field name="password" type="text" class="form-control" v-model="staffLocal.password" />
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
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:staff"],
    props: {
        staff: { type: Object, required: true }
    },
    data() {
        const staffFormSchema = yup.object().shape({
            taiKhoan: yup
                .string()
                .required("Hãy nhập tài khoản!."),
            password: yup
                .string()
                .required("Hãy nhập mật khẩu!.")
        });
        return {
            staffLocal: this.staff,
            staffFormSchema,
        };
    },
    methods: {
        submitStaff() {
            this.$emit("submit:staff", this.staffLocal);
        },
    },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>