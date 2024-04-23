<template>
    <Form @submit="submitNxb" :validation-schema="nxbFormSchema">
        <div class="form-group">
            <label for="tenNxb">Tên nhà xuất bản</label>
            <Field name="tenNxb" type="text" class="form-control" v-model="nxbLocal.tenNxb" />
            <ErrorMessage name="tenNxb" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="diaChi">Địa chỉ</label>
            <Field name="diaChi" type="text" class="form-control" v-model="nxbLocal.diaChi" />
            <ErrorMessage name="diaChi" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary">Lưu</button>
            <button v-if="nxbLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteNxb">
                Xóa
            </button>
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
    emits: ["submit:nxb", "delete:nxb"],
    props: {
        nxb: { type: Object, required: true }
    },
    data() {
        const nxbFormSchema = yup.object().shape({
            tenNxb: yup
                .string()
                .required("Hãy nhập tên!.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            diaChi: yup
                .string()
                .required("Hãy nhập địa chỉ!.")
        });
        return {
            nxbLocal: this.nxb,
            nxbFormSchema,
        };
    },
    methods: {
        submitNxb() {
            this.$emit("submit:nxb", this.nxbLocal);
        },
        deleteNxb() {
            this.$emit("delete:nxb", this.nxbLocal.id);
        },
    },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>