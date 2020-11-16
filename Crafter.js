//#include Crafting/LumberJack.js
//#include Crafting/Carpentry.js

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

//Opens the carpentry window and created the last item
//Uses a FindList for saws and boards, labelled Carpentry
//WIP// 
function StartCarpentryLoop() {
    CarpentryCreateLoop('Carpentry');
}