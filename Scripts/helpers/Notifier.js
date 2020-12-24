var hook;
var key;

//Create discord.conf in "Orion Launcher" folder
//First Word 1  = Discord hook ID
//single space
//Second Word 2 = API key
function BotPush(message) {
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
