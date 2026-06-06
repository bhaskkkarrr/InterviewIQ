import { OpenRouter } from "@openrouter/sdk";
import config from "../config/config.js";
const client = new OpenRouter({
  apiKey: config.OPEN_ROUTER_API_KEY,
});

export const askAi = async (message) => {
  try {
    if (!message || message.length == 0) {
      return res
        .status(400)
        .json({ success: false, message: "No valid message provided" });
    }
    const response = await client.chat.send(
      {
        chatRequest: {
          model: "openai/gpt-4o-mini",
          messages: message,
        },
      },
      { headers: { "Content-Type": "application/json" } },
    );
    let content = response?.choices[0]?.message?.content;
    content = content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    return content;
  } catch (error) {
    throw new Error(error);
  }
};
