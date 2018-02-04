// for api requests
var rp = require('request-promise');

var TelegramBot = require('node-telegram-bot-api');

// token from BotFather
var token = "522194238:AAHuSyF-9WsgForrV5EzApBltMqP-HXUMfM";

var bot = new TelegramBot(token, opt);

var opt = {
    polling: true
};

// api request options for BTC price
var apiOpt = {
    uri: 'https://api.coinbase.com/v2/prices/spot?currency=USD',
    json: true
}

var checkDate = "/date";
var checkPrice = "/btc";

// listens your messages
bot.on('message', function (msg) {
    if (msg.text.toLowerCase().indexOf(checkDate) === 0) {
        bot.sendMessage(msg.chat.id, "It is " + Date());
    }

    if (msg.text.toLowerCase().indexOf(checkPrice) === 0) {
        rp(apiOpt)
            .then(function (result) {
                bot.sendMessage(msg.chat.id, "It is " + result.data.amount);
            })
            .catch(function (err) {
                console.error("call error: ", err);
            });
    }

    if (msg.text === "hi") {
        bot.sendMessage(msg.chat.id, "Hello!");
    }
})

// listens inline queries, @your_bot_name
bot.on("inline_query", (query) => {
    bot.answerInlineQuery(query.id, [
        {
            type: "article",
            id: "datetest",
            title: "Date",
            input_message_content: {
                message_text: Date()
            }
        }, {
            type: "article",
            id: "test2",
            title: "Select this",
            input_message_content: {
                message_text: "Thx"
            }
        }
    ]);
});