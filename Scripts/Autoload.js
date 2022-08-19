//#include helpers/Target.js
//#include helpers/Debug.js
//#include helpers/Magic.js
//#include helpers/ItemManager.js
//#include helpers/Notifier.js
//#include helpers/Gumps.js
//#include Bod/Bods.js
//#include ./*.js
//#include Bod/BodData.js
//#include Bod/BodCleaner.js
function test()
{
var bot = '"https://api.telegram.org/bot1741015502:AAF0uGJXxQ15qBHy68sqRQiPBhySUXqYlZ8/sendMessage?chat_id=1656045297&text=Arian%206&disable_notification=false&parse_mode=HTML"'
    Orion.Launch("cmd.exe", ['/c', 'curl '+bot]);



}
function Autostart() {
Orion.Wait(30000)
     //GetBods()
     BotPush(Player.Name() + ' '+ Orion.FindTypeEx('0x2259').length)
     Orion.Wait(2000)
     //EmptyUnusableSmallsOutBODBooks()
       // SortBods()
        Orion.Print('Good Bye')
        Orion.CloseUO();
}

