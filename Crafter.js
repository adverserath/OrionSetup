//#include Scripts/helpers/Target.js
//#include Scripts/helpers/Debug.js
//#include Scripts/helpers/Magic.js
//#include Scripts/Crafting/LumberJack.js
//#include Scripts/Crafting/Miner.js
//#include Scripts/Crafting/Carpentry.js
//#include Scripts/helpers/ItemManager.js
//#include Scripts/helpers/Notifier.js


//Cut trees within a defined range of Player.
//Once all trees are cut in the grid, the script will terminate!
//THIS IS NOT INTENDED FOR AFK USAGE
//On Start - select storage and runes to recall
//Press Escape to use values from the last run
//Go into war mode to pause the script if you need to fight anything
//All axes are detected automatically.
function StartLumberJacking() {
    //Use Mark and Recall spells to move to storage and back to last location
    //Otherwise it will use Orions WalkTo functionality
    var useMagicToMove = true;

    //How far to look for trees from the player
    var range = 20;
    AutoLumberJack(useMagicToMove, range);
}

function StartMining() {
    //Use Mark and Recall spells to move to storage and back to last location
    //Otherwise it will use Orions WalkTo functionality
    var useMagicToMove = true;

    //How far to look for trees from the player
    var range = 20;
    AutoMiner(useMagicToMove, range);
}

//Opens the carpentry window and created the last item
//Uses a FindList for saws and boards, labelled Carpentry
//WIP// 
function StartCarpentryLoop() {
    CarpentryCreateLoop('Carpentry');
}

function RestackContainerItems() {
Orion.Print('Select the container you would like to sort');
var container = SelectTarget();
MoveItems(container,container,'any','any');
}