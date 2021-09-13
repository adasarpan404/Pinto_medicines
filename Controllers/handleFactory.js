const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../Utils/apiFeatures');

exports.deleteOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const docs = await Model.findByIdAndDelete(req.params.id);
        if (!docs) {
            return next(new AppError('No tour found with that ID', 404))
        }
        res.status(204).json({
            status: 'success',
            data: null,
        })
    });

exports.createOne = (Model) => catchAsync(async (req, res, next) => {
    const medicine = await Model.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            medicine,
        }
    })
})

exports.updateOne = (Model) => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    })
    if (!doc) {
        return next(new AppError('No medicine found with that Id', 404))
    }
    res.status(200).json({
        status: 'success',
        data: {
            doc,
        },
    })
})

exports.getOne = (Model, populationOptions) => catchAsync(async (req, res, next) => {
    console.log(req.params);
    let query = Model.findById(req.params.id);
    if (populationOptions) query = query.populate(populationOptions);
    const doc = await query;
    console.log(doc)
    res.status(200).json({
        status: 'success',
        data: {
            doc,
        }
    })
})

exports.getAll = (Model) =>
    catchAsync(async (req, res, next) => {

        let filter = {};
        if (req.params.medicineId) filter = { medicine: req.params.medicineId };
        console.log(req.query)
        const features = new APIFeatures(Model.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();


        const medicine = await features.query;
        console.log(medicine)
        res.status(200).json({
            status: 'success',
            results: medicine.length,
            data: { medicine, }
        })
    })
