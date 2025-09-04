import IMask from 'imask';

function destroyMask(el) { el._mask?.destroy?.(); }

function makeNumberMask(el, {min = 1, max = 99} = {}) {
	el._mask = IMask(el, {
	    mask: Number,
	    min, max,
	    scale: 0,
	    radix: ',',
	    thousandsSeparator: ''
	});
}

export default {
	install(app) {
		app.directive('imask-int', {
			mounted(el, binding) { makeNumberMask(el, binding?.value); },
			unmounted: destroyMask,
		});
		app.directive('mask-phone', {
			mounted(el) { el._mask = IMask(el, { mask: '+{7} (000) 000-00-00' }); },
			unmounted: destroyMask,
		});
	}
}