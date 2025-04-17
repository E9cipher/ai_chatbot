document.addEventListener("DOMContentLoaded", function () {
    const trainForm = document.getElementById("train-form");
    const userInput = document.getElementById("train-user-input");
    const botResponse = document.getElementById("train-bot-response");
    const trainButton = document.getElementById("train-btn");
    const responseList = document.getElementById("response-list");

    const chatbotResponses = {
        "hello": "Hi there! How can I help you today?",
        "how are you": "I'm just a bot, but I'm doing great! Thanks for asking.",
        "contact": "You can contact us at johndoe@example.com.",
        "information": "We provide AI chatbot services. Let me know how I can assist you!",
        "what's your name": "I do not have a name but you can call me Chatbot.",
        "bye": "Goodbye!",
        "hi": "Hello there! What's the matter today?",
        "how are you doing": "Good",
        "how much is 2 plus 2?": "It's 4",
        "good afternoon": "Same here! How can I help you?"
    };
    displayResponses();

    // Load existing training data
    // No data because fetching is not working on local files
    // fetch("responses.json")
    //     .then(response => response.json())
    //     .then(data => {
    //         chatbotResponses = data;
    //         displayResponses(); // Show data
    //     })
    //     .catch(error => console.error("Error loading chatbot responses:", error));

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
