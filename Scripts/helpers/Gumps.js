
function NotEnoughResourcesGump(_private) {
    var output = Orion.GetLastGump();
    return output.CommandList().filter(function (text) {
        return text.search('502925') >= 0;

    }).length > 0;
}


function CreatedItemResourceGump(_private) {
    var output = Orion.GetLastGump();
    return output.CommandList().filter(function (text) {
        return text.search('1044154|500315|502925') >= 0;

    }).length > 0;
}

function CreatedExceptionalItemResourceGump(_private) {
    var output = Orion.GetLastGump();
    return output.CommandList().filter(function (text) {
        return text.search('1044155') >= 0;

    }).length > 0;
}

function InscribedScrollGump(_private) {
    var output = Orion.GetLastGump();
    return output.CommandList().filter(function (text) {
        return text.search('501629') >= 0;

    }).length > 0;
}

function NeedMoreManaGump(_private) {
    var output = Orion.GetLastGump();
var response = false;
        if(output.TextList().length>0)
{
response = output.TextList()[0].search("mana")!=-1;
 }
return response;
}

