const { Events } = require("../../models/index");
const ApiError = require("../../utils/ApiError");
const httpStatus = require('http-status');


/**
 * Create
 * @param {Object} body
 * @returns {Promise<Events>}
 */
const create = async (body) => {
  const events = Events.create(body)
  return events
};

/**
 * Query for items
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const paginate = async (filter, options) => {
  const items = await Events.paginate(filter, options);
  return items;
};

/**
 * Get by id
 * @param {ObjectId} id
 * @returns {Promise<Events>}
 */
const getById = async (options) => {
  return Events.findById(options);
};

/**
 * Get all/one
 * @param {ObjectId} id
 * @returns {Promise<Events>}
 */
const find = async (query) => {
  return Events.find(query);
};

/**
 * Update by id
 * @param {ObjectId} id
 * @param {Object} body
 * @returns {Promise<Events>}
 */
const update = async (id, body) => {
  const item = await getById(id);
  if (!item) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
  }

  Object.assign(item, body);
  await item.save();
  return item;
};

/**
 * Delete by id
 * @param {ObjectId} id
 * @returns {Promise<Events>}
 */
const destroy = async (id) => {
  const item = await getById(id);
  if (!item) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
  }
  await item.remove();
  return item;
};

/**
 * Get All records
 * @param {Object} options
 * @returns {Promise<NewsAndEvent>}
 */
const getAll = async (options) => {
  const items = await Events.find(options, null, {
    sort: { createdAt: -1 }
  });
  return items;
};

const getByTitle = async (options) => {
  const items = await Events.findOne(options);
  return items;
};

module.exports = {
  create,
  find,
  paginate,
  getById,
  getAll,
  destroy,
  update,
  getByTitle,
};
