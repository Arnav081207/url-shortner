import express from 'express';
import router from './routes/route.js';

const app = express();

app.use(express.json());

app.use('/arnav', router);

app.get('/', (req, res) => {
    res.send("URL Shortener server is working!");
});

export default app;