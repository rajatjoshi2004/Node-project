const Joi = require('joi');
const { objectId } = require('../custom.validation');

const create = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    date: Joi.string().required(),
    category: Joi.string().required(),
    status: Joi.string().required(),
    createdBy: Joi.string().required(),
    remarks: Joi.string().required(),
  }),
};

const paginate = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    search: Joi.string(),
    status: Joi.string(),
  }),
};

const get = {
  params: Joi.object().keys({
  id:  Joi.string().custom(objectId),
  }),
};

const update = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    date: Joi.string().required(),
    category: Joi.string().required(),
    status: Joi.string().required(),
    createdBy: Joi.string().required(),
    remarks: Joi.string().required(),
  }),
};

const destroy = {
  params: Joi.object().keys({
  id:  Joi.string().custom(objectId),
   
  }),
};

module.exports = {
  create,
  paginate,
  get,
  update,
  destroy,
};
