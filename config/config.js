import dotenv from 'dotenv';
dotenv.config();

const config = {
    openai: {
        apiKey: process.env.OPENAI_API_KEY,
        ideaModel: process.env.OPENAI_IDEA_MODEL
    }
};

export default config;