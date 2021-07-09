var hook;
var key;

function BotPush(message, disableNotify) {
    TelegramPost(message, disableNotify)
    DiscordPost(message)
}
//Create discord.conf in "Orion Launcher" folder
//First Word 1  = Discord hook ID
//single space
//Second Word 2 = API key
function DiscordPost(message) {
    if (hook == null && key == null) {
        var file = Orion.NewFile();
        open = file.Open('discordkey.conf');
        if (!file.Opened()) {
            return;
        }
        hook = file.Read();
        key = file.Read();
        file.Close();
    }
    var bot =
        "https://discordapp.com/api/webhooks/"
        + hook
        + "/"
        + key; // Webhook url
    var paramText = "content=" + message;
    Orion.HttpPost(bot, paramText);
}

//Create telegramkey.conf in "Orion Launcher" folder
//First Word   = first part of key
//single space
//Second Word =  second part of key
//single space
//Third Word =  chat id
function TelegramPost(message, disableNotify) {
    if (disableNotify == null) {
        disableNotify = false;
    }
    if (hook == null && key == null) {
        var file = Orion.NewFile();
        open = file.Open('telegramkey.conf');
        if (!file.Opened()) {
            return;
        }
        hook = file.Read();
        key = file.Read();
        chatId = file.Read();
        file.Close();
    }
    var bot =
        "https://api.telegram.org/bot"
        + hook
        + ":"
        + key
        + '/sendMessage?chat_id=' + chatId + '&text=' + message + '&disable_notification=' + disableNotify + '&parse_mode=HTML'; // Webhook url
    var paramText = '';
    Orion.HttpPost(bot, paramText);
}

var shouldNotify = [];
function NotifySkill(skillName) {
    if (Orion.SkillValue(skillName) % 1 == 0) {

        if (shouldNotify.indexOf(skillName) > -1)
            BotPush(skillName + ' is at ' + Orion.SkillValue(skillName) % 10)
        shouldNotify = shouldNotify.filter(function (skill) {
            return skill != skillName
        })
    }
    else {
        shouldNotify.push(skillName)

    }
}
