const API_KEY = "AIzaSyDN8qTuT9-APsLjjdSqj_3YPAhPVTMYVbw"; 

document.getElementById('searchBtn').addEventListener('click', async () => {
    const inputField = document.getElementById('userInput');
    const responseArea = document.getElementById('aiResponse');
    const loader = document.getElementById('loader');
    
    const prompt = inputField.value.trim();

    if (!prompt) {
        alert("দয়া করে কিছু টাইপ করুন!");
        return;
    }

    // লোডার দেখানো এবং আগের উত্তর মোছা
    responseArea.innerText = ""; 
    loader.classList.remove('hidden');
    loader.style.display = "block";

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();
        
        loader.style.display = "none";
        loader.classList.add('hidden');

        if (data.candidates && data.candidates.length > 0) {
            const text = data.candidates[0].content.parts[0].text;
            responseArea.innerText = text;
        } else {
            responseArea.innerText = "দুঃখিত, এআই কোনো উত্তর দিতে পারছে না। আপনার API Key চেক করুন।";
            console.error("API Error:", data);
        }

    } catch (error) {
        loader.style.display = "none";
        loader.classList.add('hidden');
        responseArea.innerText = "সার্ভারের সাথে সংযোগ করা যাচ্ছে না। দয়া করে আবার চেষ্টা করুন।";
        console.error("Error:", error);
    }
});

