//#include helpers/Target.js
//#include helpers/Debug.js
function PotionGround() {
	var t = SelectTarget()
	Orion.ShowJournal()
	Orion.UseFromGround('0x0F0D')
	if (Orion.WaitForTarget(1000))
		Orion.TargetObject(t.Serial());
}

function MultiThrow() {
	var potions = Orion.FindTypeEx('0x0F0D', any, backpack, 2)
	if (potions.length > 1) {
		var pot1 = potions[0]
		var pot2 = potions[1]
		Orion.UseObject(pot1.Serial())
		Orion.InterruptCast()
		Orion.Wait(800)
		Orion.UseObject(pot2.Serial())
		Orion.InterruptCast()
		Orion.Wait(800)
		Orion.UseObject(pot1.Serial())
		if (Orion.WaitForTarget(1000))
			Orion.TargetTileRelative('any', 1, 0, 65536);
		Orion.Wait(800)
		Orion.UseObject(pot2.Serial())
		if (Orion.WaitForTarget(1000))
			Orion.TargetTileRelative('any', 1, 0, 65536);
	}

}
function DataThrow() {
	TextWindow.Print('Backpack')
	Orion.UseType('0x0F0D');
	Orion.Wait(2000)
	Orion.FindTypeEx('0x0F0D', any, backpack, 2).forEach(function (pot) {
		TextWindow.Print('S' + pot.Serial())
		TextWindow.Print('C' + pot.Container())
		TextWindow.Print('X' + pot.X())
		TextWindow.Print('Y' + pot.Y())
		TextWindow.Print('M' + pot.Map())
		TextWindow.Print('\n')
	})
	TextWindow.Print('Self')
	Orion.FindTypeEx('0x0F0D', any, self, 2).forEach(function (pot) {
		TextWindow.Print('S' + pot.Serial())
		TextWindow.Print('C' + pot.Container())
		TextWindow.Print('X' + pot.X())
		TextWindow.Print('Y' + pot.Y())
		TextWindow.Print('M' + pot.Map())
		TextWindow.Print('\n')
	})
	TextWindow.Print('Ground')
	Orion.FindTypeEx('0x0F0D', any, ground, 2).forEach(function (pot) {
		TextWindow.Print('S' + pot.Serial())
		TextWindow.Print('C' + pot.Container())
		TextWindow.Print('X' + pot.X())
		TextWindow.Print('Y' + pot.Y())
		TextWindow.Print('M' + pot.Map())
		TextWindow.Print('\n')
	})

	Orion.Wait(4000)
	Orion.ShowJournal()
}