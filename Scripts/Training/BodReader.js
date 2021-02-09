//smallbod
//.?\w*\s61(?:\d*\s){4}(\d*)(?:\d*\s){4},.?\w*\s103(?:\d*\s){4}(\d*)(?:\d*\s){4},.?\w*\s235(?:\d*\s){4}(\d*)(?:\d*\s){4},.?\w*\s316(?:\d*\s){4}(\d*)(?:\d*\s){4},
var cliloc;

function test(){

TextWindow.Print(Orion.GetGump('last').ButtonList().join().match(/button\s225/i)==null)

}

function BodReader() {
  cliloc = ReadCliLoc();

  var bodBook = Orion.FindTypeEx('0x2259');
  bodBook.forEach(function (book) {
    ReadBook(book.Serial());
  })
}

function ReadBook(bookId) {

  TextWindow.Open()
  
  TextWindow.Clear()
  Orion.UseObject(bookId);
  if (Orion.WaitForGump(1000)) {
    var gump0 = Orion.GetGump('last');
    if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x54F555DF')) {
      gump0.Select(Orion.CreateGumpHook(1));
      Orion.Wait(100);
    }
  }
  if (Orion.WaitForGump(1000)) {
    var gump1 = Orion.GetGump('last');
    if ((gump1 !== null) && (!gump1.Replayed()) && (gump1.ID() === '0x968739DB')) {
      gump1.Select(Orion.CreateGumpHook(3));
      Orion.Wait(100);
    }
  }
  if (Orion.WaitForGump(1000)) {
    var gump2 = Orion.GetGump('last');
    if ((gump2 !== null) && (!gump2.Replayed()) && (gump2.ID() === '0x968739DB')) {
      gump2.Select(Orion.CreateGumpHook(0));
      Orion.Wait(100);
    }
  }
  var endOfBook = false;
  while (Orion.GetGump('last').ButtonList().join().match(/button\s225/i)!=null) {
    ReadPage()
    if (Orion.WaitForGump(1000)) {
      var gump1 = Orion.GetGump('last');
      if ((gump1 !== null) && (!gump1.Replayed()) && (gump1.ID() === '0x54F555DF')) {
        gump1.Select(Orion.CreateGumpHook(3));
        Orion.Wait(100);
      }
    }
  }


}
function ReadPage() {
Orion.Wait(1000);
  var bodsOnPage = [];
  var gump = Orion.GetLastGump();
  var gumpinfo = gump.CommandList();
  var line = gumpinfo.join()

//TextWindow.Print(line)
  var smallBods = (line.match(/.?\w*\s61(?:\d*\s){4}\d*1062224\s(?:\d*\s){3},.?\w*\s103(?:\d*\s){4}\d*(?:\d*\s){4},.?\w*\s235(?:\d*\s){4}\d*(?:\d*\s){4}(?:,.?\w*\s316(?:\d*\s){4}\d*(?:\d*\s){4}){0,1},\s\w*\s\d*\s\d*\s\d*\s\d*/ig) || []);

  smallBods.forEach(function (bod) {
 //TextWindow.Print(bod)

    var matches = (bod.match(/.?\w*\s61(?:\d*\s){4}(\d*)(?:\d*\s){4},.?\w*\s103(?:\d*\s){4}(\d*)(?:\d*\s){4},.?\w*\s235(?:\d*\s){4}(\d*)(?:\d*\s){4}(?:,.?\w*\s316(?:\d*\s){4}(\d*)(?:\d*\s){4})?,\s\w*\s\d*\s\d*\s\d*\s(\d*)/i) || [])
    var loc;
    if(matches[4]){

     loc= gump.Text(matches[5]).match(/\d\s.\s(\d*)/i)[1];
         TextWindow.Print( GetString(matches[1]) + ' ' + GetString(matches[2]) + ' ' + GetString(matches[3]) + ' ' + GetString(matches[4])+ ' : ' + loc);
    bodsOnPage.push(GetString(matches[1]) + ' ' + GetString(matches[2]) + ' ' + GetString(matches[3]) + ' ' + GetString(matches[4]) + ' ' + loc)
     }
     else{
          loc= gump.Text(matches[5]).match(/\d\s.\s(\d*)/i)[1];
    TextWindow.Print( GetString(matches[1]) + ' ' + GetString(matches[2]) + ' ' + GetString(matches[3]) + ' : ' + loc);
    bodsOnPage.push(GetString(matches[1]) + ' ' + GetString(matches[2]) + ' ' + GetString(matches[3]) + ' ' + loc)
     }
    
  }
  )
//TextWindow.Print(line)

  var largeBods = (line.match(/.?\w*\s61(?:\d*\s){4}\d*1062225\s(?:\d*\s){3},(.?\w*\s103(?:\d*\s){4}\d*(?:\d*\s){4},.?\w*\s235(?:\d*\s){4}\d*(?:\d*\s){4}(?:,.?\w*\s316(?:\d*\s){4}\d*(?:\d*\s){4})?,(?:\s\w*\s\d*\s\d*\s\d*\s\d*\s,)+)+/ig) || []);

//TextWindow.Print(line)
  largeBods.forEach(function (bigBod) {
//TextWindow.Print(bigBod)
  
    var innerBods = (bigBod.match(/.?\w*\s103(?:\d*\s){4}(?:\d*)(?:\d*\s){4},.?\w*\s235(?:\d*\s){4}(?:\d*)(?:\d*\s){4}(?:,.?\w*\s316(?:\d*\s){4}(?:\d*)(?:\d*\s){4})?,\s\w*\s\d*\s\d*\s\d*\s(?:\d*)/ig) || []);

    innerBods.forEach(function (bod) {
//    TextWindow.Print('bod')
//    TextWindow.Print(bod)
      var matches = (bod.match(/.?\w*\s103(?:\d*\s){4}(\d*)(?:\d*\s){4},.?\w*\s235(?:\d*\s){4}(\d*)(?:\d*\s){4}(?:,.?\w*\s316(?:\d*\s){4}(\d*)(?:\d*\s){4})?,\s\w*\s\d*\s\d*\s\d*\s(\d*)/i) || [])
  //    matches.forEach(function (test){TextWindow.Print(test)})
    
          var loc;

    if(matches[3]){


     loc= gump.Text(matches[4]).match(/\d*\s.\s(\d*)/i)[1];
      TextWindow.Print('large' + ' '+ GetString(matches[1]) + ' ' + GetString(matches[2]) + ' ' + GetString(matches[3]) + ' ' +  ' : ' + loc);
      bodsOnPage.push(GetString(matches[1]) + ' ' + GetString(matches[2]) + ' ' + GetString(matches[3]) + ' ' + ' ' + loc)
     }
     else{
          loc= gump.Text(matches[4]).match(/\d\s.\s(\d*)/i)[1];
    TextWindow.Print('large' + ' '+ GetString(matches[1]) + ' ' + GetString(matches[2]) + ' ' + ' : ' + loc);
    bodsOnPage.push(GetString(matches[1]) + ' ' + GetString(matches[2]) + ' ' + ' ' + loc)
     }
     
    }
    )


  }
  )
  return bodsOnPage;
}

function GetString(id) {
//TextWindow.Print('id:'+id)
  var curIt = cliloc.filter(
    function (cl) {

      return cl.Id() === id
    })
  //	  if(curIt.length>0)
  return (curIt.shift().Name())

}
function ReadCliLoc() {
  var clilocs = []
  var file = Orion.NewFile();

  file.Open('cliloc.txt');
  if (file != null) {
    var i = 0;
    var location = '1'
    while (location != null && location) {
      //TextWindow.Print(i++)
      location = file.ReadLine();

      // TextWindow.Print(location)
      if (location != null && location) {
        //       TextWindow.Print(location)
        var cliloc = location.split(';');
        var cliLine = {
          id: cliloc[0],
          name: cliloc[1],
          type: cliloc[2],
          Id: function () {
            return this.id;
          },
          Name: function () {
            return this.name;
          },
          Type: function () {
            return this.type;
          }
        }
        //    TextWindow.Print(location)

        //   TextWindow.Print(cliloc[0])
        //     TextWindow.Print(bods.indexOf(cliloc[0]))

        //     if(bods.indexOf(cliloc[0])>=0)
        //     {                //    TextWindow.Print('yes')
        clilocs.push(cliLine);
        //       }
        //      TextWindow.Print(cliLine[0])
        //       TextWindow.Print(cliLine[1])
      }
    }
  }
  file.Close();
  return clilocs;
}


var bods = ['1023913',
  '1023911',
  '1023922',
  '1023915',
  '1023909',
  '1025115',
  '1025187',
  '1025040',
  '1025181',
  '1023932',
  '1025179',
  '1025177',
  '1025127',
  '1023917',
  '1025182',
  '1025123',
  '1023938',
  '1025125',
  '1023934',
  '1025185',
  '1025119',
  '1025121',
  '1023937',
  '1025046',
  '1025049',
  '1023913',
  '1023911',
  '1023922',
  '1023915',
  '1023909',
  '1025115',
  '1025187',
  '1025040',
  '1025181',
  '1023932',
  '1025179',
  '1025177',
  '1025127',
  '1023917',
  '1025182',
  '1025123',
  '1023938',
  '1025125',
  '1023934',
  '1025185',
  '1025119',
  '1025121',
  '1023937',
  '1025046',
  '1025049',
  '1025444',
  '1025440',
  '1025907',
  '1025909',
  '1025908',
  '1025911',
  '1025910',
  '1025912',
  '1025913',
  '1025914',
  '1025915',
  '1025916',
  '1028059',
  '1025399',
  '1027933',
  '1028097',
  '1028189',
  '1027937',
  '1027935',
  '1025397',
  '1027939',
  '1028095',
  '1025422',
  '1025433',
  '1025431',
  '1025398',
  '1025441',
  '1025435',
  '1025437',
  '1025055',
  '1025054',
  '1025132',
  '1025051',
  '1025128',
  '1025130',
  '1025134',
  '1025138',
  '1027172',
  '1025136',
  '1025141',
  '1025140',
  '1025139',
  '1025137',
  '1025102',
  '1025100',
  '1025099',
  '1025104',
  '1027026',
  '1027027',
  '1027030',
  '1027028',
  '1027035',
  '1027032',
  '1025055',
  '1025054',
  '1025132',
  '1025051',
  '1025128',
  '1025130',
  '1025134',
  '1025138',
  '1027172',
  '1025136',
  '1025141',
  '1025140',
  '1025139',
  '1025137',
  '1025102',
  '1025100',
  '1025099',
  '1025104',
  '1027026',
  '1027027',
  '1027030',
  '1027028',
  '1027035',
  '1027032',
  '1011207',
  '1011219',
  '1011208',
  '1024113',
  '1024112',
  '1024167',
  '1025365',
  '1024100',
  '1024321',
  '1023739',
  '1025091',
  '1044567',
  '1023997',
  '1024130',
  '1025110',
  '1022552',
  '1022548',
  '1022519',
  '1022550',
  '1022458',
  '1024095',
  '1112117',
  '1024027',
  '1024021',
  '1024148',
  '1024325',
  '1024158',
  '1030158',
  '1023907',
  '1023718',
  '1023779',
  '1023719',
  '1022597',
  '1022599',
  '1026226',
  '1025444',
  '1025440',
  '1025907',
  '1025909',
  '1025908',
  '1025911',
  '1025910',
  '1025912',
  '1025913',
  '1025914',
  '1025915',
  '1025916',
  '1028059',
  '1025399',
  '1027933',
  '1028097',
  '1028189',
  '1027937',
  '1027935',
  '1025397',
  '1027939',
  '1028095',
  '1025422',
  '1025433',
  '1025431',
  '1025398',
  '1025441',
  '1025435',
  '1025437',
  '1025063',
  '1027609',
  '1025062',
  '1025069',
  '1025067',
  '1025068',
  '1025078',
  '1025077',
  '1025084',
  '1025082',
  '1025083',
  '1027168',
  '1027176',
  '1027178',
  '1027180',
  '1027174',
  '1027170',
  '1025201',
  '1025200',
  '1025198',
  '1025202',
  '1025199',
  '1025899',
  '1025905',
  '1025903',
  '1025901',
  '1025063',
  '1027609',
  '1025062',
  '1025069',
  '1025067',
  '1025068',
  '1025078',
  '1025077',
  '1025084',
  '1025082',
  '1025083',
  '1027168',
  '1027176',
  '1027178',
  '1027180',
  '1027174',
  '1027170',
  '1025201',
  '1025200',
  '1025198',
  '1025202',
  '1025199',
  '1025899',
  '1025905',
  '1025903',
  '1025901',
  '1022910',
  '1027857',
  '1027608',
  '1022602',
  '1025112',
  '1023721',
  '1023713',
  '1030150',
  '1030152',
  '1022474',
  '1015093',
  '1015094',
  '1015096',
  '1023651',
  '1022718',
  '1022861',
  '1015082',
  '1030261',
  '1030263',
  '1030327',
  '1030329',
  '1030331',
  '1030333',
  '1023762',
  '1023763',
  '1023740',
  '1023761',
  '1030251',
  '1030253',
  '1030255',
  '1030257',
  '1030259',
  '1031557',
  '1073549',
  '1073550',
  '1073551',
  '1073552',
  '1011207',
  '1011219',
  '1011208',
  '1024113',
  '1024112',
  '1024167',
  '1025365',
  '1024100',
  '1024321',
  '1023739',
  '1025091',
  '1044567',
  '1023997',
  '1024130',
  '1025110',
  '1022552',
  '1022548',
  '1022519',
  '1022550',
  '1022458',
  '1024095',
  '1112117',
  '1024027',
  '1024021',
  '1024148',
  '1024325',
  '1024158',
  '1030158',
  '1023907',
  '1023718',
  '1023779',
  '1023719',
  '1022597',
  '1022599',
  '1026226',
  '1011207',
  '1011219',
  '1011208',
  '1024113',
  '1024112',
  '1024167',
  '1025365',
  '1024100',
  '1024321',
  '1023739',
  '1025091',
  '1044567',
  '1023997',
  '1024130',
  '1025110',
  '1022552',
  '1022548',
  '1022519',
  '1022550',
  '1022458',
  '1024095',
  '1112117',
  '1024027',
  '1024021',
  '1024148',
  '1024325',
  '1024158',
  '1030158',
  '1023907',
  '1023718',
  '1023779',
  '1023719',
  '1022597',
  '1022599',
  '1026226',
  '1024179',
  '1024187',
  '1024189',
  '1024177',
  '1024175',
  '1024171',
  '1026464',
  '1024173',
  '1072154',
  '1011202',
  '1024185',
  '1022910',
  '1027857',
  '1027608',
  '1022602',
  '1025112',
  '1023721',
  '1023713',
  '1030150',
  '1030152',
  '1022474',
  '1015093',
  '1015094',
  '1015096',
  '1023651',
  '1022718',
  '1022861',
  '1015082',
  '1030261',
  '1030263',
  '1030327',
  '1030329',
  '1030331',
  '1030333',
  '1023762',
  '1023763',
  '1023740',
  '1023761',
  '1030251',
  '1030253',
  '1030255',
  '1030257',
  '1030259',
  '1031557',
  '1073549',
  '1073550',
  '1073551',
  '1073552',
  '1024179',
  '1024187',
  '1024189',
  '1024177',
  '1024175',
  '1024171',
  '1026464',
  '1024173',
  '1072154',
  '1011202',
  '1024185',
  '1022910',
  '1027857',
  '1027608',
  '1022602',
  '1025112',
  '1023721',
  '1023713',
  '1030150',
  '1030152',
  '1022474',
  '1015093',
  '1015094',
  '1015096',
  '1023651',
  '1022718',
  '1022861',
  '1015082',
  '1030261',
  '1030263',
  '1030327',
  '1030329',
  '1030331',
  '1030333',
  '1023762',
  '1023763',
  '1023740',
  '1023761',
  '1030251',
  '1030253',
  '1030255',
  '1030257',
  '1030259',
  '1031557',
  '1073549',
  '1073550',
  '1073551',
  '1073552',
  '1022910',
  '1027857',
  '1027608',
  '1022602',
  '1025112',
  '1023721',
  '1023713',
  '1030150',
  '1030152',
  '1022474',
  '1015093',
  '1015094',
  '1015096',
  '1023651',
  '1022718',
  '1022861',
  '1015082',
  '1030261',
  '1030263',
  '1030327',
  '1030329',
  '1030331',
  '1030333',
  '1023762',
  '1023763',
  '1023740',
  '1023761',
  '1030251',
  '1030253',
  '1030255',
  '1030257',
  '1030259',
  '1031557',
  '1073549',
  '1073550',
  '1073551',
  '1073552',
  '1027981',
  '1027982',
  '1027983',
  '1027984',
  '1027985',
  '1027986',
  '1027987',
  '1027988',
  '1027989',
  '1027990',
  '1027991',
  '1027992',
  '1027993',
  '1027994',
  '1027995',
  '1027996',
  '1027997',
  '1027998',
  '1027999',
  '1028000',
  '1028001',
  '1028002',
  '1028003',
  '1028004',
  '1028005',
  '1028006',
  '1028007',
  '1028008',
  '1028009',
  '1028010',
  '1028011',
  '1028012',
  '1028013',
  '1028014',
  '1028015',
  '1028016',
  '1028017',
  '1028018',
  '1028019',
  '1028020',
  '1028021',
  '1028022',
  '1028023',
  '1028024',
  '1028025',
  '1028026',
  '1028027',
  '1028028',
  '1028029',
  '1028030',
  '1028031',
  '1028032',
  '1028033',
  '1028034',
  '1028035',
  '1028036',
  '1028037',
  '1028038',
  '1028039',
  '1028040',
  '1028041',
  '1028042',
  '1028043',
  '1028044',
  '1028800',
  '1028801',
  '1028802',
  '1028803',
  '1028804',
  '1028805',
  '1028806',
  '1028807',
  '1028808',
  '1028809',
  '1028810',
  '1028811',
  '1028812',
  '1028813',
  '1028814',
  '1028815',
  '1023834',
  '1028787',
  '1028901',
  '1156443',
  '1027981',
  '1027982',
  '1027983',
  '1027984',
  '1027985',
  '1027986',
  '1027987',
  '1027988',
  '1027989',
  '1027990',
  '1027991',
  '1027992',
  '1027993',
  '1027994',
  '1027995',
  '1027996',
  '1027997',
  '1027998',
  '1027999',
  '1028000',
  '1028001',
  '1028002',
  '1028003',
  '1028004',
  '1028005',
  '1028006',
  '1028007',
  '1028008',
  '1028009',
  '1028010',
  '1028011',
  '1028012',
  '1028013',
  '1028014',
  '1028015',
  '1028016',
  '1028017',
  '1028018',
  '1028019',
  '1028020',
  '1028021',
  '1028022',
  '1028023',
  '1028024',
  '1028025',
  '1028026',
  '1028027',
  '1028028',
  '1028029',
  '1028030',
  '1028031',
  '1028032',
  '1028033',
  '1028034',
  '1028035',
  '1028036',
  '1028037',
  '1028038',
  '1028039',
  '1028040',
  '1028041',
  '1028042',
  '1028043',
  '1028044',
  '1028800',
  '1028801',
  '1028802',
  '1028803',
  '1028804',
  '1028805',
  '1028806',
  '1028807',
  '1028808',
  '1028809',
  '1028810',
  '1028811',
  '1028812',
  '1028813',
  '1028814',
  '1028815',
  '1023834',
  '1028787',
  '1028901',
  '1156443',
  '1156401',
  '1024153',
  '1024157',
  '1041334',
  '1041335',
  '1041336',
  '1041342',
  '1025643',
  '1022537',
  '1022539',
  '1098235',
  '1030317',
  '1030318',
  '1030319',
  '1030320',
  '1029451',
  '1030302',
  '1030304',
  '1030316',
  '1041340',
  '1041002',
  '1024159',
  '1041339',
  '1041338',
  '1041337',
  '1041341',
  '1041345',
  '1041347',
  '1044517',
  '1044516',
  '1041346',
  '1041344',
  '1041343',
  '1041348',
  '1025640',
  '1156401',
  '1024153',
  '1024157',
  '1041334',
  '1041335',
  '1041336',
  '1041342',
  '1025643',
  '1022537',
  '1022539',
  '1098235',
  '1030317',
  '1030318',
  '1030319',
  '1030320',
  '1029451',
  '1030302',
  '1030304',
  '1030316',
  '1041340',
  '1041002',
  '1024159',
  '1041339',
  '1041338',
  '1041337',
  '1041341',
  '1041345',
  '1041347',
  '1044517',
  '1044516',
  '1041346',
  '1041344',
  '1041343',
  '1041348',
  '1025640',
  '1072952',
  '1040000',
  '1072953',
  '1030248',
  '1022487',
  '1022427',
  '1022486',
  '1025642',
  '1022546',
  '1025042',
  '1029932',
  '1030224',
  '1023919',
  '1025117',
  '1029933',
  '1031551',
  '1073509',
  '1073510',
  '1073511',
  '1073512',
  '1031550',
  '1073505',
  '1073506',
  '1073507',
  '1073508',
  '1025042',
  '1029932',
  '1030224',
  '1023919',
  '1025117',
  '1029933',
  '1031551',
  '1073509',
  '1073510',
  '1073511',
  '1073512',
  '1031550',
  '1073505',
  '1073506',
  '1073507',
  '1073508',
  '1025042',
  '1029932',
  '1030224',
  '1023919',
  '1025117',
  '1029933',
  '1031551',
  '1073509',
  '1073510',
  '1073511',
  '1073512',
  '1031550',
  '1073505',
  '1073506',
  '1073507',
  '1073508',
  '1023902',
  '1027163',
  '1023553',
  '1027124',
  '1041328',
  '1041329',
  '1041330',
  '1041315',
  '1041316',
  '1041317',
  '1041322',
  '1041323',
  '1041324',
  '1072848',
  '1072849',
  '1041325',
  '1041331',
  '1041332',
  '1041333',
  '1072106',
  '1072095',
  '1072109',
  '1072098',
  '1041326',
  '1041327',
  '1041318',
  '1041319',
  '1041320',
  '1041321',
  '1153501']