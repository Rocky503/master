const NxbService = require("../services/nxb.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

// Hàm tạo mới một nhà xuất bản (NXB)
exports.create = async (req, res, next) => {
    // Kiểm tra xem trường 'tenNxb' trong body của request có tồn tại không
    if (!req.body?.tenNxb) {
        return next(new ApiError(400, "Name can not be empty")); // Trả về lỗi nếu trường 'tenNxb' không tồn tại
    }
    try {
        const nxbService = new NxbService(MongoDB.client);
        const document = await nxbService.create(req.body); // Tạo mới NXB và trả về dữ liệu đã tạo
        return res.send(document); // Trả về dữ liệu của NXB vừa được tạo mới
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "An error occurred while creating the nxb") // Trả về lỗi nếu có lỗi xảy ra trong quá trình tạo mới NXB
        );
    }
};

// Hàm lấy tất cả các NXB hoặc tìm kiếm NXB theo tên
exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const nxbService = new NxbService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await nxbService.findByName(name); // Nếu có tên được cung cấp, tìm kiếm NXB theo tên
        } else {
            documents = await nxbService.find({}); // Nếu không có tên, lấy tất cả các NXB
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving the publisher") // Trả về lỗi nếu có lỗi xảy ra trong quá trình lấy dữ liệu NXB
        );
    }

    return res.send(documents); // Trả về dữ liệu của các NXB được tìm kiếm hoặc tất cả các NXB
};

// Hàm lấy một NXB dựa trên ID
exports.findOne = async (req, res, next) => {
    try {
        const nxbService = new NxbService(MongoDB.client);
        const document = await nxbService.findById(req.params.id); // Tìm một NXB theo ID
        if (!document) {
            return next(new ApiError(404, "Publisher not found")); // Trả về lỗi nếu không tìm thấy NXB
        }
        return res.send(document); // Trả về dữ liệu của NXB đã tìm thấy
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error retrieving Publisher with id=${req.params.id}` // Trả về lỗi nếu có lỗi xảy ra trong quá trình lấy dữ liệu NXB
            )
        );
    }
};

// Hàm cập nhật thông tin của một NXB
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty")); // Trả về lỗi nếu không có dữ liệu được cung cấp để cập nhật
    }

    try {
        const nxbService = new NxbService(MongoDB.client);
        const document = await nxbService.update(req.params.id, req.body); // Cập nhật thông tin của NXB
        if (!document) {
            return next(new ApiError(404, "Publisher not found")); // Trả về lỗi nếu không tìm thấy NXB để cập nhật
        }
        return res.send({ message: "Publisher was updated successfully" }); // Trả về thông báo thành công nếu cập nhật thành công
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error updating Publisher with id=${req.params.id}` // Trả về lỗi nếu có lỗi xảy ra trong quá trình cập nhật NXB
            )
        );
    }
};

// Hàm xóa một NXB dựa trên ID
exports.delete = async (req, res, next) => {
    try {
        const nxbService = new NxbService(MongoDB.client);
        const document = await nxbService.delete(req.params.id); // Xóa NXB dựa trên ID
        if (!document) {
            return next(new ApiError(404, "Publisher not found")); // Trả về lỗi nếu không tìm thấy NXB để xóa
        }
        return res.send({ message: "Publisher was deleted successfully" }); // Trả về thông báo thành công nếu xóa thành công
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Could not delete Publisher with id=${req.params.id}` // Trả về lỗi nếu có lỗi xảy ra trong quá trình xóa NXB
            )
        );
    }
};

// Hàm xóa tất cả các NXB
exports.deleteAll = async (_req, res, next) => {
    try {
        const nxbService = new NxbService(MongoDB.client);
        const deletedCount = await nxbService.deleteAll(); // Xóa tất cả các NXB
        return res.send({
            message: `${deletedCount} Publisher were deleted successfully`, // Trả về thông báo về số lượng NXB đã xóa thành công
        });
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "An error occurred while removing all Publisher") // Trả về lỗi nếu có lỗi xảy ra trong quá trình xóa tất cả các NXB
        );
    }
};
