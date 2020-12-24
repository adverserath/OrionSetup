//#include Scripts/helpers/Notifier.js
//#include Scripts/helpers/Target.js

function TrainRemoveTrap() {
	Orion.Print('Select a box')
	var target = SelectTarget();

	while (Orion.SkillValue('Remove Trap') < 1000) {
		TrapChest(target.Serial());

		RemoveTrap(target.Serial());
		NotifySkill('Remove Trap')
	}
}

function TrapChest(serial) {
	Orion.Print('Trapping Chest')
	Orion.Cast('13');
	if (Orion.WaitForTarget(1000))
		Orion.TargetObject(serial);
	Orion.Wait(1000);


}

function RemoveTrap(serial) {
	var startTime = Orion.Now()
	while (Orion.InJournal('render the trap|appear to be trapped', '', '0', '-1', startTime, Orion.Now()) == null) {
		Orion.Print('Removing Trap from Chest')

		while (Orion.DisplayTimerExists('RemoveTrap')) {
			Orion.Wait(1000);
		}
		Orion.UseSkill('Remove Trap');
		if (Orion.WaitForTarget(1000)) {
			Orion.AddDisplayTimer('RemoveTrap',
				10000,
				'AboveChar', 'Circle', 'Remove Trap', 0, 0,
				'any', -1, '0x0000FFFE');
			Orion.TargetObject('0x400FF0A8');
			Orion.Wait(1000)
		}
	}
	if (Player.Hits() < Player.MaxHits()) {
		Orion.Print('Lets Heal')
		Orion.CastTarget('Greater Heal', self)
		Orion.Wait(1000);
	}

}