'use strict';(function(c,j){function f(a,d){for(var b in a)if(a.hasOwnProperty(b)&&!1===d(a[b],b,a))break}function g(a,d,b){a=a.match||(a.match=c.resolve(b));return a.test?a.test(d):d===a}var h=c.config.data;c.on("initialized",function(a){var d=a.uri;f(h.shim,function(b){var e=b.deps;if(e&&g(b,d)){for(b=0;b<e.length;b++)a.dependencies.push(e[b]);return!1}})});c.on("compile",function(a){var d=a.uri;f(h.shim,function(b,e){var c=b.exports;if(c&&g(b,d,e))return a.exports="function"===typeof c?c():j[c],
!1})})})(seajs,this);
