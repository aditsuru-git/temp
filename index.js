import { GoogleGenerativeAI } from "@google/generative-ai";

// API key
const genAI = new GoogleGenerativeAI("AIzaSyB0WpVeT_lJ5tHGRzESDooyT2cJmi2ByXA");
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: `You are an AI assistant that can call functions when needed. To call a function, respond only with the exact function name. You'll receive the function's result and then can reply in natural language.
Available functions: ['getWeather' , 'getMood' , 'getNews']`,
});

const chat = model.startChat();

function getWeather() {
  return "The weather is sunny";
}

function getMood() {
  return "I am feeling grumpy";
}

function getNews() {
  return "The news for today: trump declared war on the moon";
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
  }
  if (response === "getMood"){
    const moodData = getMood();
    const finalResponse = await chat.sendMessage(`System: ${moodData}`);
    console.log(finalResponse.response.text().trim());
  }
  if (response === "getNews"){
    const newsData = getNews();
    const finalResponse = await chat.sendMessage(`System: ${newsData}`);
    console.log(finalResponse.response.text().trim());
  } else {
    console.log(response);
  }
}




// Start conversation
handleConversation("whats the news for today??");
