!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.stats=t():(e.playkit=e.playkit||{},e.playkit.services=e.playkit.services||{},e.playkit.services.stats=t())}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=13)}([function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Map;r(this,e),this.headers=t}return i(e,[{key:"getUrl",value:function(e){return e+"/service/"+this.service+(this.action?"/action/"+this.action:"")}},{key:"doHttpRequest",value:function(){var e=this;if(!this.url)throw new Error("serviceUrl is mandatory for request builder");var t=new XMLHttpRequest;return new Promise(function(n,r){t.onreadystatechange=function(){if(4===t.readyState)if(200===t.status){var e=JSON.parse(t.responseText);e&&"object"===(void 0===e?"undefined":o(e))&&e.code&&e.message?r(e):n(e)}else r(t.responseText)},t.open(e.method,e.url),e.headers.forEach(function(e,n){t.setRequestHeader(n,e)}),t.send(e.params)})}}]),e}();t.default=u},,function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.OVPConfiguration=void 0;var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(5),u={serviceUrl:"https://cdnapisec.kaltura.com",cdnUrl:"//cdnapisec.kaltura.com",serviceParams:{apiVersion:"3.3.0",format:1}},a=function(){function e(){r(this,e)}return o(e,null,[{key:"set",value:function(e){e&&Object.assign(u,e)}},{key:"get",value:function(){return(0,i.clone)(u)}}]),e}();t.default=a,t.OVPConfiguration=a},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function e(t){r(this,e),this.hasError=!1,"KalturaAPIException"===t.objectType?(this.hasError=!0,this.error=new i(t.code,t.message)):t.error&&"KalturaAPIException"===t.error.objectType?(this.hasError=!0,this.error=new i(t.error.code,t.error.message)):this.data=t};t.default=o;var i=function e(t,n){r(this,e),this.code=t,this.message=n}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.MultiRequestResult=void 0;var c=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(0),l=r(s),f=n(6),p=r(f),v=n(3),d=r(v),y=function(e){function t(){var e,n,r,o;i(this,t);for(var a=arguments.length,c=Array(a),s=0;s<a;s++)c[s]=arguments[s];return n=r=u(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(c))),r.requests=[],o=n,u(r,o)}return a(t,e),c(t,[{key:"add",value:function(e){this.requests.push(e);var t={},n={service:e.service,action:e.action};return Object.assign(t,o({},this.requests.length,Object.assign(n,e.params))),Object.assign(t,this.params),this.params=t,this}},{key:"execute",value:function(){var e=this;try{this.params=JSON.stringify(this.params)}catch(e){t._logger.error(""+e.message)}return new Promise(function(t,n){e.doHttpRequest().then(function(e){t(new b(e))},function(e){n("Error on multiRequest execution, error <"+e+">.")})})}}]),t}(l.default);y._logger=(0,p.default)("MultiRequestBuilder"),t.default=y;var b=t.MultiRequestResult=function e(t){var n=this;i(this,e),this.results=[],this.success=!0,(t.result?t.result:t).forEach(function(t){var r=new d.default(t);if(n.results.push(r),r.hasError)return e._logger.error("Service returned an error with error code: "+r.error.code+" and message: "+r.error.message+"."),void(n.success=!1)})};b._logger=(0,p.default)("MultiRequestResult")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=function e(t){var n=void 0;return Array.isArray(t)?(n=t.length>0?t.slice(0):[],n.forEach(function(t,o){("object"===(void 0===t?"undefined":r(t))&&t!=={}||Array.isArray(t)&&t.length>0)&&(n[o]=e(t))})):"object"===(void 0===t?"undefined":r(t))?(n=Object.assign({},t),Object.keys(n).forEach(function(t){("object"===r(n[t])&&n[t]!=={}||Array.isArray(n[t])&&n[t].length>0)&&(n[t]=e(n[t]))})):n=t,n};t.clone=o},function(e,t,n){"use strict";function r(e){return e?a.get(e):a}function o(e){return r(e).getLevel()}function i(e,t){r(t).setLevel(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.setLogLevel=t.getLogLevel=t.LogLevel=void 0;var u=n(7),a=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(u),c={DEBUG:a.DEBUG,INFO:a.INFO,TIME:a.TIME,WARN:a.WARN,ERROR:a.ERROR,OFF:a.OFF};a.useDefaults({defaultLevel:a.ERROR}),t.default=r,t.LogLevel=c,t.getLogLevel=o,t.setLogLevel=i},function(e,t,n){var r,o;/*!
 * js-logger - http://github.com/jonnyreeves/js-logger
 * Jonny Reeves, http://jonnyreeves.co.uk/
 * js-logger may be freely distributed under the MIT license.
 */
!function(i){"use strict";var u={};u.VERSION="1.4.1";var a,c={},s=function(e,t){return function(){return t.apply(e,arguments)}},l=function(){var e,t,n=arguments,r=n[0];for(t=1;t<n.length;t++)for(e in n[t])e in r||!n[t].hasOwnProperty(e)||(r[e]=n[t][e]);return r},f=function(e,t){return{value:e,name:t}};u.DEBUG=f(1,"DEBUG"),u.INFO=f(2,"INFO"),u.TIME=f(3,"TIME"),u.WARN=f(4,"WARN"),u.ERROR=f(8,"ERROR"),u.OFF=f(99,"OFF");var p=function(e){this.context=e,this.setLevel(e.filterLevel),this.log=this.info};p.prototype={setLevel:function(e){e&&"value"in e&&(this.context.filterLevel=e)},getLevel:function(){return this.context.filterLevel},enabledFor:function(e){var t=this.context.filterLevel;return e.value>=t.value},debug:function(){this.invoke(u.DEBUG,arguments)},info:function(){this.invoke(u.INFO,arguments)},warn:function(){this.invoke(u.WARN,arguments)},error:function(){this.invoke(u.ERROR,arguments)},time:function(e){"string"==typeof e&&e.length>0&&this.invoke(u.TIME,[e,"start"])},timeEnd:function(e){"string"==typeof e&&e.length>0&&this.invoke(u.TIME,[e,"end"])},invoke:function(e,t){a&&this.enabledFor(e)&&a(t,l({level:e},this.context))}};var v=new p({filterLevel:u.OFF});!function(){var e=u;e.enabledFor=s(v,v.enabledFor),e.debug=s(v,v.debug),e.time=s(v,v.time),e.timeEnd=s(v,v.timeEnd),e.info=s(v,v.info),e.warn=s(v,v.warn),e.error=s(v,v.error),e.log=e.info}(),u.setHandler=function(e){a=e},u.setLevel=function(e){v.setLevel(e);for(var t in c)c.hasOwnProperty(t)&&c[t].setLevel(e)},u.getLevel=function(){return v.getLevel()},u.get=function(e){return c[e]||(c[e]=new p(l({name:e},v.context)))},u.createDefaultHandler=function(e){e=e||{},e.formatter=e.formatter||function(e,t){t.name&&e.unshift("["+t.name+"]")};var t={},n=function(e,t){Function.prototype.apply.call(e,console,t)};return"undefined"==typeof console?function(){}:function(r,o){r=Array.prototype.slice.call(r);var i,a=console.log;o.level===u.TIME?(i=(o.name?"["+o.name+"] ":"")+r[0],"start"===r[1]?console.time?console.time(i):t[i]=(new Date).getTime():console.timeEnd?console.timeEnd(i):n(a,[i+": "+((new Date).getTime()-t[i])+"ms"])):(o.level===u.WARN&&console.warn?a=console.warn:o.level===u.ERROR&&console.error?a=console.error:o.level===u.INFO&&console.info?a=console.info:o.level===u.DEBUG&&console.debug&&(a=console.debug),e.formatter(r,o),n(a,r))}},u.useDefaults=function(e){u.setLevel(e&&e.defaultLevel||u.DEBUG),u.setHandler(u.createDefaultHandler(e))},r=u,void 0!==(o="function"==typeof r?r.call(t,n,t,e):r)&&(e.exports=o)}()},,function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(12),s=r(c),l=n(0),f=r(l),p=n(2),v=r(p),d=n(14),y=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u(t,e),a(t,null,[{key:"collect",value:function(e,t,n,r){var o=v.default.get(),i={};Object.assign(i,o.serviceParams,{ks:t,clientTag:"html5:v"+n},r);var u=new f.default;return u.service="stats",u.action="collect",u.method="GET",u.tag="stats-collect",u.params=i,u.url=e+"?service="+u.service+"&action="+u.action+"&"+(0,d.param)(u.params),u}}]),t}(s.default);t.default=y},,,function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(4),a=r(u),c=n(2),s=r(c),l=function(){function e(){o(this,e)}return i(e,null,[{key:"getMultiRequest",value:function(e,t,n){var r=s.default.get(),o=r.serviceParams;Object.assign(o,{ks:t,clientTag:"html5:v"+e}),n&&Object.assign(o,{partnerId:n});var i=new Map;i.set("Content-Type","application/json");var u=new a.default(i);return u.method="POST",u.service="multirequest",u.url=u.getUrl(r.serviceUrl),u.params=o,u}}]),e}();t.default=l},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.VERSION=t.NAME=t.RequestBuilder=t.OVPConfiguration=t.OVPStatsService=void 0;var o=n(0),i=r(o),u=n(2),a=r(u),c=n(9),s=r(c);t.OVPStatsService=s.default,t.OVPConfiguration=a.default,t.RequestBuilder=i.default,t.NAME="playkit-js-providers-stats-service",t.VERSION="2.3.0"},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=function(e){var t=[],n=/\[\]$/,o=function(e){return"[object Array]"===Object.prototype.toString.call(e)},i=function(e,n){n="function"==typeof n?n():null===n?"":void 0===n?"":n,t[t.length]=encodeURIComponent(e)+"="+encodeURIComponent(n)};return function e(u,a){var c=void 0,s=void 0,l=void 0;if(u)if(o(a))for(c=0,s=a.length;c<s;c++)n.test(u)?i(u,a[c]):e(u+":"+("object"===r(a[c])?c:""),a[c]);else if(a&&"[object Object]"===String(a))for(l in a)e(u+":"+l,a[l]);else i(u,a);else if(o(a))for(c=0,s=a.length;c<s;c++)i(a[c].name,a[c].value);else for(l in a)e(l,a[l]);return t}("",e).join("&").replace(/%20/g,"+")};t.param=o}])});
//# sourceMappingURL=playkit-stats-service.js.map