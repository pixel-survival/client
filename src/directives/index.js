import Vue from 'vue';

Vue.directive('lowercase', {
	update (el) {
		el.value = el.value.toLowerCase()
	},
});