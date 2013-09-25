'use strict';


// Declare app level module which depends on filters, and services
angular.module('Galery', ['Galery.controllers', 'Galery.services'])



[
	{ type: 'folder', id: 1, parent: null, name: 'HOME' },
	{ type: 'file',   id: 2, parent: 1,    name: 'screenshot_1.jpg', src: 'http://fa...' }
	{ type: 'file',   id: 3, parent: 1,    name: 'screenshot_2.jpg', src: 'http://fa...' }
	{ type: 'folder', id: 4, parent: 1,    name: 'SEA' },
	{ type: 'file',   id: 5, parent: 4,    name: 'screenshot_3.jpg', src: 'http://fa...' }
]


[ type: 'folder', id: 4, parent: 1, name: 'SEA' }, { type: 'folder', id: 1, parent: null, name: 'HOME' }]
<=>