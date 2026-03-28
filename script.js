document.getElementById('searchBtn').addEventListener('click', async () => {
    const prompt = document.getElementById('userInput').value.trim();
    const responseArea = document.getElementById('aiResponse');
    const loader = document.getElementById('loader');

    if (!prompt) {
        alert("দয়া করে কিছু লিখুন!");
        return;
    }

    responseArea.innerText = "";
    loader.style.display = "block";

    try {
        const response = await fetch('/.netlify/functions/get-ai-response', {
            method: 'POST',
            body: JSON.stringify({ prompt: prompt })
        });

        const data = await response.json();
        loader.style.display = "none";
        responseArea.innerText = data.text;
    } catch (error) {
        loader.style.display = "none";
        responseArea.innerText = "সার্ভার সমস্যা, আবার চেষ্টা করুন।";
    }
});

