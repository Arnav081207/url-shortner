
import { nanoid } from "nanoid";
import urlSchem from "../model/url.model.js";
import redisClient from "../client.js";

// CREATE SHORT URL
export async function createShortUrl(req, res) {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({
                message: "URL is required"
            });
        }

        const shortid = nanoid(7);

        // Save in MongoDB
        const newurl = await urlSchem.create({
            originalurl: url,
            shorturl: shortid
        });

        // Save in Redis for 1 hour
        await redisClient.setEx(
            shortid,
            3600,
            url
        );

        return res.status(201).json({
            message: "Short URL created successfully",
            data: newurl
        });

    } catch (error) {
        console.error("Create URL Error:", error);

        return res.status(500).json({
            message: error.message
        });
    }
}


// REDIRECT SHORT URL
export async function redirectUrl(req, res) {
    try {
        const { shortcode } = req.params;

        if (!shortcode) {
            return res.status(400).json({
                message: "Shortcode is required"
            });
        }

        // Check Redis first
        let originalUrl = await redisClient.get(shortcode);

        if (originalUrl) {
            console.log("Redis Cache HIT:", shortcode);
        } else {
            console.log("Redis Cache MISS:", shortcode);

            // Fetch from MongoDB
            const url = await urlSchem.findOne({
                shorturl: shortcode
            });

            if (!url) {
                return res.status(404).json({
                    message: "Short URL not found"
                });
            }

            originalUrl = url.originalurl;

            // Store in Redis for 1 hour
            await redisClient.setEx(
                shortcode,
                3600,
                originalUrl
            );
        }

        // Increment click count for every redirect
        await urlSchem.updateOne(
            { shorturl: shortcode },
            { $inc: { click: 1 } }
        );

        // Redirect to original URL
        return res.redirect(originalUrl);

    } catch (error) {
        console.error("Redirect Error:", error);

        return res.status(500).json({
            message: error.message
        });
    }
}
