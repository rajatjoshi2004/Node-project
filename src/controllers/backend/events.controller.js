const pick = require('../../utils/pick');
const { eventService } = require('../../services/index.services');
const catchAsync = require('../../utils/catchAsync');

const create = catchAsync(async (req, res) => {
  try{
    const product = await eventService.create(req.body);
    res.send({ status: true, data: product });
  }
  catch(error){
    res.send({status:false,message:error.message})
  }
   
});

const paginate = catchAsync(async (req, res) => {
  console.log("dsh")
  let filter = pick(req.query, ['search', 'status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  // serach filter for question as regex
  // eslint-disable-next-line no-prototype-builtins

  if (filter.hasOwnProperty('search')) {
    filter = {
      ...filter,
      title: { $regex: new RegExp(`.*${filter.search.toLowerCase()}.*`), $options: 'i' },
      // relationType: { '$regex': new RegExp(`.*${filter.search.toLowerCase()}.*`), $options: 'i' }
    };
  }

  delete filter.search;

  const result = await eventService.paginate(filter, options);
  res.send({ ...result, status: true });
});

const get = catchAsync(async (req, res) => {
  const product = await eventService.getById(req.params.id);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
  }
  res.send(product);
});

const getAll = catchAsync(async (req, res) => {
  const result = await eventService.getAll({ status: 'ACTIVE' });
  res.send({ result, status: true });
});
const getEventById = catchAsync(async (req, res) => {
  const result = await eventService.getById({ status: 'ACTIVE', _id: req.params.id });
  res.send({ result, status: true });
});

const update = catchAsync(async (req, res) => {
  const product = await eventService.update(req.params.id, req.body);
  res.send({ status: true, data: product });
});

const destroy = catchAsync(async (req, res) => {
  await eventService.destroy(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

const upload = catchAsync(async (req, res) => {
  res.send({ status: true, data: req.file });
});

module.exports = {
  create,
  paginate,
  get,
  getAll,
  update,
  destroy,
  upload,
  getEventById,
};
