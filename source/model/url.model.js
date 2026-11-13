
import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
    {
        shorturl: {
            type: String,
            required: true,
            unique: true
        },

        originalurl: {
            type: String,
            required: true
        },

        click: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

const urlSchem = mongoose.model("Url", urlSchema);

export default urlSchem;
