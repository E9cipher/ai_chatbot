document.addEventListener("DOMContentLoaded", function () {
    const chatContainer = document.getElementById("chat-container");
    const chatBtn = document.getElementById("help-btn");
    const chatbox = document.getElementById("chatbox");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
    const closeIcon = document.getElementById("close-icon");
    const typingIndicator = document.getElementById("typing-indicator");
    const tooltip = document.getElementById("chat-tooltip");

    let chatbotResponses = {};
    let selectedLang = null;
    let hasGreeted = false;
    let tooltipShown = false;

    const def_response = {
        english: "I'm not sure I understand that 🤔",
        french: "Je ne comprends pas. Appuyez sur «aide» pour obtenir une liste de commandes"
    };

    // Language selection
    document.getElementById("btn-en").addEventListener("click", () => selectLanguage("english"));
    document.getElementById("btn-fr").addEventListener("click", () => selectLanguage("french"));

    function selectLanguage(lang) {
        selectedLang = lang;
        chatbotResponses = data[lang];
        document.getElementById("language-select").style.display = "none";
        addMessage("bot", lang === "english" ? "Language set to English!" : "Langue définie sur le français !");
        greet();
    }

    // Tooltip
    document.getElementById("close-tooltip-btn").addEventListener("click", () => {
        tooltipShown = true;
        tooltip.classList.add("hidden");
    });

    window.onscroll = function () {
        if (tooltipShown) return;
        tooltipShown = true;
        tooltip.classList.remove("hidden");
        setTimeout(() => tooltip.classList.add("hidden"), 5000);
    };

    // Greeting
    function greet () {
        if (!hasGreeted && selectedLang) {
            setTimeout(() => {
                addMessage("bot", selectedLang === "english"
                    ? "Hi 👋! How can I help you today?"
                    : "Bonjour 👋! Est-ce que peux-je t'aider?");
                hasGreeted = true;
            }, 800);
        }
    }

    chatBtn.addEventListener("click", function () {
        chatContainer.classList.toggle("hidden");
        tooltip.classList.add('hidden');
        }
    );

    // Normalize user input
    function normalize(input) {
        return input.toLowerCase().replace(/[!?.,;:()\[\]'"`]/g, "").trim();
    }

    // Add message
    function addMessage(sender, message) {
        const messageWrap = document.createElement("div");
        messageWrap.classList.add("message-wrap");

        if (sender === "bot") {
            const botMessageWrap = document.createElement("div");
            botMessageWrap.classList.add("bot-msg-wrap");

            const avatar = document.createElement("img");
            avatar.src = "bot.png";
            avatar.alt = "Bot";
            avatar.classList.add("bot-avatar");

            const messageElement = document.createElement("div");
            messageElement.classList.add("bot-msg");
            messageElement.innerHTML = message;

            botMessageWrap.appendChild(avatar);
            botMessageWrap.appendChild(messageElement);
            messageWrap.appendChild(botMessageWrap);
        } else {
            const messageElement = document.createElement("div");
            messageElement.classList.add("user-msg");
            messageElement.textContent = message;
            messageWrap.appendChild(messageElement);
        }

        chatbox.appendChild(messageWrap);
        chatbox.scrollTop = chatbox.scrollHeight;
    }

    // Message events
    sendBtn.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") sendMessage();
    });

    function sendMessage() {
        const userMsg = userInput.value.trim();
        if (userMsg === "") return;

        addMessage("user", userMsg);
        userInput.value = "";
        typingIndicator.style.display = "block";

        setTimeout(() => {
            typingIndicator.style.display = "none";
            const botResponse = getBotResponse(normalize(userMsg));
            addMessage("bot", botResponse);
        }, 1500);
    }

    function getBotResponse(cleanedInput) {
        if (!selectedLang) return "Please select a language first. 🇬🇧🇫🇷";
    
        for (let intent in chatbotResponses) {
            const inputs = chatbotResponses[intent].inputs;
            const responses = chatbotResponses[intent].responses;
    
            const index = inputs.indexOf(cleanedInput);
            if (index !== -1) {
                if (responses[index]) {
                    return responses[index];
                } else {
                    // No matching
                    return responses[Math.floor(Math.random() * responses.length)];
                }
            }
        }
    
        return def_response[selectedLang] || "Error";
    }    

    // Close chat
    closeIcon.addEventListener("click", function () {
        chatContainer.classList.add("hidden");
    });
});