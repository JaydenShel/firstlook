import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import analyzeRoute from './routes/analyze.js';

dotenv.config();

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use('/analyze', analyzeRoute);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
