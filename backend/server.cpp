#include "crow.h"
#include <nlohmann/json.hpp>
#include <fstream>
#include <sstream>

using json = nlohmann::json;

// Function to read files from "public" (relative to backend/)
std::string read_file(const std::string& filename) {
    std::ifstream file("../public/" + filename);  // Adjust path
    if (!file) return "File not found";
    std::stringstream buffer;
    buffer << file.rdbuf();
    return buffer.str();
}

int main() {
    crow::SimpleApp app;

    // Serve index.html
    CROW_ROUTE(app, "/")([]() {
        return crow::response{read_file("index.html")};
    });

    // Serve other static files (style.css, chat.js)
    CROW_ROUTE(app, "/<string>")([](std::string filename) {
        return crow::response{read_file(filename)};
    });

    // Chatbot API endpoint
    CROW_ROUTE(app, "/chat").methods(crow::HTTPMethod::Post)
    ([](const crow::request& req) {
        auto body = json::parse(req.body);
        std::string user_message = body["message"];

        std::string bot_reply = "I received: " + user_message;

        json response;
        response["reply"] = bot_reply;

        return crow::response{response.dump()};
    });

    // Start server
    app.port(8080).multithreaded().run();
}
