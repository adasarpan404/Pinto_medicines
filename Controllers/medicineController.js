const Medicine = require('./../Model/medicineModel')
const multer = require('multer')
const sharp = require('sharp')
const catchAsync = require('./../Utils/catchAsync')
const factory = require('./handleFactory')
const appError = require('./../utils/appError')

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Not an image! Please upload only images', 400))
    }
}
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
})

exports.uploadMedicinePhoto = upload.single('photo');
exports.resizeMedicinePhoto = catchAsync(async (req, res, next) => {
    if (!req.file) return next();
    req.file.filename = `user-${req.medicine.id}-${Date.now()}.webp`;
    await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat('webp')
        .toFile(`public/img/users/${req.file.filename}`)
    next();
})
exports.createMedicine = factory.createOne(Medicine)
exports.getAllMedicine = factory.getAll(Medicine)
exports.getMedicine = factory.getOne(Medicine)
exports.updateMedicine = factory.updateOne(Medicine);
exports.deleteMedicine = factory.deleteOne(Medicine)