import express from 'express';
import { generateIdea } from './openai/ai.js';
import cors from 'cors';

const app = express();
app.use(cors());

app.use(express.json());

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