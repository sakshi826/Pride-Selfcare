import dotenv from 'dotenv';
dotenv.config();
const API_KEY = process.env.VITE_GOOGLE_TRANSLATION_API_KEY;

async function test() {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            q: ["Hello world"],
            target: "fr",
            format: 'text'
        })
    });
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
}

test();
