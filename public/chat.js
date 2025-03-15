document.addEventListener("DOMContentLoaded", function () {
    const chatContainer = document.getElementById("chat-container");
    const chatBtn = document.getElementById("help-btn");
    const chatbox = document.getElementById("chatbox");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
    const closeIcon = document.getElementById("close-icon");
    const typingIndicator = document.getElementById("typing-indicator");
    var def_response = "I'm not sure how to answer that"

    if (!chatContainer || !chatBtn || !chatbox || !userInput || !sendBtn || !typingIndicator) {
        console.error("404 - Element not found!");
        return;
    }

    let chatbotResponses = {}; // Store JSON responses

    // Get JSON responses
    fetch("responses.json")
        .then(response => response.json())
        .then(data => {
            chatbotResponses = data;
        })
        .catch(error => console.error("Error loading chatbot responses:", error));

    // Add message to chatbox
    function addMessage(sender, message) {
        const messageWrap = document.createElement("div");
        messageWrap.classList.add("message-wrap");

        if (sender === "bot") {
            // Create a container for bot message & avatar
            const botMessageWrap = document.createElement("div");
            botMessageWrap.classList.add("bot-msg-wrap");

            // Bot avatar (placed outside green bubble)
            const avatar = document.createElement("img");
            avatar.src = "bot.png";
            avatar.alt = "Bot";
            avatar.classList.add("bot-avatar");

            // Bot message
            const messageElement = document.createElement("div");
            messageElement.classList.add("bot-msg");
            messageElement.textContent = message;

            // Append elements
            botMessageWrap.appendChild(avatar);
            botMessageWrap.appendChild(messageElement);
            messageWrap.appendChild(botMessageWrap);
        } else {
            // User message
            const messageElement = document.createElement("div");
            messageElement.classList.add("user-msg");
            messageElement.textContent = message;
            messageWrap.appendChild(messageElement);
        }

        chatbox.appendChild(messageWrap);
        chatbox.scrollTop = chatbox.scrollHeight; // Auto-scroll
    }

    // Send message on click
    sendBtn.addEventListener("click", function () {
        sendMessage();
    });

    // Send message on Enter
    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    // Process & Reply
    function sendMessage() {
        let userInput2 = userInput.value.trim();
        if (userInput2 === "") return;
    
        userInput.value = ""; // Clear input field
    
        // Display user message
        addMessage("user", userInput2);
    
        // Show typing indicator
        typingIndicator.style.display = "block";
    
        // Simulate chatbot "thinking"
        setTimeout(() => {
            typingIndicator.style.display = "none"; // Hide typing indicator
    
            let botResponse = getBotResponse(userInput2); // Get bot response
            addMessage("bot", botResponse);
    
        }, 1500); // Delay for realism
    }

    // Retrieve bot response
    function getBotResponse(userInput) {
        return chatbotResponses[userInput.toLowerCase()] || def_response;
    }

    // Toggle chat UI
    chatBtn.addEventListener("click", function () {
        chatContainer.classList.toggle("hidden");
    });

    // Close chat UI
    closeIcon.addEventListener("click", function () {
        chatContainer.classList.add("hidden");
    });
});
