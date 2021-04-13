//#include Scripts/helpers/Debug.js
//#include Scripts/helpers/Target.js

function myFunction() {
  var luck = parseInt("1000");
  var fame = parseInt("2000");
  var famemod = (0.83 - Math.round(Math.log(Math.round(fame / 6000, 3) + 0.001, 10), 3))
var max = 100 * famemod
var luckmod = (100 - Math.sqrt(luck))
var max2 = Math.max(10, max)
var divider = max2 * luckmod / 100.0;
var chance = 1 / divider;  document.getElementById("demo").innerHTML = 'famemod: '+famemod + '<br> luckmod: ' + luckmod  + '<br> max2: ' + max2+ '<br> chance: ' + chance*100
}

function simpleJSONstringify() {
  var obj = SelectTarget().Properties;
  var prop, str, val,
      isArray = obj instanceof Array;

  if (typeof obj !== "object") return false;

  str = isArray ? "[" : "{";

  function quote(str) {
      if (typeof str !== "string") str = str.toString();
      return str.match(/^\".*\"$/) ? str : '"' + str.replace(/"/g, '\\"') + '"'
  }

  for (prop in obj) {
      if (!isArray) {
          // quote property
          str += quote(prop) + ": ";
      }

      // quote value
      val = obj[prop];
      str += typeof val === "object" ? simpleJSONstringify(val) : quote(val);
      str += ", ";
  }

  // Remove last colon, close bracket
  str = str.substr(0, str.length - 2)  + ( isArray ? "]" : "}" );

  TextWindow.Print(str);
}

function openCorpse() {
  Orion.OpenContainer('0x4205AD94');
}


function NotEnoughResourcesGump() {
  TextWindow.Open();
  var output = Orion.GetLastGump();//.foreach(function (cmd){
  var value = output.CommandList().filter(function (text) {
    TextWindow.Print(text.search('1044155|1044154'));

    return text.search('1044155|1044154') >= 0;

  })
  TextWindow.Print(value);

}

function GumpText() {
  var output = Orion.GetLastGump();//.foreach(function (cmd){
  TextWindow.Open();
  TextWindow.Print(output.EntriesList());


}

var debug = true;

function GetTargetAndPrint() {
  TextWindow.Open();

  var obj = SelectTarget();
  //  Orion.GetProfile('myTarget',2000)
  TextWindow.Print(obj.Name());
  TextWindow.Print(obj.FullName());
  TextWindow.Print(obj.Notoriety());
  TextWindow.Print('player' + obj.IsPlayer());
  TextWindow.Print('color' + obj.NameColor());

  TextWindow.Print('yellow' + obj.YellowHits());

  TextWindow.Print(obj.Race());
  TextWindow.Print(obj.ProfileReceived());
  TextWindow.Print(obj.Flags());
  TextWindow.Print(obj.IgnoreCharacters());
  TextWindow.Print(obj.NameColor());
  TextWindow.Print(('' + obj.Title()).substr(0, 3));
}

function getFlags() {
  var a = Orion.InfoContextMenu()
  TextWindow.Print(a.trim());


}

function getTileData() {
  Orion.WaitForAddObject('myTarget');
  Orion.TargetObject('myTarget');
  var target = Orion.FindObject('myTarget');

  var tiles = Orion.GetTiles('land', Player.X(), Player.Y(), 0, 100);
  TextWindow.Print('tile' + tiles.length);
  TextWindow.Print('tile' + tiles[0].Z());
}

function test() {

  TextWindow.Open();
  while (!Player.Dead()) {

    Orion.InfoContextMenu();


    Orion.Wait(500);
  }
}

function getPeople() {
  Orion.FindTypeEx(any, any, ground, 'human|live|ignoreself|ignorefriends', 20, 7)
    .foreach(function (mob) {
      TextWindow.Print(mob.Name());
    });
}

function sell() {
  Orion.Buy('bInscribe');
}
//    Orion.WaitForAddObject('myTarget');
//    var enemy = Orion.TargetObject('myTarget');
//var enemy = Orion.FindEnemy();
//Orion.Print(enemy);
//Orion.ShowStatusbar(Orion.FindEnemy('next'), 1000, 1000);
//Orion.FindList('listName', 'container', 'mobile', '10');
//Orion.Print(Orion.FindList('listName', 'container', 'mobile', '10'));

