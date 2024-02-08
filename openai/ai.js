import config from '../config/config.js';
import openai from './openai.js';

export async function generateIdea(prompt, count) {
    const completion = await openai.chat.completions.create({
        messages: [
            {role: "system", content: "키워드 추천 인공지능"},
            {role: 'user', content: `${prompt} 키워드 ${count}가지`}
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
