//#include helpers/Target.js

var intoDespise = coordinate(5682, 1440, 255)
var exitgate = coordinate(5153, 1760, 255)
var exitgatepx1 = coordinate(5154, 1760, 255)
var tethExit = coordinate(5172, 1589, 255)
var despiseExit = coordinate(5506, 817, 255)

function WalkToDest(exitId) {
	if (exitId == 1) {
		Orion.Print('Leaving Despise')
		FelWalkTo(despiseExit, 0)
	}

	if (exitId == 2) {
		FelWalkTo(tethExit, 0)
	}

	if (exitId == 3) {
		FelWalkTo(exitgate, 0)
		if (Orion.WaitForGump(1000)) {
			var gump1 = Orion.GetGump('last');
			if ((gump1 !== null) && (!gump1.Replayed()) && (gump1.ID() === '0xE0E675B8')) {
				var gumpHook0 = Orion.CreateGumpHook(1);
				gumpHook0.AddCheck(200, true);
				gump1.Select(gumpHook0);
				Orion.Wait(100);
			}
		}
	}

	if (exitId == 4) {
		FelWalkTo(intoDespise, 0)
	}
	//
}