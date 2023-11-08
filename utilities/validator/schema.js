const Joi = require('joi');

// const BaseJoi = require('joi');
// const sanitizeHtml = require('sanitize-html');

// const extension = (joi) => ({
//     type: 'string',
//     base: joi.string(),
//     messages: {
//         'string.escapeHTML': '{{#label}} must not include HTML!'
//     },
//     rules: {
//         escapeHTML: {
//             validate(value, helpers) {
//                 const clean = sanitizeHtml(value, {
//                     allowedTags: [],
//                     allowedAttributes: {},
//                 });
//                 if (clean !== value) return helpers.error('string.escapeHTML', { value })
//                 return clean;
//             }
//         }
//     }
// });

// const Joi = BaseJoi.extend(extension)

const PostSchema = Joi.object({
    title : Joi.string().required(),
    image: Joi.object({
        path : Joi.string().required(),
        filename : Joi.string().required()
    }),
    content : Joi.string().required(),
    published : Joi.date()
})

const CommentSchema = Joi.object({
    body : Joi.string().required(),
    postedOn : Joi.date()
})

module.exports = { PostSchema , CommentSchema};