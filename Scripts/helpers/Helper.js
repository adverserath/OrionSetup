function SelectTarget() {
  Orion.WaitForAddObject('myTarget');
  Orion.TargetObject('myTarget');
  return Orion.FindObject('myTarget');
}