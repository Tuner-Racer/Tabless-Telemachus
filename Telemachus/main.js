//  | ## Index ##
//  | Monitordraw - Draws the graphs on the monitor div
//  | 

var monitorOn = false;

function monitorDraw(that, type) { // 'That' is only used for console logs by the way.
	if (monitorOn === true) { // Can't display anything without the monitor being on.
		if (type === 'alt') {
			$("#monitor").html('<div id="chart_div_alt"/>');
			console.log(type, 'type chart div created');
			initKSPWAPIGraph("alt=v.altitude&terrain=v.heightFromTerrain&met=v.missionTime", function (rawData, d) {
					rawData.push([d.met, d.alt, d.terrain, d.alt - d.terrain]);
				}, [
					['Mission Time', 'Altitude', 'Height from Terrain', 'Terrain Height']
				], {
					title: 'Altitude Plot',
					vAxis: {
						title: 'Height (m)'
					},
					hAxis: {
						title: 'Mission Time (s)'
					},
					legend: {
						position: 'bottom'
					}
				}, "chart_div_alt");
			console.log(type, 'type chart running.');
		};
		if (type === 'aap') {
			$("#monitor").html('<div id="chart_div_aap"/>');
			console.log(type, 'type chart div created');
			initKSPWAPIGraph("pe=o.PeA&ap=o.ApA&met=v.missionTime", function (rawData, d) {
					rawData.push([d.met, d.pe, d.ap]);
				}, [
					['Mission Time', 'Periapsis', 'Apoapsis']
				], {
					title: 'Periapsis and Apoapsis',
					vAxis: {
						title: 'Height (m)'
					},
					hAxis: {
						title: 'Mission Time (s)'
					},
					legend: {
						position: 'bottom'
					}
				}, "chart_div_aap");
			console.log(type, 'type chart running.');
		};
		if (type === 'den') {
			$("#monitor").html('<div id="chart_div_den"/>');
			console.log(type, 'type chart div created');
			initKSPWAPIGraph("d=v.atmosphericDensity&met=v.missionTime", function (rawData, d) {
					rawData.push([d.met, d.d]);
				}, [
					['Mission Time', 'Atmospheric Density']
				], {
					title: 'Atmospheric Density Plot',
					vAxis: {
						title: 'Density'
					},
					hAxis: {
						title: 'Mission Time (s)'
					},
					legend: {
						position: 'bottom'
					}
				}, "chart_div_den");
			console.log(type, 'type chart running.');
		};
		if (type === 'dyp') {
			$("#monitor").html('<div id="chart_div_dyp"/>');
			console.log(type, 'type chart div created');
			initKSPWAPIGraph("v=v.surfaceVelocity&d=v.atmosphericDensity&met=v.missionTime", function (rawData, d) {
					rawData.push([d.met, (0.5 * d.d) * Math.pow(d.v, 2)]);
				}, [
					['Mission Time', 'Dynamic Pressure']
				], {
					title: 'Dynamic Pressure Plot',
					hAxis: {
						title: 'Mission Time (s)'
					},
					legend: {
						position: 'bottom'
					}
				}, "chart_div_dyp");
			console.log(type, 'type chart running.');
		};
		if (type === 'elc') {
			$("#monitor").html('<div id="chart_div_elc"/>');
			console.log(type, 'type chart div created');
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
					title: 'Electricity Plot',
					vAxis: {
						title: 'Amount'
					},
					hAxis: {
						title: 'Mission Time (s)'
					},
					legend: {
						position: 'bottom'
					}
				}, "chart_div_elc");
			console.log(type, 'type chart running.');
		};
		if (type === 'ful') {
			$("#monitor").html('<div id="chart_div_ful"/>');
			console.log(type, 'type chart div created');
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
					title: 'Fuel and Oxidiser Plot',
					vAxis: {
						title: 'Amount'
					},
					hAxis: {
						title: 'Mission Time (s)'
					},
					legend: {
						position: 'bottom'
					}
				}, "chart_div_ful");
			console.log(type, 'type chart running.');
		};
		if (type === 'gfr') {
			$("#monitor").html('<div id="chart_div_gfr"/>');
			console.log(type, 'type chart div created');
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
					title: 'g-force Plot',
					vAxis: {
						title: 'g-force'
					},
					hAxis: {
						title: 'Mission Time (s)'
					},
					legend: {
						position: 'bottom'
					}
				}, "chart_div_gfr");
			console.log(type, 'type chart running.');
		};
		if (type === 'grv') {
			$("#monitor").html('<div id="chart_div_gvr"/>');
			console.log(type, 'type chart div created');
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
					title: 'Gravity Plot',
					vAxis: {
						title: 'Gravity (m/s^2)'
					},
					hAxis: {
						title: 'Mission Time (s)'
					},
					legend: {
						position: 'bottom'
					}
				}, "chart_div_grv");
			console.log(type, 'type chart running.');
		};
		if (type === 'inc') {
			$("#monitor").html('<div id="chart_div_inc"/>');
			console.log(type, 'type chart div created');
			initKSPWAPIGraph("in=o.inclination&aop=o.argumentOfPeriapsis&met=v.missionTime", function (rawData, d) {
					rawData.push([d.met, d. in , d.aop]);
				}, [
					['Mission Time', 'Inclination', 'Argument of Periapsis']
				], {
					title: 'Orbital Inclination',
					vAxis: {
						title: 'Value (Degrees)'
					},
					hAxis: {
						title: 'Mission Time (s)'
					},
					legend: {
						position: 'bottom'
					}
				}, "chart_div_inc");
			console.log(type, 'type chart running.');
		};
		if (type === 'prs') {
			$("#monitor").html('<div id="chart_div_prs"/>');
			console.log(type, 'type chart div created');
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
					title: 'Pressure Plot',
					vAxis: {
						title: 'Pressure'
					},
					hAxis: {
						title: 'Mission Time (s)'
					},
					legend: {
						position: 'bottom'
					}
				}, "chart_div_prs");
			console.log(type, 'type chart running.');
		};
		if (type === 'tmp') {
			$("#monitor").html('<div id="chart_div_tmp"/>');
			console.log(type, 'type chart div created');
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
					title: 'Temperature Plot',
					vAxis: {
						title: 'Temperature'
					},
					hAxis: {
						title: 'Mission Time (s)'
					},
					legend: {
						position: 'bottom'
					}
				}, "chart_div_tmp");
			console.log(type, 'type chart running.');
		};
		if (type === 'vel') {
			$("#monitor").html('<div id="chart_div_vel"/>');
			console.log(type, 'type chart div created');
			initKSPWAPIGraph("o=v.orbitalVelocity&m=v.surfaceVelocity&av=v.angularVelocity&sv=v.surfaceSpeed&vs=v.verticalSpeed&met=v.missionTime", function (rawData, d) {
					rawData.push([d.met, d.m, d.vs, d.sv, d.av, d.o]);
				}, [
					['Mission Time', 'Actual', 'Vertical', 'Surface', 'Angular', 'Orbital']
				], {
					title: 'Velocity Plot',
					vAxis: {
						title: 'Velocity (m/s)'
					},
					hAxis: {
						title: 'Mission Time (s)'
					},
					legend: {
						position: 'bottom'
					}
				}, "chart_div_vel");
			console.log(type, 'type chart running.');
		};
		if (type === 'tme') {
			$("#monitor").html('<div id="chart_div_tme"/>');
			console.log(type, 'type chart div created');
			initKSPWAPIGraph("pe=o.timeToPe&ap=o.timeToAp&met=v.missionTime", function (rawData, d) {
					rawData.push([d.met, d.pe, d.ap]);
				}, [
					['Mission Time', 'Time to Periapsis', 'Time to Apoapsis']
				], {
					title: 'Time to Periapsis and Apoapsis',
					vAxis: {
						title: 'Time (s)'
					},
					hAxis: {
						title: 'Mission Time (s)'
					},
					legend: {
						position: 'bottom'
					}
				}, "chart_div_tme");
			console.log(type, 'type chart running.');
		};
	};
}