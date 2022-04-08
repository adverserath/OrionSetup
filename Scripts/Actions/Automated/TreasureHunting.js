function PrintArrow() {
  while (true) {
    Orion.Wait(2000)
    Orion.Print(Orion.QuestArrowPosition().X() + "  " + Orion.QuestArrowPosition().Y())
    Orion.Print('Distance: ' + Orion.GetDistance(Orion.QuestArrowPosition().X(), Orion.QuestArrowPosition().Y()))
  }
}

function WalkToArrow()
{
WalkTo(Orion.QuestArrowPosition())
}

//#include helpers/Target.js
//#include helpers/ItemManager.js
//#include helpers/Notifier.js
//#include helpers/Debug.js