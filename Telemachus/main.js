//  | ## Index ##
//  | Monitordraw - Draws the graphs on the monitor div
//  | monitorToggle - Turns the monitor on an off.
//  | activeGraph - Makes pretty buttons light up to the corresponding graph.
//  | popupHelp - Creates pop up window with defintions and what not.
//  | flashCom - Makes the COM button flash.

var monitorOn = true;
var currentGraph = 'nothing';
var sasOn = false;

function monitorDraw(that, type) { // 'That' is only used for console logs by the way.
	if (monitorOn === true) { // Can't display anything without the monitor being on.
		activeGraph(that, type);
		if (type === 'alt') {
			$("#monitor").html('<div id="chart_div_alt"></div>');
			//console.log(type, 'type chart div created'); 
			activeGraph(that, type);
			initKSPWAPIGraph("alt=v.altitude&terrain=v.heightFromTerrain&met=v.missionTime", function (rawData, d) {
					rawData.push([d.met, d.alt, d.terrain, d.alt - d.terrain]);}, 
					[['Mission Time', 'Altitude', 'Height from Terrain', 'Terrain Height']], {
					title: 'Altitude Plot',
					theme: 'maximized',
					curveType: 'function',
					backgroundColor: '#1F1F1F',
					textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
					titleTextStyle: {color: 'white', fontName: 'Droid Sans Mono'},
					vAxis: {
						minorGridlines: {color: '#eee',},						
						gridlines: {color: '#fff',},
						textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						titleTextStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						title: 'Height (m)'
					},
					hAxis: {
						minorGridlines: {color: '#eee',},
						gridlines: {color: '#fff',},
						textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						titleTextStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						title: 'Mission Time (s)'
					},
					legend: {
						textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						position: 'bottom'
					}
				}, "chart_div_alt");
			//console.log(type, 'type chart running.');
		};
		if (type === 'aap') {
			$("#monitor").html('<div id="chart_div_aap"></div>');
			//console.log(type, 'type chart div created');
			initKSPWAPIGraph("pe=o.PeA&ap=o.ApA&met=v.missionTime", function (rawData, d) {
					rawData.push([d.met, d.pe, d.ap]);
				}, [
					['Mission Time', 'Periapsis', 'Apoapsis']
				], {
					theme: 'maximized',
					curveType: 'function',
					backgroundColor: '#1F1F1F',
					title: 'Periapsis and Apoapsis',
					textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
					titleTextStyle: {color: 'white', fontName: 'Droid Sans Mono'},
					vAxis: {
						minorGridlines: {color: '#eee',},
						gridlines: {color: '#fff',},
						textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						titleTextStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						title: 'Height (m)'
					},
					hAxis: {
						minorGridlines: {color: '#eee',},
						gridlines: {color: '#fff',},
						textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						titleTextStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						title: 'Mission Time (s)'
					},
					legend: {
						textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						position: 'bottom'
					}
				}, "chart_div_aap");
			//console.log(type, 'type chart running.');
		};
		if (type === 'den') {
			$("#monitor").html('<div id="chart_div_den"></div>');
			//console.log(type, 'type chart div created');
			initKSPWAPIGraph("d=v.atmosphericDensity&met=v.missionTime", function (rawData, d) {
					rawData.push([d.met, d.d]);
				}, [
					['Mission Time', 'Atmospheric Density']
				], {
					theme: 'maximized',
					curveType: 'function',
					backgroundColor: '#1F1F1F',
					title: 'Atmospheric Density Plot',
					textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
					titleTextStyle: {color: 'white', fontName: 'Droid Sans Mono'},
					vAxis: {
						minorGridlines: {color: '#eee',},
						gridlines: {color: '#fff',},
						textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						titleTextStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						title: 'Density'
					},
					hAxis: {
						minorGridlines: {color: '#eee',},
						gridlines: {color: '#fff',},
						textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						titleTextStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						title: 'Mission Time (s)'
					},
					legend: {
						textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						position: 'bottom'
					}
				}, "chart_div_den");
			//console.log(type, 'type chart running.');
		};
		if (type === 'dyp') {
			$("#monitor").html('<div id="chart_div_dyp"></div>');
			//console.log(type, 'type chart div created');
			initKSPWAPIGraph("v=v.surfaceVelocity&d=v.atmosphericDensity&met=v.missionTime", function (rawData, d) {
					rawData.push([d.met, (0.5 * d.d) * Math.pow(d.v, 2)]);
				}, [
					['Mission Time', 'Dynamic Pressure']
				], {
					title: 'Dynamic Pressure Plot',
					hAxis: {
						minorGridlines: {color: '#eee',},
						title: 'Mission Time (s)'
					},
					legend: {
						textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						position: 'bottom'
					}
				}, "chart_div_dyp");
			//console.log(type, 'type chart running.');
		};
		if (type === 'elc') {
			$("#monitor").html('<div id="chart_div_elc"></div>');
			//console.log(type, 'type chart div created');
			initKSPWAPIGraph("el=r.resource[ElectricCharge]&met=v.missionTime", function (rawData, d) {
					if (d.el == -1) {
						rawData.length = 1;
						rawData.push([0, 0]);
					} else {
						rawData.push([d.met, d.el]);
					}
				},

				[
					['Mission Time', 'Electrcity']
				], {
					theme: 'maximized',
					curveType: 'function',
					backgroundColor: '#1F1F1F',
					title: 'Electricity Plot',
					textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
					titleTextStyle: {color: 'white', fontName: 'Droid Sans Mono'},
					vAxis: {
						minorGridlines: {color: '#eee',},
						gridlines: {color: '#fff',},
						textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						titleTextStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						title: 'Amount'
					},
					hAxis: {
						minorGridlines: {color: '#eee',},
						gridlines: {color: '#fff',},
						textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						titleTextStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						title: 'Mission Time (s)'
					},
					legend: {
						textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						position: 'bottom'
					}
				}, "chart_div_elc");
			//console.log(type, 'type chart running.');
		};
		if (type === 'ful') {
			$("#monitor").html('<div id="chart_div_ful"></div>');
			//console.log(type, 'type chart div created');
			initKSPWAPIGraph("fuel=r.resource[LiquidFuel]&oxidiser=r.resource[Oxidizer]&met=v.missionTime", function (rawData, d) {
					if (isNaN(d.fuel) || isNaN(d.oxidiser)) {
						rawData.length = 1;
						rawData.push([0, 0, 0]);
					} else {
						rawData.push([d.met, d.fuel, d.oxidiser]);
					}
				}, [
					['Mission Time', 'Liquid Fuel', 'Oxidiser']
				], {
					theme: 'maximized',
					curveType: 'function',
					backgroundColor: '#1F1F1F',
					title: 'Fuel and Oxidiser Plot',
					textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
					titleTextStyle: {color: 'white', fontName: 'Droid Sans Mono'},
					vAxis: {
						minorGridlines: {color: '#eee',},
						gridlines: {color: '#fff',},
						textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						titleTextStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						title: 'Amount'
					},
					hAxis: {
						minorGridlines: {color: '#eee',},
						gridlines: {color: '#fff',},
						textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						titleTextStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						title: 'Mission Time (s)'
					},
					legend: {
						textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						position: 'bottom'
					}
				}, "chart_div_ful");
			//console.log(type, 'type chart running.');
		};
		if (type === 'gfr') {
			$("#monitor").html('<div id="chart_div_gfr"></div>');
			//console.log(type, 'type chart div created');
			initKSPWAPIGraph("t=s.sensor[ACC]&met=v.missionTime", function (rawData, d) {
					temp = d.t[0];
					temp.splice(0, 0, "Mission Time");
					rawData[0] = temp;
					add = d.t[1];
					add.splice(0, 0, d.met);
					rawData.push(add);
				}, [
					['Mission Time', 'g-force']
				], {
					theme: 'maximized',
					curveType: 'function',
					backgroundColor: '#1F1F1F',
					title: 'g-force Plot',
					textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
					titleTextStyle: {color: 'white', fontName: 'Droid Sans Mono'},
					vAxis: {
						minorGridlines: {color: '#eee',},
						gridlines: {color: '#fff',},
						textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						titleTextStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						title: 'g-force'
					},
					hAxis: {
						minorGridlines: {color: '#eee',},
						gridlines: {color: '#fff',},
						textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						titleTextStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						title: 'Mission Time (s)'
					},
					legend: {
						textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						position: 'bottom'
					}
				}, "chart_div_gfr");
			//console.log(type, 'type chart running.');
		};
		if (type === 'grv') {
			$("#monitor").html('<div id="chart_div_gvr"></div>');
			//console.log(type, 'type chart div created');
			initKSPWAPIGraph("t=s.sensor[GRAV]&met=v.missionTime", function (rawData, d) {
					temp = d.t[0];
					temp.splice(0, 0, "Mission Time");
					rawData[0] = temp;
					add = d.t[1];
					add.splice(0, 0, d.met);
					rawData.push(add);
				}, [
					['Mission Time', 'Gravity']
				], {
					theme: 'maximized',
					curveType: 'function',
					backgroundColor: '#1F1F1F',
					title: 'Gravity Plot',
					textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
					titleTextStyle: {color: 'white', fontName: 'Droid Sans Mono'},
					vAxis: {
						minorGridlines: {color: '#eee',},
						gridlines: {color: '#fff',},
						textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						titleTextStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						title: 'Gravity (m/s^2)'
					},
					hAxis: {
						minorGridlines: {color: '#eee',},
						gridlines: {color: '#fff',},
						textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						titleTextStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						title: 'Mission Time (s)'
					},
					legend: {
						textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						position: 'bottom'
					}
				}, "chart_div_grv");
			//console.log(type, 'type chart running.');
		};
		if (type === 'inc') {
			$("#monitor").html('<div id="chart_div_inc"></div>');
			//console.log(type, 'type chart div created');
			initKSPWAPIGraph("in=o.inclination&aop=o.argumentOfPeriapsis&met=v.missionTime", function (rawData, d) {
					rawData.push([d.met, d. in , d.aop]);
				}, [
					['Mission Time', 'Inclination', 'Argument of Periapsis']
				], {
					theme: 'maximized',
					curveType: 'function',
					backgroundColor: '#1F1F1F',
					title: 'Orbital Inclination',
					textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
					titleTextStyle: {color: 'white', fontName: 'Droid Sans Mono'},
					vAxis: {
						minorGridlines: {color: '#eee',},
						gridlines: {color: '#fff',},
						textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						titleTextStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						title: 'Value (Degrees)'
					},
					hAxis: {
						minorGridlines: {color: '#eee',},
						gridlines: {color: '#fff',},
						textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						titleTextStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						title: 'Mission Time (s)'
					},
					legend: {
						textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						position: 'bottom'
					}
				}, "chart_div_inc");
			//console.log(type, 'type chart running.');
		};
		if (type === 'prs') {
			$("#monitor").html('<div id="chart_div_prs"></div>');
			//console.log(type, 'type chart div created');
			initKSPWAPIGraph("t=s.sensor[PRES]&met=v.missionTime", function (rawData, d) {
					temp = d.t[0];
					temp.splice(0, 0, "Mission Time");
					rawData[0] = temp;
					add = d.t[1];
					add.splice(0, 0, d.met);
					rawData.push(add);
				}, [
					['Mission Time', 'Pressure']
				], {
					theme: 'maximized',
					curveType: 'function',
					backgroundColor: '#1F1F1F',
					title: 'Pressure Plot',
					textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
					titleTextStyle: {color: 'white', fontName: 'Droid Sans Mono'},
					vAxis: {
						minorGridlines: {color: '#eee',},
						gridlines: {color: '#fff',},
						textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						titleTextStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						title: 'Pressure'
					},
					hAxis: {
						minorGridlines: {color: '#eee',},
						gridlines: {color: '#fff',},
						textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						titleTextStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						title: 'Mission Time (s)'
					},
					legend: {
						textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						position: 'bottom'
					}
				}, "chart_div_prs");
			//console.log(type, 'type chart running.');
		};
		if (type === 'tmp') {
			$("#monitor").html('<div id="chart_div_tmp"></div>');
			//console.log(type, 'type chart div created');
			initKSPWAPIGraph("t=s.sensor[TEMP]&met=v.missionTime", function (rawData, d) {
					temp = d.t[0];
					temp.splice(0, 0, "Mission Time");
					rawData[0] = temp;
					add = d.t[1];
					add.splice(0, 0, d.met);
					rawData.push(add);
				}, [
					['Mission Time', 'Temperature']
				], {
					theme: 'maximized',
					curveType: 'function',
					backgroundColor: '#1F1F1F',
					title: 'Temperature Plot',
					textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
					titleTextStyle: {color: 'white', fontName: 'Droid Sans Mono'},
					vAxis: {
						minorGridlines: {color: '#eee',},
						gridlines: {color: '#fff',},
						textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						titleTextStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						title: 'Temperature'
					},
					hAxis: {
						minorGridlines: {color: '#eee',},
						gridlines: {color: '#fff',},
						textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						titleTextStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						title: 'Mission Time (s)'
					},
					legend: {
						textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						position: 'bottom'
					}
				}, "chart_div_tmp");
			//console.log(type, 'type chart running.');
		};
		if (type === 'vel') {
			$("#monitor").html('<div id="chart_div_vel"></div>');
			//console.log(type, 'type chart div created');
			initKSPWAPIGraph("o=v.orbitalVelocity&m=v.surfaceVelocity&av=v.angularVelocity&sv=v.surfaceSpeed&vs=v.verticalSpeed&met=v.missionTime", function (rawData, d) {
					rawData.push([d.met, d.m, d.vs, d.sv, d.av, d.o]);
				}, [
					['Mission Time', 'Actual', 'Vertical', 'Surface', 'Angular', 'Orbital']
				], {
					theme: 'maximized',
					curveType: 'function',
					backgroundColor: '#1F1F1F',
					title: 'Velocity Plot',
					textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
					titleTextStyle: {color: 'white', fontName: 'Droid Sans Mono'},
					vAxis: {
						minorGridlines: {color: '#eee',},
						gridlines: {color: '#fff',},
						textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						titleTextStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						title: 'Velocity (m/s)'
					},
					hAxis: {
						minorGridlines: {color: '#eee',},
						gridlines: {color: '#fff',},
						textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						titleTextStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						title: 'Mission Time (s)'
					},
					legend: {
						textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						position: 'bottom'
					}
				}, "chart_div_vel");
			//console.log(type, 'type chart running.');
		};
		if (type === 'tme') {
			$("#monitor").html('<div id="chart_div_tme"></div>');
			//console.log(type, 'type chart div created');
			initKSPWAPIGraph("pe=o.timeToPe&ap=o.timeToAp&met=v.missionTime", function (rawData, d) {
					rawData.push([d.met, d.pe, d.ap]);
				}, [
					['Mission Time', 'Time to Periapsis', 'Time to Apoapsis']
				], {
					theme: 'maximized',
					curveType: 'function',
					backgroundColor: '#1F1F1F',
					title: 'Time to Periapsis and Apoapsis',
					textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
					titleTextStyle: {color: 'white', fontName: 'Droid Sans Mono'},
					vAxis: {
						minorGridlines: {color: '#eee',},
						gridlines: {color: '#fff',},
						textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						titleTextStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						title: 'Time (s)'
					},
					hAxis: {
						minorGridlines: {color: '#eee',},
						gridlines: {color: '#fff',},
						textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						titleTextStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						title: 'Mission Time (s)'
					},
					legend: {
						textStyle: {color: 'white', fontName: 'Droid Sans Mono'},
						position: 'bottom'
					}
				}, "chart_div_tme");
			//console.log(type, 'type chart running.');			
		};
		if (type === 'map'){
		  	$("#monitor").html('<div id="map" class="map"></div>');
		  	var previousBody = "";
		  	var newBody;
		  	map = new L.KSP.Map('map', {
		  			layers: [L.KSP.CelestialBody.KERBIN],
		  			zoom: L.KSP.CelestialBody.KERBIN.defaultLayer.options.maxZoom,
		  			center: [-0.1027, -74.5754],
		  			bodyControl: false,
		  			layerControl: true,
		  			scaleControl: true
		  		});
		  	map.fitWorld();
		  	rawData = [
		  		[0]
		  	];
		  	L.Icon.Default.imagePath = 'img/';
		  	var marker = [L.marker([0, 0]), L.marker([0, 0])];
		  	marker[0].addTo(map);
		  	jKSPWAPI.initPoll("longs=v.long&lat=v.lat&name=v.name&alt=v.altitude&m=v.surfaceVelocity&body=b.name", function (rawData) {}, function (rawData, d) {
		  			if (previousBody != d.body) {
		  				try {
		  					newBody = L.KSP.CelestialBody[d.body.toUpperCase()];
		  					newBody.addTo(map);
		  					previousBody = d.body;
		  				} catch (e) {
		  					alert("Body not supported yet.")
		  					previousBody = d.body;
		  				}
		  			}

		  			if (!isNaN(d.lat) && !isNaN(d.longs)) {
		  				marker[0].setLatLng([d.lat, d.longs]);
		  				marker[0].bindPopup(d.name + " </br>Altitude: " + d.alt + "</br>Surface Velocity: " + d.m);
		  				marker[0].update();
		  			}

		  		}, rawData);
    	};
    	SAS: if (type === 'sas'){
    		if (sasOn === true){
    			$("#monitor").html('<div id="blank"></div>');
    			sasOn = false;
    			return SAS;
    		}
    		$("#monitor").html('<div id="sasPanel"></div>');
    		$('#sasPanel').append('<button class="sasButton" id="off">Off</button>');
    		$('#sasPanel').append('<button class="sasButton" id="node">Node</button>');
    		$('#sasPanel').append('<button class="sasButton" id="retro">Retrograde</button>');
    		$('#sasPanel').append('<button class="sasButton" id="pro">Prograde</button>');
    		$('#sasPanel').append('<button class="sasButton" id="normal">Normal</button>');
    		$('#sasPanel').append('<button class="sasButton" id="normal">Normal</button>');
    		$('#sasPanel').append('<button class="sasButton" id="radial">Radial</button>');
    		$('#sasPanel').append('<button class="sasButton" id="radial">Radial</button>');
    		return sasOn;
    	};
	};
};

function command(command) {
  jKSPWAPI.call("ret=" + command, function (d) {
    if (d.ret == 5) {
      sNotify.addToQueue("Mechjeb not found.");
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
        sNotify.addToQueue("Mechjeb not found.");
      } else if (d.ret > 0) {
        jKSPWAPI.generateNotificationWithCode(d.ret);
      }
    });
}

function monitorToggle(that, type){
    if (monitorOn === true) { // Monitor turns off.
        monitorOn = false;
        $("#monitor").html('<div id="blank"></div>'); // Clears the monitor.
        $("#monitorStatus").attr("class","pwrOff"); // Changes the status of the monitor button to off using a class.
        $('button').removeClass('statusOn'); // Turns off buttons.
        //console.log('MonitorOn is', monitorOn);
        return;
    };
    if (monitorOn === false) { // Monitor turns on.
        monitorOn = true;
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
	window.open('http://pastebin.com/raw.php?i=UYaHSaxd', 'Help', 'height=500px,width=600px,resizeable=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes');
};

function flashCom() {
	$('#comLink').css('background', '#FFEA61').delay(150).queue(function(d){
		$('#comLink').css('background', '');
		$('#comLink').dequeue();
	});
};