const StaffService = require("../services/staff.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

// Hàm tạo mới một nhân viên (Staff)
exports.create = async (req, res, next) => {
    // Kiểm tra xem trường 'TaiKhoan' trong body của request có tồn tại không
    if (!req.body?.TaiKhoan) {
        return next(new ApiError(400, "AccountName can not be empty")); // Trả về lỗi nếu trường 'TaiKhoan' không tồn tại
    }
    // Kiểm tra xem trường 'password' trong body của request có tồn tại không
    if (!req.body?.Password) {
        return next(new ApiError(400, "Passoword can not be empty")); // Trả về lỗi nếu trường 'password' không tồn tại
    }
    try {
        const staffService = new StaffService(MongoDB.client);
        const document = await staffService.create(req.body); // Tạo mới nhân viên và trả về dữ liệu đã tạo
        return res.send(document); // Trả về dữ liệu của nhân viên vừa được tạo mới
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the staff") // Trả về lỗi nếu có lỗi xảy ra trong quá trình tạo mới nhân viên
        );
    }
};

// Hàm lấy tất cả các nhân viên hoặc tìm kiếm nhân viên theo tên
exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const staffService = new StaffService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await staffService.findByName(name); // Nếu có tên được cung cấp, tìm kiếm nhân viên theo tên
        } else {
            documents = await staffService.find({}); // Nếu không có tên, lấy tất cả các nhân viên
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving the staffs") // Trả về lỗi nếu có lỗi xảy ra trong quá trình lấy dữ liệu nhân viên
        );
    }

    return res.send(documents); // Trả về dữ liệu của các nhân viên được tìm kiếm hoặc tất cả các nhân viên
};

// Hàm lấy một nhân viên dựa trên ID
exports.findOne = async (req, res, next) => {
    try {
        const staffService = new StaffService(MongoDB.client);
        const document = await staffService.findById(req.params.id); // Tìm một nhân viên theo ID
        if (!document) {
            return next(new ApiError(404, "Staff not found")); // Trả về lỗi nếu không tìm thấy nhân viên
        }
        return res.send(document); // Trả về dữ liệu của nhân viên đã tìm thấy
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error retrieving staff with id=${req.params.id}` // Trả về lỗi nếu có lỗi xảy ra trong quá trình lấy dữ liệu nhân viên
            )
        );
    }
};
