// ১. ছোট হাতের 'const' ব্যবহার করতে হবে
const API_KEY = "AIzaSyD33OAF2CFp6azJoZ4pw9AiHipff5GJcX4"; 

document.getElementById('searchBtn').addEventListener('click', async () => {
    const inputField = document.getElementById('userInput');
    const resultArea = document.getElementById('aiResponse');
    const loader = document.getElementById('loader');
    
    const prompt = inputField.value;

    if (!prompt) {
        alert("দয়া করে কিছু টাইপ করুন!");
        return;
    }

    // স্ক্রিন লোডিং স্টেট দেখানো
    resultArea.style.display = 'none';
    loader.classList.remove('hidden');
    loader.style.display = 'block'; // নিশ্চিত করতে যেন লোডার দেখা যায়
    loader.innerText = "এআই আপনার উত্তরটি তৈরি করছে...";

    try {
        // মডেল হিসেবে gemini-1.5-flash একদম ঠিক আছে
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();
        
        // ২. ডেটা চেক করার লজিক
        if (data.candidates && data.candidates.length > 0 && data.candidates[0].content) {
            const text = data.candidates[0].content.parts[0].text;
            loader.style.display = 'none';
            loader.classList.add('hidden');
            resultArea.style.display = 'block';
            resultArea.innerText = text;
        } else {
            // যদি API থেকে কোনো এরর মেসেজ আসে তা কনসোলে দেখার জন্য
            console.error("API Error Response:", data);
            throw new Error("Invalid Response from API");
        }

    } catch (error) {
        loader.style.display = 'none';
        loader.classList.add('hidden');
        resultArea.style.display = 'block';
        resultArea.innerText = "দুঃখিত, এআই সার্ভারের সাথে সংযোগ করা যাচ্ছে না। আপনার এপিআই কী অথবা ইন্টারনেট কানেকশন চেক করুন।";
        console.error("Error details:", error);
    }
});

