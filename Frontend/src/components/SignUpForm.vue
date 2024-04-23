<template>
    <Form @submit="submitGuest" :validation-schema="guestFormSchema">
        <div class="form-group">
            <label for="taiKhoan">Tài khoản</label>
            <Field name="taiKhoan" type="text" class="form-control" v-model="guestLocal.taiKhoan" />
            <ErrorMessage name="taiKhoan" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="password">Mật khẩu</label>
            <Field name="password" type="text" class="form-control" v-model="guestLocal.password" />
            <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="hoLot">Họ (Tùy chọn)</label>
            <Field name="hoLot" type="text" class="form-control" v-model="guestLocal.hoLot" />
            <ErrorMessage name="hoLot" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="ten">Tên (Tùy chọn)</label>
            <Field name="ten" type="text" class="form-control" v-model="guestLocal.ten" />
            <ErrorMessage name="ten" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="phai">Phái (Tùy chọn)</label>
            <Field name="phai" as="select" class="form-control" v-model="guestLocal.phai">
                <option value="">Chọn phái</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
            </Field>
            <ErrorMessage name="phai" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="diaChi">Địa chỉ (Tùy chọn)</label>
            <Field name="diaChi" type="text" class="form-control" v-model="guestLocal.diaChi" />
            <ErrorMessage name="diaChi" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="dienThoai">Điện thoại (Tùy chọn)</label>
            <Field name="dienThoai" type="text" class="form-control" v-model="guestLocal.dienThoai" />
            <ErrorMessage name="dienThoai" class="error-feedback" />
        </div>
        <div class="form-group d-flex justify-content-between">
            <button class="btn btn-primary">Đăng ký</button>
            <router-link :to="{ name: 'login' }" class="nav-link">Đăng nhập</router-link>
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
            taiKhoan: yup.string().required("Hãy nhập tài khoản!"),
            password: yup.string().required("Hãy nhập mật khẩu!"),
            hoLot: yup.string().max(20, "Họ không được vượt quá 20 kí tự"),
            ten: yup.string().max(20, "Tên không được vượt quá 20 kí tự"),
            diaChi: yup.string().max(50, "Địa chỉ không được vượt quá 50 kí tự"),
            dienThoai: yup.string().matches(/^\d{10}$/, "Điện thoại phải có 10 số"),
        });

        return {
            nxbs: [],
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