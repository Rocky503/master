<script>
export default {
    props: {
        nxb: { type: Object, required: true },
    },
};
</script>
<template>
    <div>
        <div class="p-1">
            <strong>Tên nhà xuất bản:</strong>
            {{ nxb.tenNxb }}
        </div>
        <div class="p-1">
            <strong>Địa chỉ:</strong>
            {{ nxb.diaChi }}
        </div>
    </div>
</template>