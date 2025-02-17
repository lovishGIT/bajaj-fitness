import app from './app.js';
import { connectDb } from './config/db.config.js';
import env from './config/validateEnv.config.js';

const PORT = env.PORT || 4000;

await connectDb() && app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});