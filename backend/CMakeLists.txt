cmake_minimum_required(VERSION 3.15)
project(ChatbotServer)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED True)

# Find Asio
find_path(ASIO_INCLUDE_DIR asio.hpp PATHS /usr/include /usr/local/include)

if (NOT ASIO_INCLUDE_DIR)
    message(FATAL_ERROR "Asio not found. Install with: sudo apt install libasio-dev")
endif()

# Add the server
add_executable(chatbot server.cpp)

# Include Asio headers
target_include_directories(chatbot PRIVATE ${ASIO_INCLUDE_DIR})
