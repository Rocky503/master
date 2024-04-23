const { ObjectId } = require("mongodb");

class GuestService {
    constructor(client) {
        this.Guest = client.db().collection("DocGia"); // Khởi tạo một kết nối đến bộ sưu tập "DocGia" trong cơ sở dữ liệu và lưu trữ nó trong thuộc tính Guest
    }

    // Phương thức giúp trích xuất dữ liệu hợp lệ từ payload của request
    extractConactData(payload) {
        const guest = {
            hoLot: payload.hoLot,
            ten: payload.ten,
            ngaySinh: payload.ngaySinh,
            phai: payload.phai,
            diaChi: payload.diaChi,
            dienThoai: payload.dienThoai,
            taiKhoan: payload.taiKhoan,
            password: payload.password,
        };

        // Loại bỏ các thuộc tính có giá trị không xác định (undefined)
        Object.keys(guest).forEach(
            (key) => guest[key] === undefined && delete guest[key]
        );
        return guest;
    }

    // Phương thức tạo mới một người dùng (khách)
    async create(payload) {
        const guest = this.extractConactData(payload); // Trích xuất dữ liệu hợp lệ từ payload
        // Tìm kiếm người dùng dựa trên các thuộc tính của người dùng, nếu không tìm thấy, tạo mới một người dùng mới
        const result = await this.Guest.findOneAndUpdate(
            guest,
            { $set: guest },
            { returnDocument: "after", upsert: true }
        );
        return result;
    }

    // Phương thức tìm kiếm người dùng dựa trên bộ lọc
    async find(filter) {
        const cursor = await this.Guest.find(filter); // Tìm kiếm các người dùng dựa trên bộ lọc được cung cấp
        return await cursor.toArray(); // Chuyển kết quả từ con trỏ sang một mảng
    }

    // Phương thức tìm kiếm người dùng theo ID
    async findById(id) {
        return await this.Guest.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null, // Tìm kiếm người dùng dựa trên ID, chuyển đổi ID thành ObjectId nếu ID hợp lệ
        });
    }
}

module.exports = GuestService;
