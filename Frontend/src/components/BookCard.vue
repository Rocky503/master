<script>
import NxbService from "@/services/nxb.service";

export default {
    props: {
        book: { type: Object, required: true },
        nxbId: { type: String, required: true },
    },
    data() {
        return {
            nxbName: "N/A"
        };
    },
    async mounted() {
        this.fetchNxbName();
    },
    watch: {
        nxbId(newVal) {
            this.fetchNxbName();
        }
    },
    methods: {
        async fetchNxbName() {
            try {
                const nxb = await NxbService.get(this.nxbId);
                this.nxbName = nxb.tenNxb;
            } catch (error) {
                console.error(error);
            }
        }
    },
};
</script>
<template>
    <div>
        <div class="p-1">
            <strong>Tên sách:</strong>
            {{ book.tenSach }}
        </div>
        <div class="p-1">
            <strong>Đơn giá:</strong>
            {{ book.donGia }}
        </div>
        <div class="p-1">
            <strong>Năm xuất bản:</strong>
            {{ book.namXuatBan }}
        </div>
        <div class="p-1">
            <strong>Số quyển:</strong>
            {{ book.soQuyen }}
        </div>
        <div class="p-1">
            <strong>Nhà xuất bản:</strong>
            {{ nxbName }}
        </div>
        <div class="p-1">
            <strong>Nguồn gốc:</strong>
            {{ book.nguonGoc }}
        </div>
    </div>
</template>
