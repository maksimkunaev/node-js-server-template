require('dotenv').config()

const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_BOT_TOKEN;;
const bot = new TelegramBot(token, { polling: true });

async function sendMessage(TELEGRAM_CHAT_ID, { rate, text, gaGlobal }) {
  bot.sendMessage(TELEGRAM_CHAT_ID, `Received new feedback. Rate: ${rate}, Text: ${text}, gaGlobal: ${gaGlobal}`);
}

module.exports = {
  sendMessage
};