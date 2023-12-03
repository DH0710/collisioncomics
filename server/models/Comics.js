const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ComicsSchema = new Schema({
 title: {
    type: String,
    required: true,
 }, 
 Company: {
   type: String,
   // required: true,
}, 
thumbnail: {
   type: String,
   // required: true,
}, 
Author: {
   type: String,
   // required: true,
}, 
Illustrator: {
   type: String,
   // required: true,
}, 
 slug: {
    type: String,
    // required: true,
 }, 
 description: {
    type: String,
    // required: true,
 }, 
 collisions: {
    type: Number,
    // required: true,
 }, 
 category: {
    type: Array,
    // required: true,
 }, 
 createdAt: {
    type: Date,
    default: Date.now()
 },
});


module.exports = mongoose.model("Comics", ComicsSchema);