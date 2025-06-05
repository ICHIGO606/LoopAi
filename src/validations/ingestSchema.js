const Joi = require('joi');
const PriorityEnum = require('../utils/priorityEnum');

const ingestSchema = Joi.object({
  ids: Joi.array()
    .items(Joi.number().integer().min(1).max(1e9 + 7))
    .required(),
  priority: Joi.string()
    .valid(...Object.keys(PriorityEnum))
    .required()
});

module.exports = ingestSchema;