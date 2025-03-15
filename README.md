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
and all of the recommended packages from the ones above.
## Installation (linux)
1. Clone git repo
   
        git clone https://github.com/E9cipher/ai_chatbot.git
   or download the ZIP folder
3. Navigate to `build/` and:
   
       cd backend
       mkdir build && cd build
       cmake ../backend
       make
       ./chatbot
   You must make sure you have the requirements shown above. Else, the project won't serve properly.
   **Note:** `make` usually takes time if it's your first installation. To speed this process, instead of running simply `make` run `make -j$(nproc)`. If you do this, note that all processes will freeze completely
4. Open a browser and navigate to `http://localhost:8080/`.

## Modifying Files
For a fast file modifying, I recommend to modify the files **while the server is running**. If you want to modify `server.cpp` you will have to compile everything again

## License
This project has a [LICENSE](LICENSE).
