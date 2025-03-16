document.addEventListener("DOMContentLoaded", function () {
    const trainForm = document.getElementById("train-form");
    const userInput = document.getElementById("train-user-input");
    const botResponse = document.getElementById("train-bot-response");
    const trainButton = document.getElementById("train-btn");
    const responseList = document.getElementById("response-list");

    let chatbotResponses = {};

    // Load training data
    fetch("responses.json")
        .then(response => response.json())
        .then(data => {
            chatbotResponses = data;
            displayResponses(); // Show data
        })
        .catch(error => console.error("Error loading chatbot responses:", error));

    // Display responses
    function displayResponses() {
        responseList.innerHTML = "";
        for (let key in chatbotResponses) {
            const item = document.createElement("li");
            item.innerHTML = `<span id="user-text text">User:</span> <span class="user-ansr answer">"${key}"</span> → <span id="bot-text text">Bot:</span> <span id="bot-ansr answer">"${chatbotResponses[key]}"</span>`;
            responseList.appendChild(item);
        }
    }

    // Handle form
    trainButton.addEventListener("click", function () {
        let userText = userInput.value.trim().toLowerCase();
        let botText = botResponse.value.trim();

        if (userText === "" || botText === "") {
            alert("Both fields are required.");
            return;
        }

        // Update responses.json
        chatbotResponses[userText] = botText;
        displayResponses();

        // Send to php
        fetch("php/save_responses.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(chatbotResponses),
        })
            .then(response => response.text())
            .then(data => console.log("Training data saved:", data))
            .catch(error => console.error("Error saving data:", error));

        // Clear inputs
        userInput.value = "";
        botResponse.value = "";
    });
});
