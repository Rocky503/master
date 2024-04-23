<template>
    <Form @submit="submitBook" :validation-schema="bookFormSchema">
        <div class="form-group">
            <label for="tenSach">Tên Sách</label>
            <Field name="tenSach" type="text" class="form-control" v-model="bookLocal.tenSach" />
            <ErrorMessage name="tenSach" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="donGia">Đơn giá</label>
            <Field name="donGia" type="number" class="form-control" v-model="bookLocal.donGia" />
            <ErrorMessage name="donGia" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="soQuyen">Số quyển</label>
            <Field name="soQuyen" type="number" class="form-control" v-model="bookLocal.soQuyen" />
            <ErrorMessage name="soQuyen" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="namXuatBan">Năm Xuất Bản</label>
            <Field name="namXuatBan" type="number" class="form-control" v-model="bookLocal.namXuatBan" />
            <ErrorMessage name="namXuatBan" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="maNxb">Nhà Xuất Bản</label>
            <Field name="maNxb" as="select" v-model="bookLocal.maNxb" class="form-control">
                <option disabled value="">Chọn nhà xuất bản</option>
                <option v-for="nxb in nxbs" :key="nxb._id" :value="nxb._id">{{ nxb.tenNxb }}</option>
            </Field>
            <ErrorMessage name="maNxb" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="nguonGoc">Nguồn gốc</label>
            <Field name="nguonGoc" type="text" class="form-control" v-model="bookLocal.nguonGoc" />
            <ErrorMessage name="nguonGoc" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary">Lưu</button>
            <button v-if="bookLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteBook">
                Xóa
            </button>
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
    emits: ["submit:book", "delete:book"],
    props: {
        book: { type: Object, required: true }
    },
    data() {
        const bookFormSchema = yup.object().shape({
            tenSach: yup
                .string()
                .required("Hãy nhập tên!.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(20, "Tên có nhiều nhất 20 ký tự."),
            donGia: yup
                .string()
                .required("Hãy nhập đơn giá!."),
            soQuyen: yup
                .string()
                .required("Hãy nhập số quyển!."),
            namXuatBan: yup
                .string()
                .required("Hãy nhập năm xuất bản!."),
            maNxb: yup
                .string()
                .required("Hãy nhập nhà xuất bản!."),
            nguonGoc: yup
                .string()
                .required("Hãy nhập nguồn gốc!."),
        });
        return {
            nxbs: [],
            bookLocal: this.book,
            bookFormSchema,
        };
    },
    methods: {
        submitBook() {
            this.$emit("submit:book", this.bookLocal);
        },
        deleteBook() {
            this.$emit("delete:book", this.bookLocal.id);
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