var hook;
var key;
function callBot() {
    BotPush("hey");
}
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