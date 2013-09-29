'use strict';

/* Directives */

angular.module('Galery.directives', [])
	.directive('todoFocus', function ($timeout) {
		return function (scope, elem, attrs) {
			scope.$watch(attrs.todoFocus, function (newVal) {
				if (newVal) {
					$timeout(function () {
						elem[0].focus();
					}, 0, false);
				}
			});
		};
	})
	.directive('todoBlur', function () {
		return function (scope, elem, attrs) {
			elem.bind('blur', function () {
				scope.$apply(attrs.todoBlur);
			});
		};
	});
