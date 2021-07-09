
function Subscriber() {
	TextWindow.Open()
	var starttime = Orion.Now()
	while (true) {
		Orion.Wait(100)

		var msg = Orion.WaitJournal(':::', starttime, Orion.Now() + 200)
		if (msg != null) {
			var message = msg.Text().match(/(.):::(.*)/i)
			if (message[1] === 'T') {
				Orion.Print('target')
				Orion.TargetObject(message[2])
			}
			if (message[1] === 'C') {
				Orion.Print('casting')
				Orion.Cast(message[2])
			}
			if (message[1] === 'F') {
				Orion.Print('Follow')
				Orion.Follow(message[2])
			}
		}
		starttime = Orion.Now()
	}
}

function HostTarget(_target) {
	var target = _target
	if (target === null) {
		target = SelectTarget().Serial()
	}
	Orion.SayParty('T:::' + target)
}

function HostCast(SpellName) {
	Orion.Cast(SpellName)
	Orion.SayParty('C:::' + SpellName)
	if (Orion.WaitForTarget(6000) && Orion.WaitWhileTargeting(30000)) {
		Orion.SayParty('T:::' + Orion.ClientLastTarget())
	}
}

function FollowMe() {
	Orion.SayParty('F:::' + Player.Serial())
}
//#include Scripts/helpers/Target.js