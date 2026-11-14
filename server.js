import app from './source/app.js';
import connectdb from './source/config/db.js';
import config from './source/config/config.js';

await connectdb();


app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});