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
	});













// /*global todomvc */
// 'use strict';

// /**
//  * Directive that executes an expression when the element it is applied to loses focus
// */
// todomvc.directive('todoBlur', function () {
// 	return function (scope, elem, attrs) {
// 		console.log(elem);
// 		elem.bind('blur', function () {
// 			scope.$apply(attrs.todoBlur);
// 		});
// 	};
// });







// todomvc.directive('todoFocus', function ($timeout) {
// 	return function (scope, elem, attrs) {
// 		scope.$watch(attrs.todoFocus, function (newVal) {
// 			if (newVal) {
// 				$timeout(function () {
// 					elem[0].focus();
// 				}, 0, false);
// 			}
// 		});
// 	};
// });
