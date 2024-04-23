const { ObjectId } = require("mongodb");

class BorrowService {
    constructor(client) {
        this.Borrow = client.db().collection("TheoDoiMuonSach"); // Khởi tạo một kết nối đến bộ sưu tập "TheoDoiMuonSach" trong cơ sở dữ liệu và lưu trữ nó trong thuộc tính Borrow
    }

    // Phương thức giúp trích xuất dữ liệu hợp lệ từ payload của request
    extractConactData(payload) {
        const borrow = {
            maDocGia: payload.maDocGia,
            maSach: payload.maSach,
            ngayMuon: payload.ngayMuon,
            ngayTra: payload.ngayTra,
        };

        // Loại bỏ các thuộc tính có giá trị không xác định (undefined)
        Object.keys(borrow).forEach(
            (key) => borrow[key] === undefined && delete borrow[key]
        );
        return borrow;
    }

    // Phương thức tạo mới một mục mượn sách
    async create(payload) {
        const borrow = this.extractConactData(payload); // Trích xuất dữ liệu hợp lệ từ payload
        // Tìm kiếm mục mượn sách dựa trên các thuộc tính của mục mượn sách, nếu không tìm thấy, tạo mới một mục mượn sách mới
        const result = await this.Borrow.findOneAndUpdate(
            borrow,
            { $set: borrow },
            { returnDocument: "after", upsert: true }
        );
        return result;
    }

    // Phương thức tìm kiếm mục mượn sách dựa trên bộ lọc
    async find(filter) {
        const cursor = await this.Borrow.find(filter); // Tìm kiếm các mục mượn sách dựa trên bộ lọc được cung cấp
        return await cursor.toArray(); // Chuyển kết quả từ con trỏ sang một mảng
    }

    // Phương thức tìm kiếm mục mượn sách theo ID
    async findById(id) {
        return await this.Borrow.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null, // Tìm kiếm mục mượn sách dựa trên ID, chuyển đổi ID thành ObjectId nếu ID hợp lệ
        });
    }

    // Phương thức cập nhật thông tin của một mục mượn sách
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null, // Tìm kiếm mục mượn sách dựa trên ID, chuyển đổi ID thành ObjectId nếu ID hợp lệ
        };
        const update = this.extractConactData(payload); // Trích xuất dữ liệu hợp lệ từ payload
        // Cập nhật thông tin của mục mượn sách dựa trên ID và dữ liệu cập nhật
        const result = await this.Borrow.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }
}

module.exports = BorrowService;
