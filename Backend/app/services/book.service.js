const { ObjectId } = require("mongodb");

class BookService {
    constructor(client) {
        this.Book = client.db().collection("Sach"); // Khởi tạo một kết nối đến bộ sưu tập "Sach" trong cơ sở dữ liệu và lưu trữ nó trong thuộc tính Book
    }

    // Phương thức giúp trích xuất dữ liệu hợp lệ từ payload của request
    extractConactData(payload) {
        const book = {
            tenSach: payload.tenSach,
            donGia: payload.donGia,
            soQuyen: payload.soQuyen,
            namXuatBan: payload.namXuatBan,
            maNxb: payload.maNxb,
            nguonGoc: payload.nguonGoc
        };

        // Loại bỏ các thuộc tính có giá trị không xác định (undefined)
        Object.keys(book).forEach(
            (key) => book[key] === undefined && delete book[key]
        );
        return book;
    }

    // Phương thức tạo mới một sách
    async create(payload) {
        const book = this.extractConactData(payload); // Trích xuất dữ liệu hợp lệ từ payload
        // Tìm kiếm sách dựa trên các thuộc tính của sách, nếu không tìm thấy, tạo mới một cuốn sách mới
        const result = await this.Book.findOneAndUpdate(
            book,
            { $set: book },
            { returnDocument: "after", upsert: true }
        );
        return result;
    }

    // Phương thức tìm kiếm sách dựa trên bộ lọc
    async find(filter) {
        const cursor = await this.Book.find(filter); // Tìm kiếm các sách dựa trên bộ lọc được cung cấp
        return await cursor.toArray(); // Chuyển kết quả từ con trỏ sang một mảng
    }

    // Phương thức tìm kiếm sách theo tên
    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" }, // Sử dụng biểu thức chính quy để tìm kiếm tên sách không phân biệt chữ hoa chữ thường
        });
    }

    // Phương thức tìm kiếm sách theo ID
    async findById(id) {
        return await this.Book.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null, // Tìm kiếm sách dựa trên ID, chuyển đổi ID thành ObjectId nếu ID hợp lệ
        });
    }

    // Phương thức cập nhật thông tin của một cuốn sách
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null, // Tìm kiếm sách dựa trên ID, chuyển đổi ID thành ObjectId nếu ID hợp lệ
        };
        const update = this.extractConactData(payload); // Trích xuất dữ liệu hợp lệ từ payload
        // Cập nhật thông tin của sách dựa trên ID và dữ liệu cập nhật
        const result = await this.Book.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }

    // Phương thức xóa một cuốn sách dựa trên ID
    async delete(id) {
        const result = await this.Book.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null, // Tìm kiếm sách dựa trên ID, chuyển đổi ID thành ObjectId nếu ID hợp lệ
        });
        return result;
    }

    // Phương thức xóa tất cả các sách
    async deleteAll() {
        const result = await this.Book.deleteMany({}); // Xóa tất cả các sách từ cơ sở dữ liệu
        return result.deletedCount; // Trả về số lượng sách đã bị xóa
    }
}

module.exports = BookService;
