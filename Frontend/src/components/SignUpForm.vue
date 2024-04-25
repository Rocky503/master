<template>
    <Form @submit="submitGuest" :validation-schema="guestFormSchema">
        <div class="form-group">
            <label for="TaiKhoan">Tài khoản</label>
            <Field name="TaiKhoan" type="text" class="form-control" v-model="guestLocal.TaiKhoan" />
            <ErrorMessage name="TaiKhoan" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="Password">Mật khẩu</label>
            <Field name="Password" type="text" class="form-control" v-model="guestLocal.Password" />
            <ErrorMessage name="Password" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="HoLot">Họ (Tùy chọn)</label>
            <Field name="HoLot" type="text" class="form-control" v-model="guestLocal.HoLot" />
            <ErrorMessage name="HoLot" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="Ten">Tên (Tùy chọn)</label>
            <Field name="Ten" type="text" class="form-control" v-model="guestLocal.Ten" />
            <ErrorMessage name="Ten" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="Phai">Phái (Tùy chọn)</label>
            <Field name="Phai" as="select" class="form-control" v-model="guestLocal.Phai">
                <option value="">Chọn phái</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nu</option>
            </Field>
            <ErrorMessage name="Phai" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="DiaChi">Địa chỉ (Tùy chọn)</label>
            <Field name="DiaChi" type="text" class="form-control" v-model="guestLocal.DiaChi" />
            <ErrorMessage name="DiaChi" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="DienThoai">Điện thoại (Tùy chọn)</label>
            <Field name="DienThoai" type="text" class="form-control" v-model="guestLocal.DienThoai" />
            <ErrorMessage name="DienThoai" class="error-feedback" />
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
            TaiKhoan: yup.string().required("Hãy nhập tài khoản!"),
            Password: yup.string().required("Hãy nhập mật khẩu!"),
            HoLot: yup.string().max(20, "Họ không được vượt quá 20 kí tự"),
            Ten: yup.string().max(20, "Tên không được vượt quá 20 kí tự"),
            DiaChi: yup.string().max(50, "Địa chỉ không được vượt quá 50 kí tự"),
            DienThoai: yup.string().matches(/^\d{10}$/, "Điện thoại phải có 10 số"),
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
