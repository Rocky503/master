const GuestService = require("../services/guest.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

// Hàm tạo mới một khách hàng
exports.create = async (req, res, next) => {
    // Kiểm tra xem trường 'Account' trong body của request có tồn tại không
    if (!req.body?.Account) {
        return next(new ApiError(400, "AccountName can not be empty")); // Trả về lỗi nếu trường 'Account' không tồn tại
    }
    // Kiểm tra xem trường 'password' trong body của request có tồn tại không
    if (!req.body?.password) {
        return next(new ApiError(400, "Passoword can not be empty")); // Trả về lỗi nếu trường 'password' không tồn tại
    }
    try {
        const guestService = new GuestService(MongoDB.client);
        const document = await guestService.create(req.body); // Tạo mới khách hàng và trả về dữ liệu đã tạo
        return res.send(document); // Trả về dữ liệu của khách hàng vừa được tạo mới
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "An error occurred while creating the guest") // Trả về lỗi nếu có lỗi xảy ra trong quá trình tạo mới khách hàng
        );
    }
};

// Hàm lấy tất cả các khách hàng hoặc tìm kiếm khách hàng theo tên
exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const guestService = new GuestService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await guestService.findByName(name); // Nếu có tên được cung cấp, tìm kiếm khách hàng theo tên
        } else {
            documents = await guestService.find({}); // Nếu không có tên, lấy tất cả các khách hàng
        }
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "An error occurred while retrieving the guests") // Trả về lỗi nếu có lỗi xảy ra trong quá trình lấy dữ liệu khách hàng
        );
    }

    return res.send(documents); // Trả về dữ liệu của các khách hàng được tìm kiếm hoặc tất cả các khách hàng
};

// Hàm lấy một khách hàng dựa trên ID
exports.findOne = async (req, res, next) => {
    try {
        const guestService = new GuestService(MongoDB.client);
        const document = await guestService.findById(req.params.id); // Tìm một khách hàng theo ID
        if (!document) {
            return next(new ApiError(404, "Guest not found")); // Trả về lỗi nếu không tìm thấy khách hàng
        }
        return res.send(document); // Trả về dữ liệu của khách hàng đã tìm thấy
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error retrieving guest with id=${req.params.id}` // Trả về lỗi nếu có lỗi xảy ra trong quá trình lấy dữ liệu khách hàng
            )
        );
    }
};
