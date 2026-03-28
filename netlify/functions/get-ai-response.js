exports.handler = async (event) => {
  try {
    const { prompt } = JSON.parse(event.body);
    const API_KEY = process.env.GEMINI_API_KEY;

    // স্ট্যাবল ভার্সন v1 এবং flash-latest ব্যবহার করা হয়েছে
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();
    
    // API থেকে কোনো এরর আসলে তা হ্যান্ডেল করা
    if (data.error) {
       return { 
         statusCode: 500, 
         body: JSON.stringify({ text: "API Error: " + data.error.message }) 
       };
    }

    // রেসপন্স ঠিকঠাক থাকলে ডাটা পাঠানো
    return {
      statusCode: 200,
      body: JSON.stringify({ text: data.candidates[0].content.parts[0].text })
    };

  } catch (error) {
    return { 
      statusCode: 500, 
      body: JSON.stringify({ text: "সার্ভার সমস্যা: " + error.message }) 
    };
  }
};
