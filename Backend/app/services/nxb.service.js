const { ObjectId } = require("mongodb");

class NxbService {
    constructor(client) {
        this.Nxb = client.db().collection("NhaXuatBan"); // Khởi tạo một kết nối đến bộ sưu tập "NhaXuatBan" trong cơ sở dữ liệu và lưu trữ nó trong thuộc tính Nxb
    }

    // Phương thức giúp trích xuất dữ liệu hợp lệ từ payload của request
    extractConactData(payload) {
        const nxb = {
            tenNxb: payload.tenNxb,
            diaChi: payload.diaChi,
        };

        // Loại bỏ các thuộc tính có giá trị không xác định (undefined)
        Object.keys(nxb).forEach(
            (key) => nxb[key] === undefined && delete nxb[key]
        );
        return nxb;
    }

    // Phương thức tạo mới một nhà xuất bản
    async create(payload) {
        const nxb = this.extractConactData(payload); // Trích xuất dữ liệu hợp lệ từ payload
        // Tìm kiếm nhà xuất bản dựa trên các thuộc tính của nhà xuất bản, nếu không tìm thấy, tạo mới một nhà xuất bản mới
        const result = await this.Nxb.findOneAndUpdate(
            nxb,
            { $set: nxb },
            { returnDocument: "after", upsert: true }
        );
        return result;
    }

    // Phương thức tìm kiếm nhà xuất bản dựa trên bộ lọc
    async find(filter) {
        const cursor = await this.Nxb.find(filter); // Tìm kiếm các nhà xuất bản dựa trên bộ lọc được cung cấp
        return await cursor.toArray(); // Chuyển kết quả từ con trỏ sang một mảng
    }

    // Phương thức tìm kiếm nhà xuất bản theo tên
    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" }, // Tìm kiếm các nhà xuất bản có tên chứa từ khóa, không phân biệt chữ hoa chữ thường
        });
    }

    // Phương thức tìm kiếm nhà xuất bản theo ID
    async findById(id) {
        return await this.Nxb.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null, // Tìm kiếm nhà xuất bản dựa trên ID, chuyển đổi ID thành ObjectId nếu ID hợp lệ
        });
    }

    // Phương thức cập nhật thông tin của một nhà xuất bản
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null, // Tìm kiếm nhà xuất bản dựa trên ID, chuyển đổi ID thành ObjectId nếu ID hợp lệ
        };
        const update = this.extractConactData(payload); // Trích xuất dữ liệu hợp lệ từ payload
        // Cập nhật thông tin của nhà xuất bản dựa trên ID và dữ liệu cập nhật
        const result = await this.Nxb.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }

    // Phương thức xóa một nhà xuất bản dựa trên ID
    async delete(id) {
        const result = await this.Nxb.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null, // Tìm kiếm nhà xuất bản dựa trên ID, chuyển đổi ID thành ObjectId nếu ID hợp lệ
        });
        return result;
    }

    // Phương thức xóa tất cả nhà xuất bản
    async deleteAll() {
        const result = await this.Nxb.deleteMany({}); // Xóa tất cả các bản ghi trong bộ sưu tập
        return result.deletedCount; // Trả về số lượng bản ghi đã bị xóa
    }
}

module.exports = NxbService;
