
export const handler = async (event) => {
  const token = process.env.BOT_TOKEN;
  const gameUrl = process.env.WEBAPP_URL;

  if (!token || !gameUrl) {
    return {
      statusCode: 500,
      body: "Missing bot settings"
    };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 200, body: "Bot is running!" };
  }

  const update = JSON.parse(event.body || "{}");
  const message = update.message;

  if (message?.text?.startsWith("/start")) {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: message.chat.id,
        text: "Добро пожаловать в Subway Runner 3D! 🚇",
        reply_markup: {
          inline_keyboard: [[
            {
              text: "🎮 ИГРАТЬ",
              web_app: { url: gameUrl }
            }
          ]]
        }
      })
    });
  }

  return { statusCode: 200, body: "OK" };
};
