document.addEventListener("DOMContentLoaded", function () {
    const trainForm = document.getElementById("train-form");
    const userInput = document.getElementById("train-user-input");
    const botResponse = document.getElementById("train-bot-response");
    const trainButton = document.getElementById("train-btn");
    const responseList = document.getElementById("response-list");

    let chatbotResponses = {};

    // Load existing training data
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

    // Display all responses
    function displayResponses() {
        responseList.innerHTML = ""; // Clear before displaying
        for (let key in chatbotResponses) {
            const item = document.createElement("tr");
            item.innerHTML = `<td><span>User:</span> ${capitalize(key)}</td> <td><span>Bot:</span> ${capitalize(chatbotResponses[key])}</td>`;
            responseList.appendChild(item);
        }
    }

    // Display only the last added response
    function displayNew(user, bot) {
        const item = document.createElement("tr");
        item.innerHTML = `<td><span>User:</span> ${capitalize(user)}</td> <td><span>Bot:</span> ${capitalize(bot)}</td>`;
        responseList.appendChild(item);
    }

    // Handle form submission
    trainButton.addEventListener("click", function () {
        let userText = userInput.value.trim().toLowerCase();
        let botText = botResponse.value.trim();

        if (userText === "" || botText === "") {
            alert("Both fields are required.");
            return;
        }

        // Update chatbotResponses without replacing existing ones
        chatbotResponses[userText] = botText;
        displayNew(userText, botText);

        // Send updated JSON to PHP for saving
        fetch("/ai_chatbot/public/save_responses.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(chatbotResponses),
        })
        .then(response => response.text())
        .then(data => {
            console.log("Server Response:", data);
            if (data.includes("SUCCESS")) {
                console.log("✅ Data saved successfully!");
            } else {
                console.error("❌ ERROR: PHP did not return success.");
            }
        })
        .catch(error => console.error("❌ Fetch error:", error));

        // Clear input fields
        userInput.value = "";
        botResponse.value = "";
    });
});
