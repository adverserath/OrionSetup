//#include helpers/Debug.js

var hook;
var key;

function BotPush(message, disableNotify) {
    Debug(' Method Entry - BotPush')
    TelegramPost(message, disableNotify)
    DiscordPost(message)
}
//Create discord.conf in "Orion Launcher" folder
//First Word 1  = Discord hook ID
//single space
//Second Word 2 = API key
function DiscordPost(message) {
    Debug(' Method Entry - DiscordPost')
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
    Debug(' Method Entry - TelegramPost')
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
    Debug(' Method Entry - NotifySkill')
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


function CountGlobalValue(name, value, publishText, reset) {
    var globalValue = Orion.GetGlobal(name)
    if (globalValue == null || isNaN(globalValue))
        globalValue = '0'
    var reportValue = parseInt(globalValue);
    if (reportValue == null || isNaN(reportValue) || reset)
        reportValue = 0
    reportValue += value
    Orion.SetGlobal(name, reportValue)
    BotPush(publishText + ' = ' + reportValue, true)
}