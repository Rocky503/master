const BorrowService = require("../services/borrow.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

// Hàm tạo mới một phiếu mượn sách
exports.create = async (req, res, next) => {
    // Kiểm tra xem trường 'BorrowedDate' trong body của request có tồn tại không
    if (!req.body?.BorrowedDate) {
        return next(new ApiError(400, "Borrowed date can not be empty")); // Trả về lỗi nếu trường 'BorrowedDate' không tồn tại
    }
    try {
        const borrowService = new BorrowService(MongoDB.client);
        const document = await borrowService.create(req.body); // Tạo mới phiếu mượn sách và trả về dữ liệu đã tạo
        return res.send(document); // Trả về dữ liệu của phiếu mượn sách vừa được tạo mới
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "An error occurred while creating the borrow") // Trả về lỗi nếu có lỗi xảy ra trong quá trình tạo mới phiếu mượn sách
        );
    }
};

// Hàm lấy tất cả các phiếu mượn sách hoặc tìm kiếm phiếu mượn sách theo tên
exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const borrowService = new BorrowService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await borrowService.findByName(name); // Nếu có tên được cung cấp, tìm kiếm phiếu mượn sách theo tên
        } else {
            documents = await borrowService.find({}); // Nếu không có tên, lấy tất cả các phiếu mượn sách
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving the borrows") // Trả về lỗi nếu có lỗi xảy ra trong quá trình lấy dữ liệu phiếu mượn sách
        );
    }

    return res.send(documents); // Trả về dữ liệu của các phiếu mượn sách được tìm kiếm hoặc tất cả các phiếu mượn sách
};

// Hàm lấy một phiếu mượn sách dựa trên ID
exports.findOne = async (req, res, next) => {
    try {
        const borrowService = new BorrowService(MongoDB.client);
        const document = await borrowService.findById(req.params.id); // Tìm một phiếu mượn sách theo ID
        if (!document) {
            return next(new ApiError(404, "Borrow not found")); // Trả về lỗi nếu không tìm thấy phiếu mượn sách
        }
        return res.send(document); // Trả về dữ liệu của phiếu mượn sách đã tìm thấy
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error retrieving borrow with id=${req.params.id}` // Trả về lỗi nếu có lỗi xảy ra trong quá trình lấy dữ liệu phiếu mượn sách
            )
        );
    }
};

// Hàm cập nhật thông tin của một phiếu mượn sách
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty")); // Trả về lỗi nếu không có dữ liệu được cung cấp để cập nhật
    }

    try {
        const borrowService = new BorrowService(MongoDB.client);
        const document = await borrowService.update(req.params.id, req.body); // Cập nhật thông tin của phiếu mượn sách
        if (!document) {
            return next(new ApiError(404, "Borrow not found")); // Trả về lỗi nếu không tìm thấy phiếu mượn sách để cập nhật
        }
        return res.send({ message: "Borrow was updated successfully" }); // Trả về thông báo thành công nếu cập nhật thành công
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error updating borrow with id=${req.params.id}` // Trả về lỗi nếu có lỗi xảy ra trong quá trình cập nhật phiếu mượn sách
            )
        );
    }
};
