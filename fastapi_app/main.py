import sys
import os
import logging

logging.basicConfig(level=logging.DEBUG)

# Get the absolute path to the root directory of your project
project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

# Add the project root to the Python path
sys.path.insert(0, project_root)

# Now you can use relative imports as before


from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from fastapi_app.MemGPT.main_api import MemGPTChatbot

# import fastapi_app.MemGPT.main_api as main_api
# import fastapi_app.MemGPT.test as test


app = FastAPI()

# Set up CORS to handle requests from your React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/respond")
async def respond(request: Request):
    data = await request.json()
    message = data.get("message", "")
    # Initialize chatbot and process message
    chatbot = MemGPTChatbot()  # Initialize your chatbot here
    logging.debug("About to call the load function.")
    chatbot.load("fred_test.json")
    logging.debug("Successfully called the load function.")
    # Sample conversation
    # messages = ["This is my first time using a react app server."]
    responses = await chatbot.chat([message])
    # print("raw response form fastapi: ", responses)

    response = {
        "text": f"Bot: {responses}",
        "sender": "bot",
    }
    # Save state
    chatbot.save("fred_test.json")
    return JSONResponse(content=response)
