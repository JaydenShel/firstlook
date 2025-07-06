import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import analyzeRoute from './routes/analyze.js';

import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/analyze', analyzeRoute);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
