# AI Chatbot
## Overview
This is an AI Chatbot which you can put in your website. It uses JSON arrays to handle user requests and displays its answers in a custom chatbot container. It has no memory nor the chats are saved.
## Usage
Simple. Just prompt a question and the chatbot will check if it has that answer. If so, he will respond. Else it will display an "I do not understand " message.
## Requirements
You must have the following packages installed so that the project can serve and work properly:

    gcc
    gcc-12
    g++
    build-essential
    libasio-dev
    nlohmann-json3-dev
    cmake
    Crow
and all of the recommended packages from the ones above. Crow must be installed through git as shown below in the installation section.
## Installation (linux)
1. Clone **this** git repo
   
        git clone https://github.com/E9cipher/ai_chatbot.git
   or download the ZIP folder 
2. Clone **Crow** repo

       git cline https://github.com/CrowCpp/Crow.git
3. Run these instructions

       mkdir info 
       mv README.md backend/README.md frontend/README.md info/
       cd ai_chatbot/
       rm -rf build
       mkdir build && cd build
       cmake ../backend
       make
       ./chatbot
   You must make sure you have the requirements shown above. Else, the project won't serve properly. Even though it seems strange, you **must** remove the `build` directory and create it again.
   Exit process with <kbd>Ctrl</kbd> <kbd>C</kbd>.
   **Note:** `make` usually takes time if it's your first installation. To speed this process, instead of running simply `make` run `make -j$(nproc)`. If you do this, note that all processes will freeze completely
4. Open a browser and navigate to `http://localhost:8080/`.

## Modifying Files
For a fast file modifying, I recommend to modify the files **while the server is running**. If you want to modify `server.cpp` you will have to compile everything again

## License
This project has an [Apache 2.0 LICENSE](LICENSE).
