//#include helpers/Debug.js

var hook;
var key;
var discordHook;
var discordKey;

function BotPush(message, disableNotify, guildDiscord) {
    Debug(' Method Entry - BotPush')
    TelegramPost(message, disableNotify)
    DiscordPost(message, guildDiscord)
}
//Create discord.conf in "Orion Launcher" folder
//First Word 1  = Discord hook ID
//single space
//Second Word 2 = API key
function DiscordPost(message, guildDiscord) {
    Debug(' Method Entry - DiscordPost')
    if (discordHook == null && discordKey == null) {
        var file = Orion.NewFile();
        open = file.Open('discordkey.conf');
        if (!file.Opened()) {
            return;
		}
		if(guildDiscord ==true)
			file.ReadLine()
		file.Read()
        discordHook = file.Read();
        discordKey = file.Read();
        file.Close();
    }
    var bot =
        "https://discord.com/api/webhooks/"
        + discordHook
        + "/"
        + discordKey; // Webhook url
    var paramText = "content=" + message;

    Orion.Print(bot)
    Orion.Print(paramText)
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
    BotPush(Player.Name() + ' ' + publishText + ' = ' + reportValue, true)
}