import express from 'express';
import { generateIdea } from './openai/ai.js';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

const app = express();
const option = {
    windowMs: 60 * 1000,
    max: 100,
    message: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.',
    standarHeaders: true,
    legacyHeaders: false
};
const limiter = rateLimit(option);

app.use(cors());
app.use(express.json());
app.use(limiter);

app.post('/api/v1/generate', async (req, res) => {
    const { prompt, count } = req.body;
    if (prompt === undefined || count === undefined) {
        res.status(400).send({
            message: '입력값이 올바르지 않습니다.'
        });
        return;
    }
    try {
        const result = await generateIdea(prompt, count);
        res.send(result);
    } catch (error) {
        console.log(error)
        res.status(204).send({
            message: '오류가 발생했습니다. 다시 시도해주세요.',
        });
    }
});

const port = 3030;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});