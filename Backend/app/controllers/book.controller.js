const BookService = require("../services/book.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

// Hàm tạo mới một cuốn sách
exports.create = async (req, res, next) => {
    // Kiểm tra xem trường 'TenSach' trong body của request có tồn tại không
    if (!req.body?.TenSach) {
        return next(new ApiError(400, "Name can not be empty")); // Trả về lỗi nếu trường 'TenSach' không tồn tại
    }
    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.create(req.body); // Tạo mới cuốn sách và trả về dữ liệu đã tạo
        return res.send(document); // Trả về dữ liệu của cuốn sách vừa được tạo mới
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "An error occurred while creating the book") // Trả về lỗi nếu có lỗi xảy ra trong quá trình tạo mới cuốn sách
        );
    }
};

// Hàm lấy tất cả các cuốn sách hoặc tìm kiếm cuốn sách theo tên
exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const bookService = new BookService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await bookService.findByName(name); // Nếu có tên được cung cấp, tìm kiếm cuốn sách theo tên
        } else {
            documents = await bookService.find({}); // Nếu không có tên, lấy tất cả các cuốn sách
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving the books") // Trả về lỗi nếu có lỗi xảy ra trong quá trình lấy dữ liệu cuốn sách
        );
    }

    return res.send(documents); // Trả về dữ liệu của các cuốn sách được tìm kiếm hoặc tất cả các cuốn sách
};

// Hàm lấy một cuốn sách dựa trên ID
exports.findOne = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.findById(req.params.id); // Tìm một cuốn sách theo ID
        if (!document) {
            return next(new ApiError(404, "Book not found")); // Trả về lỗi nếu không tìm thấy cuốn sách
        }
        return res.send(document); // Trả về dữ liệu của cuốn sách đã tìm thấy
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error retrieving book with id=${req.params.id}` // Trả về lỗi nếu có lỗi xảy ra trong quá trình lấy dữ liệu cuốn sách
            )
        );
    }
};

// Hàm cập nhật thông tin của một cuốn sách
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty")); // Trả về lỗi nếu không có dữ liệu được cung cấp để cập nhật
    }

    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.update(req.params.id, req.body); // Cập nhật thông tin của cuốn sách
        if (!document) {
            return next(new ApiError(404, "Book not found")); // Trả về lỗi nếu không tìm thấy cuốn sách để cập nhật
        }
        return res.send({ message: "Book was updated successfully" }); // Trả về thông báo thành công nếu cập nhật thành công
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error updating book with id=${req.params.id}` // Trả về lỗi nếu có lỗi xảy ra trong quá trình cập nhật cuốn sách
            )
        );
    }
};

// Hàm xóa một cuốn sách dựa trên ID
exports.delete = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.delete(req.params.id); // Xóa một cuốn sách dựa trên ID
        if (!document) {
            return next(new ApiError(404, "Book not found")); // Trả về lỗi nếu không tìm thấy cuốn sách để xóa
        }
        return res.send({ message: "Book was deleted successfully" }); // Trả về thông báo thành công nếu xóa thành công
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Could not delete book with id=${req.params.id}` // Trả về lỗi nếu có lỗi xảy ra trong quá trình xóa cuốn sách
            )
        );
    }
};

// Hàm xóa tất cả các cuốn sách
exports.deleteAll = async (_req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const deletedCount = await bookService.deleteAll(); // Xóa tất cả các cuốn sách
        return res.send({
            message: `${deletedCount} books were deleted successfully`, // Trả về thông báo về số lượng cuốn sách đã được xóa thành công
        });
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "An error occurred while removing all books") // Trả về lỗi nếu có lỗi xảy ra trong quá trình xóa tất cả các cuốn sách
        );
    }
};
