export function set_image(){
	var el = document.getElementById('first');
	var resize = new Croppie(el, {
		viewport: { width: 100, height: 100 },
		boundary: { width: 300, height: 300 },
		showZoomer: true,
		enableResize: false,
		enableOrientation: true,
		mouseWheelZoom: 'ctrl',
		useCORS:true
	});
	resize.bind({
		url: el,
	});
}
