const mongoose = require("mongoose");
const { Schema } = mongoose;  // ✅ Extract Schema from mongoose

const blogSchema = new Schema({  // ✅ Use Schema instead of mongoose.Schema
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    coverImageURL: {
        type: String,
        required: false,
    },
    createdBy: {
        type: Schema.Types.ObjectId,  // ✅ Now Schema is properly referenced
        ref: "user",
    },
}, { timestamps: true });

const Blog = mongoose.model("blog", blogSchema);
module.exports = Blog;
