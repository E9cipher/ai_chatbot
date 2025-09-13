const enResponses = {
    greetings: {
      inputs: ["hello", "hi", "good afternoon", "good morning", "hey"],
      responses: [
        "Hi there! How can I help you today?",
        "Hello there! What's the matter today?",
        "Same here! How can I help you?"
      ]
    },
    feelings: {
      inputs: ["how are you", "how are you doing"],
      responses: [
        "I'm just a bot, but I'm doing great! Thanks for asking.",
        "Good"
      ]
    },
    contact: {
      inputs: ["contact"],
      responses: [
        "You can contact us at johndoe@example.com."
      ]
    },
    information: {
      inputs: ["information"],
      responses: [
        "We provide AI chatbot services. Let me know how I can assist you!"
      ]
    },
    identity: {
      inputs: ["what's your name"],
      responses: [
        "I do not have a name but you can call me Chatbot."
      ]
    },
    math: {
      inputs: ["how much is 2 plus 2?"],
      responses: [
        "It's 4"
      ]
    },
    farewell: {
      inputs: ["bye", "goodbye", "good bye", "see you", "see ya", "see ya later", "see you later"],
      responses: [
        "Goodbye!"
      ]
    }
};

const frResponses = {
    greetings: {
      inputs: ["bonjour", "bien"],
      responses: [
        "Bonjour! Comment ça va?",
        "Même chose ici! Comment peux-je t'aider?"
      ]
    },
    identity: {
      inputs: ["comment tu t'apelles"],
      responses: [
        "Je n'ai pas un nom mais tu me peux apeller \"Chatbot\"."
      ]
    },
    help: {
      inputs: ["aide"],
      responses: [
        "Quel type d'aide as-tu besoin?"
      ]
    },
    sections: {
      inputs: ["section 1", "section 2", "section 3", "section 4"],
      responses: [
        "Bien sûr, cliquez <a href='#sect1' id='sect1_a'>ici</a>.",
        "Pas de problème! Cliquez <a href='#sect2' id='sect2_a'>ici</a>.",
        "Absolutement! Cliquez <a href='#afternoon' id='sect3_a'>ici</a>.",
        "Oui! Cliquez <a href='#sect4' id='sect4_a'>ici</a>."
      ]
    },
    thanks: {
      inputs: ["merci"],
      responses: [
        "De rien! Hereux d'avoir aider!"
      ]
    }
};
  
const data = {
    english: enResponses,
    french: frResponses
    /*spanish: esResponses,
    catalan: caResponses*/
};