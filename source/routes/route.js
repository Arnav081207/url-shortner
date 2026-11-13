import {Router} from 'express';
import {createShortUrl,redirectUrl} from '../controllers/urlController.js';
const router = Router();

router.post("/short",createShortUrl);
router.get("/:shortcode",redirectUrl);

export default router;