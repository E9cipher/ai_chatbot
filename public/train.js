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
    
    // Capitalize function
    function capitalize(val) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }

    // Display responses
    function displayResponses() {
        // responseList.innerHTML = "";
        for (let key in chatbotResponses) {
            const item = document.createElement("tr");
            item.innerHTML = `<td><span>User:</span>${capitalize(key)}</td> <td><span>Bot:</span> ${capitalize(chatbotResponses[key])}</td>`;
            responseList.appendChild(item);
        }
    }

    function displayNew() {
        fetch("responses.json")
            .then(response => response.json())
            .then(data => {
                if (data.length === 0) {
                    console.log("No responses found.");
                    return;
                }
                const lastResponse = data[data.length - 1]; // Get last response
                console.log("Last response:", lastResponse);
    
                // Display it in UI
                const responseList = document.getElementById("response-list");
                if (responseList) {
                    responseList.innerHTML = `<p><strong>${lastResponse.user}</strong>: ${lastResponse.message}</p>`;
                }
            })
            .catch(error => console.error("Error loading responses:", error));
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
        displayNew();

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
