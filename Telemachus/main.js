var monitorOn = false;

function monitorDraw(that, type) {
	if (monitorOn === true) {
		if (type === 'alt') {
			$("#monitor").html('<div id="chart_div_alt"/>');
			console.log(type, 'type chart div created')
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
			console.log(type, 'type chart div created')
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
	};
}