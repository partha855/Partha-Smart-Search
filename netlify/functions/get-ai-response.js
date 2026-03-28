const fetch = require('node-fetch');

exports.handler = async (event) => {
  try {
    const { prompt } = JSON.parse(event.body);
    const API_KEY = process.env.GEMINI_API_KEY; // এটি নেটলিফাই লকার থেকে আসবে

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ text: data.candidates[0].content.parts[0].text })
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: "Failed to fetch AI response" }) };
  }
};

