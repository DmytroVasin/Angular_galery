'use strict';


// Declare app level module which depends on filters, and services
angular.module('Galery', ['Galery.controllers', 'Galery.services'])



// [
// 	{ type: 'folder', id: 0, parent: null, name: 'HOME' },
// 	{ type: 'file',   id: 1, parent: 1,    name: 'screenshot_1.jpg', src: 'http://fa...' }
// 	{ type: 'file',   id: 2, parent: 1,    name: 'screenshot_2.jpg', src: 'http://fa...' }
// 	{ type: 'folder', id: 3, parent: 1,    name: 'SEA' },
// 	{ type: 'file',   id: 4, parent: 4,    name: 'screenshot_3.jpg', src: 'http://fa...' }
// ]


// [ type: 'folder', id: 3, parent: 1, name: 'SEA' }, { type: 'folder', id: 0, parent: null, name: 'HOME' }]
// <=>



// [
// 	{"id": 1,"type": "folder","parent": null,"name": "HOME"},
// 	{"id":1, "type":"file", "parent":0, "name":"9979124636_b9259eff29", "src":"http://farm4.staticflickr.com/3809/9979124636_b9259eff29_q.jpg"},
// 	{"id":2, "type":"file", "parent":0, "name":"9979135575_ae3db72761", "src":"http://farm4.staticflickr.com/3727/9979135575_ae3db72761_q.jpg"},
// 	{"id":3, "type":"file", "parent":0, "name":"9979181376_1d21bf4b13", "src":"http://farm6.staticflickr.com/5324/9979181376_1d21bf4b13_q.jpg"},
// 	{"id":4, "type":"file", "parent":0, "name":"9979123225_238012a5ed", "src":"http://farm6.staticflickr.com/5536/9979123225_238012a5ed_q.jpg"}
// ]