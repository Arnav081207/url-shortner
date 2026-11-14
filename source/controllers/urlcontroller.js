
import { nanoid } from "nanoid";
import urlSchem from "../model/url.model.js";
import redisClient from "../client.js";

export async function createShortUrl(req, res) {
    try {
        const { url} = req.body;

        if (!url) {
            return res.status(400).json({
                message: "URL is required"
            });
        }

        const shortid = nanoid(4);

        const newurl = await urlSchem.create({
            originalurl: url,
            shorturl: shortid
        });
        const newurlredis= await redis.set

        return res.status(201).json(newurl);

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export async function redirectUrl(req, res) {
    try {
        const { shortcode } = req.params;

        const url = await urlSchem.findOne({
            shorturl: shortcode
        });

        if (!url) {
            return res.status(404).json({
                message: "Short URL not found"
            });
        }

        url.click += 1;
        await url.save();

        return res.redirect(url.originalurl);

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}
