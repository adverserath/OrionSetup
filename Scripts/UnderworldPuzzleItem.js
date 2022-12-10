function PrintWalk() {
	TextWindow.Open()
	TextWindow.Print('Orion.WalkTo(' + Player.X() + ',' + Player.Y() + ')')
}

function CrossPathTest() {

	var forwardSteps = [
		[1061, 1026],
		[1067, 1026]]

	if (Orion.GetDistance(forwardSteps[0][0], forwardSteps[0][1]) < Orion.GetDistance(
		forwardSteps[(forwardSteps.length - 1)][0],
		forwardSteps[(forwardSteps.length - 1)][1])
	) {
		Orion.Print('forward')
		forwardSteps.forEach(function (step) {
			Orion.WalkTo(x, y, z, distanceXY, distanceZ, run);
			Orion.WalkTo(step[0], step[1], 0, 0, 255, 1)
		})
	}
	else {
		Orion.Print('backwards')
		forwardSteps.reverse().forEach(function (step) {
			Orion.WalkTo(step[0], step[1], 0, 0, 255, 1)
		})
	}
}


function CrossPath() {
	var forwardSteps = [
		[1062, 1062],
		[1062, 1058],
		[1060, 1058],
		[1060, 1057],
		[1059, 1057],
		[1059, 1055],
		[1060, 1055],
		[1060, 1053],
		[1059, 1053],
		[1059, 1050],
		[1058, 1050],
		[1058, 1049],
		[1057, 1049],
		[1057, 1047],
		[1059, 1047],
		[1059, 1046],
		[1059, 1044],
		[1061, 1044],
		[1061, 1041],
		[1062, 1041],
		[1062, 1038],
		[1061, 1038],
		[1061, 1037],
		[1057, 1037],
		[1057, 1032],
		[1060, 1032],
		[1060, 1029],
		[1061, 1029],
		[1061, 1026],
		[1067, 1026]]
	Orion.ClearFakeMapObjects();
	if (Orion.GetDistance(forwardSteps[0][0], forwardSteps[0][1]) < Orion.GetDistance(
		forwardSteps[(forwardSteps.length - 1)][0],
		forwardSteps[(forwardSteps.length - 1)][1])
	) {
		Orion.Print('forward')
		forwardSteps.forEach(function (step) {
			//Orion.Wait(800)
			Orion.AddFakeMapObject(Orion.Random(10000), '0x9F14', '0x047E', step[0], step[1], Player.Z() + 1);
			Orion.WalkTo(step[0], step[1], 0, 0, 255, 1)
		})
	}
	else {
		Orion.Print('backwards')
		forwardSteps.reverse().forEach(function (step) {
			Orion.Wait(100)
			Orion.AddFakeMapObject(Orion.Random(10000), '0x9F14', '0x047E', step[0], step[1], Player.Z() + 1);

			Orion.WalkTo(step[0], step[1], 0, 0, 255, 1)
		})
	}
}

var puzzles = [
	'gumppic 450 76 10850 , gumppic 450 109 10810 , gumppic 450 142 10850 , gumppic 450 175 10830', //success0
	'gumppic 410 76 10830 , gumppic 490 76 10830 , gumppic 410 109 10840 , gumppic 410 175 10810 , gumppic 450 175 10810 , gumppic 490 175 10810',//success1
	'gumppic 410 142 10840 , gumppic 410 175 10850 , gumppic 450 175 10850 , gumppic 490 175 10850',//success2
	'gumppic 410 76 10810 , gumppic 490 76 10810 , gumppic 410 142 10830 , gumppic 490 142 10830 , gumppic 410 175 10830 , gumppic 490 175 10830',//success3
	'gumppic 450 76 10810 , gumppic 450 109 10830 , gumppic 410 142 10830 , gumppic 490 142 10830 , gumppic 410 175 10840',//success4
	'gumppic 410 76 10830 , gumppic 490 76 10830 , gumppic 410 109 10800 , gumppic 450 142 10850 , gumppic 450 175 10810',//success5
	'gumppic 450 76 10830 , gumppic 450 109 10850 , gumppic 410 142 10810 , gumppic 490 142 10810 , gumppic 410 175 10820',//success6
	'gumppic 410 76 10810 , gumppic 490 76 10810 , gumppic 410 142 10810 , gumppic 450 142 10810 , gumppic 490 142 10810',//success7
	'gumppic 450 76 10830 , gumppic 410 109 10820 , gumppic 410 142 10850 , gumppic 490 142 10850 , gumppic 450 175 10850',//success8
	'gumppic 450 76 10850 , gumppic 410 109 10830 , gumppic 490 109 10830 , gumppic 410 175 10830 , gumppic 450 175 10830 , gumppic 490 175 10830',
	'gumppic 450 76 10810 , gumppic 450 109 10850 , gumppic 410 142 10850 , gumppic 450 142 10850 , gumppic 490 142 10850',//success10
	'gumppic 450 76 10830 , gumppic 410 142 10830 , gumppic 450 142 10830 , gumppic 490 142 10830 , gumppic 410 175 10830 , gumppic 490 175 10830',//success11
	'gumppic 410 76 10850 , gumppic 450 76 10850 , gumppic 490 76 10850 , gumppic 410 175 10850 , gumppic 450 175 10850 , gumppic 490 175 10850',//success12
	'gumppic 410 109 10810 , gumppic 450 109 10810 , gumppic 490 109 10810 , gumppic 450 142 10830 , gumppic 410 175 10810 , gumppic 490 175 10810',//success13
	'gumppic 410 76 10810 , gumppic 450 76 10810 , gumppic 490 76 10810 , gumppic 410 142 10810 , gumppic 450 142 10810 , gumppic 490 142 10810',//success14
	'gumppic 450 76 10850 , gumppic 410 109 10810 , gumppic 490 109 10810 , gumppic 410 142 10850 , gumppic 490 142 10850 , gumppic 450 175 10830'
]


var solutions = [
	[1, 5, 4, 5, 3, 5, 2, 5, 1, 5, 2, 6],
	[1, 5, 4, 5, 4, 6, 3, 6, 1, 5, 3, 5],
	[1, 6, 2, 5, 1, 6, 4, 5],
	[3, 5, 2, 5, 1, 6, 1, 6, 4, 6],
	[1, 5, 4, 5, 3, 5, 2, 5, 3, 6, 1, 5, 2, 5],
	[1, 5, 3, 5, 2, 5, 2, 6, 1, 6, 4, 5, 3, 5, 4, 5],
	[2, 6, 1, 6, 4, 5, 1, 5, 2, 5],
	[4, 6, 1, 6, 2, 5, 2, 5],
	[4, 5, 3, 6, 1, 6, 1, 5, 4, 5, 4, 6, 3, 5],
	[4, 5, 3, 5, 4, 6, 2, 5, 1, 5, 3, 6],
	[4, 6, 3, 5, 2, 5, 1, 5, 4, 5, 1, 6],
	[4, 5, 2, 5, 1, 5, 1, 6, 2, 6],
	[2, 5, 2, 6, 1, 6, 2, 6, 2, 5, 3, 6],
	[3, 6, 2, 5, 1, 5, 2, 5, 4, 5, 3, 5, 1, 6],
	[3, 5, 2, 5, 4, 6, 3, 6, 2, 6, 4, 5],
	[3, 5, 4, 5, 3, 5, 4, 6, 1, 5, 2, 6]
]
function GetPuzzle() {
	var puzzleId
	TextWindow.Clear()
	Orion.UseType('0x0E80', '0x0000', ground)
	Orion.Wait(1000)
	Orion.UseType('0x2AAA')
	Orion.WaitForGump(1500)
	//Orion.Wait(50)
	Orion.Wait(1000)
	var puzzleGump = Orion.GetGump('last')

	TextWindow.Print(puzzleGump.CommandList())

	puzzles.forEach(function (puzzle) {
		if (Orion.Contains(puzzleGump.CommandList(), puzzle)) {
			puzzleId = puzzles.indexOf(puzzle)
			Orion.Print('this is it ' + puzzleId)
			solutions[puzzleId].forEach(function (button) {
				Orion.Print('pressing ' + button)

				puzzleGump = Orion.GetGump('last')
				puzzleGump.Select(Orion.CreateGumpHook(button));
				Orion.WaitForGump(1000)
				//	Orion.Wait(20)
			}
			)
		}
		Orion.Wait(10)
	})
	puzzleGump = Orion.GetGump('last')
	puzzleGump.Select(Orion.CreateGumpHook(7));
	Orion.Say('Complete ' + puzzleId)
}