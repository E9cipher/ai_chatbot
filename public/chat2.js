document.addEventListener("DOMContentLoaded", function () {
    const chatbox = document.getElementById("chatbox");
    const chatInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-btn");
    
    function appendMessage(sender, text) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", sender);
        messageElement.textContent = text;
        chatbox.appendChild(messageElement);
        chatbox.scrollTop = chatbox.scrollHeight;
    }

    sendButton.addEventListener("click", function () {
        const userMessage = chatInput.value.trim();
        if (userMessage === "") return;
        
        appendMessage("user", userMessage);
        chatInput.value = "";

        fetch("http://localhost:8080/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage })
        })
        .then(response => response.json())
        .then(data => appendMessage("bot", data.reply))
        .catch(error => appendMessage("bot", "Error: Could not connect to server."));
    });

    chatInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") sendButton.click();
    });
});
