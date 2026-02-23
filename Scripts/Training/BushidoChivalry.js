function TrainChivalryAndBushido() {

    while (Player.IsHuman()) {
        if (Player.Mana() < 10) {
            //  Orion.UseSkill('Meditation');
            //   while (Player.Mana() < Player.MaxMana()) {
            Orion.Wait(1000);
            //}
        }
        if (Orion.SkillValue('Chivalry') < 500) {
            Orion.Cast('Consecrate Weapon');
            Orion.Wait(500);
        }
        if (Orion.SkillValue('Chivalry') < 600) {
            Orion.Cast('Divine Fury');
            Orion.Wait(2000);
        }
        else if (Orion.SkillValue('Chivalry') < 700) {
            Orion.Cast('Enemy Of One');
            Orion.Wait(2000);
        }
        else if (Orion.SkillValue('Chivalry') < 900) {
            Orion.Cast('Holy Light');
            Orion.Wait(3000);
        }
        else if (Orion.SkillValue('Chivalry') < 1000) {
            Orion.Cast('Noble Sacrifice');
            Orion.Wait(2000);
        }

        if (Orion.SkillValue('Bushido') < 600) {
            Orion.Cast('Confidence');
            Orion.Wait(2000);
        }
        else if (Orion.SkillValue('Bushido', 'base') < 991) {
            if (Orion.BuffExists('Counter Attack')) {
                Orion.Cast('Confidence');
                Orion.Wait(2000);
            }
            else {
                Orion.Cast('Counter Attack');
                Orion.Wait(2000);
            }
        }
        else if (Orion.SkillValue('Bushido') < 1000) {
            Orion.Cast('Evasion');
            Orion.Wait(2000);
        }
    }
}

function TrainBushTo120()
{
while(true){
if (Orion.SkillValue('Bushido') < 1100) {
            Orion.Cast('Evasion');
            Orion.Wait(2000);
        }
}
while(true)
{
Orion.Wait(1000)
if(!Orion.SpellStatus('Momentum Strike')){
Orion.Cast('Momentum Strike')}
  Orion.Attack('0x0000F22F');
}
Orion.Wait(1000)
if(!Orion.SpellStatus('Momentum Strike')){

  Orion.Attack('0x00000000');
}
}

// ===============================
// Bushido Momentum Strike Trainer
// Archery (Correct Cast Version)
// ===============================

// SETTINGS
var SEARCH_RANGE = 8;     // Tile radius to check
var MIN_TARGETS = 2;     // Required for Momentum Strike
var WAIT_DELAY = 250;
var MIN_MANA = 10;

function BushidoMomentumTrainer()
{
    Orion.Print("Bushido Momentum Strike Trainer started.");

    while (!Player.Dead())
    {
        // Ensure weapon equipped
        if (Orion.ObjAtLayer('LeftHand') == null)
        {
            Orion.Wait(500);
            continue;
        }

        // Find hostile mobs
        var mobs = Orion.FindTypeEx(
            'any',
            -1,
            'ground',
            'mobile|live|inlos|ignorefriends',
            SEARCH_RANGE,
            'gray|criminal|orange|red'
        );

        // Momentum Strike requires 2+
        if (mobs.length >= MIN_TARGETS)
        {
            if (Player.Mana() >= MIN_MANA && !Orion.SpellStatus('Momentum Strike'))
            {
                // Cast Bushido Momentum Strike
                Orion.Cast('Momentum Strike');
                Orion.Wait(100);

                // Attack nearest mob
                Orion.Attack(mobs[0].Serial());
            }
        }

        Orion.Wait(WAIT_DELAY);
    }
}
