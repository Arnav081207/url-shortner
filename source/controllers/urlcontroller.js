
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
        const newurlredis= await redisClient.set(shortid, url);

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

        // Check Redis cache
        let originalUrl = await redisClient.get(shortcode);

        if (!originalUrl) {
            // Cache miss: fetch from MongoDB
            const url = await urlSchem.findOne({
                shorturl: shortcode
            });

            if (!url) {
                return res.status(404).json({
                    message: "Short URL not found"
                });
            }

            originalUrl = url.originalurl;

            
            await redisClient.setEx(
                shortcode,
                3600,
                originalUrl
            );

            url.click += 1;
            await url.save();

        } else {
            // Cache hit: increment clicks in MongoDB
            await urlSchem.updateOne(
                { shorturl: shortcode },
                { $inc: { click: 1 } }
            );
        }

        return res.redirect(originalUrl);

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}
