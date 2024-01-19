const mongoose = require("mongoose");
const { toJSON } = require("../plugins");

const schema = mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: false,
  },
  craetedBy: {
    type: String,
    required: true,
  },

  remarks: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

//add plugin that converts moongoose to json

schema.plugin(toJSON);

const Events = mongoose.model("Events", schema);

module.exports = Events;
