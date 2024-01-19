const Joi = require('joi');


const create = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    // date: Joi.string().required(),
    // category: Joi.string().required(),
    // status: Joi.string().required(),
    // createdBy: Joi.string().required(),
    // remarks: Joi.string().required(),
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

  }),
};

const update = {
  params: Joi.object().keys({
   
  }),

  body: Joi.object().keys({
    title: Joi.string().required(),
    fileName: Joi.string().required(),
    shortContent: Joi.string().required(),
   
  }),
};

const destroy = {
  params: Joi.object().keys({
   
  }),
};

module.exports = {
  create,
  paginate,
  get,
  update,
  destroy,
};
