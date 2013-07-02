//  | ## Index ##
//  | Monitordraw - Draws the graphs on the monitor div
//  | monitorToggle - Turns the monitor on an off.
//  | activeGraph - Makes pretty buttons light up to the corresponding graph.
//  | popupHelp - Creates pop up window with defintions and what not.
//  | flashCom - Makes the COM button flash.

var monitorOn = true;
var currentGraph = 'nothing';
var sasOn = false;

function onload() {
		// alert('Layout loading');
		$('#graphOne').attr('src', 'altitude.html');
		$('#graphTwo').attr('src', 'map.html');
		$('#graphThree').attr('src', 'apoapsis-periapsis.html');
};

function monitorDraw(that, type) { // 'That' is only used for console logs by the way.
		activeGraph(that, type);
		selectedGraph = '#' + $('#polymug').val();
		$(selectedGraph).attr('src', type + '.html');
	};

function command(command) {
  jKSPWAPI.call("ret=" + command, function (d) {
    if (d.ret == 5) {
      sNotify.addToQueue("404: Mechjeb not found.");
    } else if (d.ret > 0) {
      jKSPWAPI.generateNotificationWithCode(d.ret);
    }
  });
}

function execute() {
  jKSPWAPI.call(
    "ret=mj.surface2[" + $('#heading').val() + "," + $('#pitch').val() + "," + $('#roll').val() + "]",
    function (d) {
      if (d.ret == 5) {
        sNotify.addToQueue("404: Mechjeb not found.");
      } else if (d.ret > 0) {
        jKSPWAPI.generateNotificationWithCode(d.ret);
      }
    });
}

function monitorToggle(that, type){
    if (monitorOn === true) { // Monitor turns off.
        monitorOn = false;
        $("#monitor").html(graphLayout); // Clears the monitor.
        $("#monitorStatus").attr("class","pwrOff"); // Changes the status of the monitor button to off using a class.
        $('button').removeClass('statusOn'); // Turns off buttons.
        //console.log('MonitorOn is', monitorOn);
        return;
    };
    if (monitorOn === false) { // Monitor turns on.
        monitorOn = true;
        sasOn = false;
        $("#monitorStatus").attr("class","pwrOn");
        //console.log('MonitorOn is', monitorOn);
        return;
    };
}

function activeGraph(that, type) {
	if(type != currentGraph) {
		currentGraph = type;
		$('button').removeClass('statusOn');
		that.setAttribute("class", "statusOn");
	};
	$('button').removeClass('statusOn');
	that.setAttribute("class", "statusOn");
};

function popupHelp() {
	window.open('http://pastebin.com/raw.php?i=fMnsYmbh', 'Help', 'height=500px,width=600px,resizeable=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes');
};

function flashCom() {
	$('#comLink').css('background', '#FFEA61').delay(150).queue(function(d){
		$('#comLink').css('background', '');
		$('#comLink').dequeue();
	});
};