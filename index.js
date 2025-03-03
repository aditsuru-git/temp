import { GoogleGenerativeAI } from "@google/generative-ai";

// API key
const genAI = new GoogleGenerativeAI("AIzaSyCphcRDnnKEa9PD_uO5gpNOYZOTlzHUKFs");
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: `You are an AI assistant that can call functions when needed. To call a function, respond only with the exact function name. You'll receive the function's result and then can reply in natural language.
  Available functions: ['getWeather']`, //Add the new function in this array
});

const chat = model.startChat();

function getWeather() {
  return "The weather is sunny";
}

//Write your new functions here...

async function handleConversation(userMessage) {
  const result = await chat.sendMessage(userMessage);
  const response = result.response.text().trim();

  //Duplicate the if block with the new function
  if (response === "getWeather") {
    const weatherData = getWeather();
    const finalResponse = await chat.sendMessage(`System: ${weatherData}`);
    console.log(finalResponse.response.text().trim());
  } else {
    console.log(response);
  }
}

// Start conversation
handleConversation("Hows the weather?");
