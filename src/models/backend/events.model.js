const mongoose = require("mongoose");
const { toJSON, paginate } = require("../plugins");

const schema = mongoose.Schema(
  {
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
    createdBy: {
      type: String,
      required: true,
    },

    remarks: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//add plugin that converts moongoose to json

schema.plugin(toJSON);
schema.plugin(paginate);

const Events = mongoose.model("Events", schema);

module.exports = Events;
