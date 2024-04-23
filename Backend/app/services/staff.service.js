const { ObjectId } = require("mongodb");

class StaffService {
    constructor(client) {
        this.Staff = client.db().collection("NhanVien"); // Khởi tạo một kết nối đến bộ sưu tập "NhanVien" trong cơ sở dữ liệu và lưu trữ nó trong thuộc tính Staff
    }

    // Phương thức giúp trích xuất dữ liệu hợp lệ từ payload của request
    extractConactData(payload) {
        const staff = {
            hoTen: payload.hoTen,
            taiKhoan: payload.taiKhoan,
            password: payload.password,
            chucVu: payload.chucVu,
            diaChi: payload.diaChi,
            soDienThoai: payload.soDienThoai,
        };

        // Loại bỏ các thuộc tính có giá trị không xác định (undefined)
        Object.keys(staff).forEach(
            (key) => staff[key] === undefined && delete staff[key]
        );
        return staff;
    }

    // Phương thức tạo mới một nhân viên
    async create(payload) {
        const staff = this.extractConactData(payload); // Trích xuất dữ liệu hợp lệ từ payload
        // Tìm kiếm nhân viên dựa trên các thuộc tính của nhân viên, nếu không tìm thấy, tạo mới một nhân viên mới
        const result = await this.Staff.findOneAndUpdate(
            staff,
            { $set: staff },
            { returnDocument: "after", upsert: true }
        );
        return result;
    }

    // Phương thức tìm kiếm nhân viên dựa trên bộ lọc
    async find(filter) {
        const cursor = await this.Staff.find(filter); // Tìm kiếm các nhân viên dựa trên bộ lọc được cung cấp
        return await cursor.toArray(); // Chuyển kết quả từ con trỏ sang một mảng
    }

    // Phương thức tìm kiếm nhân viên theo ID
    async findById(id) {
        return await this.Staff.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null, // Tìm kiếm nhân viên dựa trên ID, chuyển đổi ID thành ObjectId nếu ID hợp lệ
        });
    }
}

module.exports = StaffService;
