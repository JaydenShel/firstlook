import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import analyzeRoute from './routes/analyze.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/analyze', analyzeRoute);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const staticPath = path.join(__dirname, '../client/dist');
console.log('Serving static from:', staticPath);
app.use(express.static(staticPath));

app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
