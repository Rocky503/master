<template>
    <div v-if="nxb" class="page">
        <h4>Hiệu chỉnh Nhà Xuất Bản</h4>
        <NxbForm :nxb="nxb" @submit:nxb="updateNxb" @delete:nxb="deleteNxb" />
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
import NxbForm from "@/components/NxbForm.vue";
import NxbService from "@/services/nxb.service";
export default {
    components: {
        NxbForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            nxb: null,
            message: "",
        };
    },
    methods: {
        async getNxb(id) {
            try {
                this.nxb = await NxbService.get(id);
            } catch (error) {
                console.log(error);
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updateNxb(data) {
            try {
                await NxbService.update(this.nxb._id, data);
                this.message = "Cập nhật sách thành công.";
            } catch (error) {
                console.log(error);
            }
        },
        clearMessage() {
            this.message = '';
        },
        async deleteNxb() {
            if (confirm("Bạn muốn xóa sách này?")) {
                try {
                    await NxbService.delete(this.nxb._id);
                    this.$router.push({ name: "nxb" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getNxb(this.id);
        this.message = "";
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