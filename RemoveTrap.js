var moves9 = [
    [3, 3, 2, 2],
    [3, 3, 2, 2],
    [3, 3, 2, 1, 1, 2, 3, 3],
    [3, 2, 3, 2],
    [3, 2, 2, 3],
    [3, 2, 1, 2, 3, 3],
    [2, 3, 3, 2],
    [2, 3, 4, 3, 2, 2],
    [2, 3, 2, 3],
    [2, 2, 3, 3],
    [2, 2, 3, 4, 3, 2],
    [2, 2, 3, 4, 4, 3, 2, 2]
]

var moves16 = [[2, 2, 2, 3, 3, 3],
[2, 2, 3, 2, 3, 3],
[2, 2, 2, 3, 4, 4, 4, 3, 2, 2, 2, 3],
[2, 3, 2, 2, 3, 3],
[2, 3, 4, 3, 3, 2, 2, 2],
[2, 3, 4, 3, 2, 2, 3, 2],
[3, 3, 3, 2, 2, 2],
[3, 3, 2, 2, 1, 1, 2, 3, 3, 3],
[3, 3, 2, 1, 2, 2, 3, 3],
[3, 2, 2, 1, 2, 3, 3, 3],
[3, 2, 2, 2, 3, 4, 4, 4, 3, 2, 2, 2],
[3, 2, 3, 2, 2, 3]
]

var moves25 = [[2, 2, 2, 2, 3, 3, 3, 3],
[2, 2, 3, 2, 2, 3, 4, 4, 4, 4, 3, 3, 2, 2, 2, 2],
[2, 2, 2, 2, 3, 3, 4, 4, 3, 3, 2, 2],
[2, 3, 2, 2, 3, 4, 3, 2, 2, 2],
[2, 3, 4, 3, 2, 2, 3, 2, 2, 2],
[2, 3, 4, 3, 3, 2, 2, 1, 1, 2, 2, 3, 3, 3],
[3, 2, 2, 1, 2, 2, 3, 3, 3, 3],
[3, 2, 3, 2, 2, 3, 2, 3],
[3, 2, 3, 3, 3, 2, 1, 1, 1, 2, 2, 3, 3, 3],
[3, 3, 3, 3, 2, 2, 2, 2],
[3, 3, 2, 2, 2, 1, 4, 4, 1, 2, 2, 2, 3, 3, 3, 3],
[3, 3, 2, 3, 2, 2, 3, 2]]

var moves36 = [[2, 2, 2, 2, 2, 3, 3, 3, 3, 3],
[3, 3, 3, 3, 3, 2, 2, 2, 2, 2],
[2, 2, 3, 3, 2, 2, 3, 3, 2, 3],
[2, 3, 3, 3, 2, 2, 3, 3, 2, 2],
[2, 3, 2, 3, 3, 3, 2, 3, 2, 2],
[2, 2, 2, 3, 2, 3, 4, 3, 3, 2, 3, 2],
[3, 3, 2, 3, 2, 3, 2, 2, 2, 3],
[3, 3, 3, 2, 3, 2, 1, 2, 2, 3, 3, 2],
[3, 2, 2, 3, 3, 2, 3, 2, 2, 3],
[3, 2, 3, 4, 3, 2, 2, 2, 3, 2, 3, 2],
[3, 3, 2, 3, 4, 3, 3, 2, 2, 2, 2, 2],
[2, 2, 3, 2, 3, 2, 1, 2, 3, 3, 3, 3]]

function ensureRunning() {
    while (Orion.SkillValue('Remove Trap') < 1000) {
        Orion.Wait(1000)
        if (Orion.ScriptRunning('RemoveTrapTraining') == 0) {
            Orion.ToggleScript('RemoveTrapTraining');
        }

    }
}
var fail = 'You fail to disarm|You successfully'
var pass = 'You successfully'
function RemoveTrapTraining() {
    while (Orion.SkillValue('Remove Trap') < 1000) {
        var startTime = Orion.Now();
        var moveNum = 0;
        var availableMoves;

        Orion.UseSkill('48');
        if (Orion.WaitForTarget(1000))
            Orion.TargetObject('0x4011D933');
        if (Orion.WaitForGump(1000)) {
            var gump1 = Orion.GetGump('last');
            var cells = Orion.GetGump('last').CommandList().filter(function (text) { return text.indexOf('9720') != -1 }).length;
            if (cells < 9) {
                availableMoves = moves9;
            }
            else if (cells < 16) {
                availableMoves = moves16;
            }
            else if (cells < 25) {
                availableMoves = moves25;
            }
            else if (cells < 36) {
                availableMoves = moves36;
            }
        }

        while (Orion.InJournal(pass, '', '0', '-1', startTime - 300, Orion.Now()) == null) {
            Orion.Print('Starting puzzle');
            var startAttemptTime = Orion.Now();
            Orion.UseSkill('48');
            if (Orion.WaitForTarget(1000))
                Orion.TargetObject('0x4011D933');
            if (Orion.WaitForGump(1000)) {
                var gump1 = Orion.GetGump('last');
                if ((gump1 !== null) && (!gump1.Replayed()) && (gump1.ID() === '0x26F70A6A')) {
                    Orion.Print('Starting moves');
                    var lastMove = null
                    var nextMove = availableMoves[0][moveNum];
                    while (availableMoves.length > 0
                        && Orion.InJournal(fail, '', '0', '-1', startAttemptTime, Orion.Now()) == null) {
                        if (lastMove != null) {
                            availableMoves = availableMoves.filter(function (_moves) {
                                return _moves[moveNum - 1] == lastMove;
                            })
                            availableMoves.forEach(function (moveSet) {
                                Orion.Print(moveSet)
                            })
                            nextMove = availableMoves[0][moveNum];
                        }
                        lastMove = nextMove;
                        Orion.Print('move ' + moveNum + ' position ' + nextMove);

                        gump1 = Orion.GetGump('last');
                        gump1.Select(Orion.CreateGumpHook(nextMove));
                        Orion.Wait(150 + Orion.GetPing('max'));
                        moveNum++;

                    }
                    availableMoves = availableMoves.filter(function (_moves) {
                        return _moves[moveNum - 1] != lastMove;
                    })
                    lastMove = null
                    moveNum = 0;

                    availableMoves.forEach(function (moveSet) {
                        Orion.Print(moveSet)
                    })
                }
            }
            Orion.Print('Waiting: ' + (11000 - (Orion.Now() - startAttemptTime)))
            Orion.Wait(11000 - (Orion.Now() - startAttemptTime))
        }
    }
}

function printst() {
    Orion.Print(Orion.GetGump('last').CommandList().filter(function (text) { return text.indexOf('9720') != -1 }).length)
}