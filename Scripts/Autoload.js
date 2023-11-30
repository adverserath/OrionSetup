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
//#include Bod/CoinToss.js

function FindCorruption() {
  while (true) {
    Orion.Wait(1000)
    WalkTo(Orion.FindTypeEx('0x468A', any, ground, 'item', 24)[0])
  }
}

function A_UDPLogout() {
  Orion.UdpSend('192.168.0.2', 40001, 'logout')
  Orion.Wait(100)
  Orion.UdpSend('192.168.0.2', 40002, 'logout')
  Orion.Wait(100)
  Orion.UdpSend('192.168.0.2', 40003, 'logout')
}

function Autostart() {
  // Orion.ToggleScript('Alarm')
  //GetBods()
  Orion.Wait(3000)
  //EmptyUnusableSmallsOutBODBooks()
  //MoveBodsToBooks()
  //Orion.Print('Good Bye')
  //Orion.CloseUO();
  TossACoin()
  //Orion.PauseScript()
  Login()
}

function Login() {
  var names0 = ['Xero']
  var names1 = ['El', 'Skilles']
  var names2 = ['Aki', 'Nyll']
  var names3 = ['Epar Esra', 'Columbo', 'Juice', 'Crian', 'Drian', 'Erian', 'Frian']

  CheckAccount(names0)
  CheckAccount(names1)
  CheckAccount(names2)
  CheckAccount(names3)

}

function CheckAccount(names) {
  if (names.indexOf(Player.Name()) == -1) {
    Orion.Print('f' + names)
    return
  }
  Orion.Print('s:' + names)
  for (i = 0; i < names.length; i++) {
    if (names[names.length - 1] == Player.Name()) {
      Orion.Wait(1000)
      Orion.ShowJournal()
      Orion.CloseUO()
    }

    if (names[i] == Player.Name()) {
      Orion.Wait(1000)

      BotPush('Switching to ' + names[(i + 1)], true)
      Orion.Relogin(names[(i + 1)])
      break;
    }
  }
}

function ShowArrowOnMap() {
  while (true) {
    Orion.Wait(500)
    Orion.SetWorldMapPointerPosition(Orion.QuestArrowPosition().X(), Orion.QuestArrowPosition().Y());
  }
}
function AnnounceOrcs() {
  var x = Player.X() - Orion.QuestArrowPosition().X()
  var y = Player.Y() - Orion.QuestArrowPosition().Y()
  var vDirect = " North"
  var hDirect = " West"
  if (y < 0) {
    vDirect = " South"
  }
  if (x < 0) {
    hDirect = " East"
  }

  Orion.SayParty('Orcs Spotted: ' + Math.abs(x) + hDirect + '  :  ' + Math.abs(y) + vDirect)
  Orion.SetWorldMapPointerPosition(Orion.QuestArrowPosition().X(), Orion.QuestArrowPosition().Y());

}

function Alarm() {
  while (true) {
    Orion.Wait(1000)
    var npc = Orion.FindTypeEx(any, any, ground,
      'mobile', 20, any).filter(function (mob) {
        return mob.Name() === 'Dan'
      })
    if (npc.length > 0) {
      BotPush('Detected : ' + npc.Name() + ' for ' + Player.Name())
      Orion.Wait(10000)
    }
  }
}

function UDPSignout() {
  Orion.RemoveAllUdpServers();
  var port = 40001

  for (var index = port; index < port + 3; index++) {
    var created = CreateUDPListener(port)
    if (created == 0) {
      Orion.Print('UDP server created and listening port: ' + port);
    }
    break;
  }

  Orion.SetUdpServerCallback(Player.Name(), 'Signout');
}
function Signout() {
  Orion.Logout()
}

function CreateUDPListener(port) {
  return Orion.CreateUdpServer(Player.Name(), '127.0.0.1', port);
}