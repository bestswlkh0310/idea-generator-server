import config from '../config/config.js';
import openai from './openai.js';

export async function generateIdea(prompt, count) {
    const completion = await openai.chat.completions.create({
        messages: [
            {role: "system", content: "관련된 단어를 말해주는 인공지능"},
            {role: 'user', content: `${prompt}`}
        ],
        model: config.openai.ideaModel
    });

    const message = completion.choices[0].message;
    const content = message.content;
    console.debug(content);

    const arr = JSON.parse(content.replace(/'/g, '"'));
    console.debug(arr);
    return arr
}

export async function justGpt(prompt) {
    const completion = await openai.chat.completions.create({
        messages: [
            {role: "system", content: "아이디어에 대해 조언해주는 인공지능"},
            {role: 'user', content: `${prompt}`}
        ],
        model: 'gpt-3.5-turbo'
    });

    const message = completion.choices[0].message;
    const content = message.content;
    console.debug(content);

    return content
}