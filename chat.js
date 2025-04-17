document.addEventListener("DOMContentLoaded", function () {
    const oldChatbotResponses = {
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
    const chatbotResponses = {
        "bonjour": "Bonjour! Comment ça va?",
        "matin": "Bien sûr, cliquez <a href='#morning' id='morning_a'>ici</a>"
    };    
    const chatContainer = document.getElementById("chat-container");
    const chatBtn = document.getElementById("help-btn");
    const chatbox = document.getElementById("chatbox");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
    const closeIcon = document.getElementById("close-icon");
    const typingIndicator = document.getElementById("typing-indicator");
    var def_response = "I'm not sure how to answer that";

    if (!chatContainer || !chatBtn || !chatbox || !userInput || !sendBtn || !typingIndicator) {
        console.error("404 - Element not found!");
        return;
    }

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
            messageElement.innerHTML = message;

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
