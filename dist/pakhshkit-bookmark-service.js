!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.bookmark=t():(e.pakhshkit=e.pakhshkit||{},e.pakhshkit.services=e.pakhshkit.services||{},e.pakhshkit.services.bookmark=t())}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=13)}([function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Map;r(this,e),this.headers=t}return i(e,[{key:"getUrl",value:function(e){return e+"/service/"+this.service+(this.action?"/action/"+this.action:"")}},{key:"doHttpRequest",value:function(){var e=this;if(!this.url)throw new Error("serviceUrl is mandatory for request builder");var t=new XMLHttpRequest;return new Promise(function(n,r){t.onreadystatechange=function(){if(4===t.readyState)if(200===t.status){var e=void 0;try{e=JSON.parse(t.responseText)}catch(e){return r(e.message+", "+t.responseText)}e&&"object"===(void 0===e?"undefined":o(e))&&e.code&&e.message?r(e):n(e)}else r(t.responseText)},t.open(e.method,e.url),e.headers.forEach(function(e,n){t.setRequestHeader(n,e)}),t.send(e.params)})}}]),e}();t.default=a},,function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function e(t){r(this,e),this.hasError=!1,"KontorolAPIException"===t.objectType?(this.hasError=!0,this.error=new i(t.code,t.message)):t.error&&"KontorolAPIException"===t.error.objectType?(this.hasError=!0,this.error=new i(t.error.code,t.error.message)):this.data=t};t.default=o;var i=function e(t,n){r(this,e),this.code=t,this.message=n}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.MultiRequestResult=void 0;var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(0),l=r(c),f=n(5),p=r(f),v=n(2),d=r(v),y=function(e){function t(){var e,n,r,o;i(this,t);for(var u=arguments.length,s=Array(u),c=0;c<u;c++)s[c]=arguments[c];return n=r=a(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(s))),r.requests=[],o=n,a(r,o)}return u(t,e),s(t,[{key:"add",value:function(e){this.requests.push(e);var t={},n={service:e.service,action:e.action};return Object.assign(t,o({},this.requests.length,Object.assign(n,e.params))),Object.assign(t,this.params),this.params=t,this}},{key:"execute",value:function(){var e=this;try{this.params=JSON.stringify(this.params)}catch(e){t._logger.error(""+e.message)}return new Promise(function(t,n){e.doHttpRequest().then(function(e){t(new h(e))},function(e){n("Error on multiRequest execution, error <"+e+">.")})})}}]),t}(l.default);y._logger=(0,p.default)("MultiRequestBuilder"),t.default=y;var h=t.MultiRequestResult=function e(t){var n=this;i(this,e),this.results=[],this.success=!0,(t.result?t.result:t).forEach(function(t){var r=new d.default(t);if(n.results.push(r),r.hasError)return e._logger.error("Service returned an error with error code: "+r.error.code+" and message: "+r.error.message+"."),void(n.success=!1)})};h._logger=(0,p.default)("MultiRequestResult")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=function e(t){var n=void 0;return Array.isArray(t)?(n=t.length>0?t.slice(0):[],n.forEach(function(t,o){("object"===(void 0===t?"undefined":r(t))&&t!=={}||Array.isArray(t)&&t.length>0)&&(n[o]=e(t))})):"object"===(void 0===t?"undefined":r(t))?(n=Object.assign({},t),Object.keys(n).forEach(function(t){("object"===r(n[t])&&n[t]!=={}||Array.isArray(n[t])&&n[t].length>0)&&(n[t]=e(n[t]))})):n=t,n};t.clone=o},function(e,t,n){"use strict";function r(e){return e?u.get(e):u}function o(e){return r(e).getLevel()}function i(e,t){r(t).setLevel(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.setLogLevel=t.getLogLevel=t.LogLevel=void 0;var a=n(6),u=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(a),s={DEBUG:u.DEBUG,INFO:u.INFO,TIME:u.TIME,WARN:u.WARN,ERROR:u.ERROR,OFF:u.OFF};u.useDefaults({defaultLevel:u.ERROR}),t.default=r,t.LogLevel=s,t.getLogLevel=o,t.setLogLevel=i},function(e,t,n){var r,o;/*!
 * js-logger - http://github.com/jonnyreeves/js-logger
 * Jonny Reeves, http://jonnyreeves.co.uk/
 * js-logger may be freely distributed under the MIT license.
 */
!function(i){"use strict";var a={};a.VERSION="1.4.1";var u,s={},c=function(e,t){return function(){return t.apply(e,arguments)}},l=function(){var e,t,n=arguments,r=n[0];for(t=1;t<n.length;t++)for(e in n[t])e in r||!n[t].hasOwnProperty(e)||(r[e]=n[t][e]);return r},f=function(e,t){return{value:e,name:t}};a.DEBUG=f(1,"DEBUG"),a.INFO=f(2,"INFO"),a.TIME=f(3,"TIME"),a.WARN=f(4,"WARN"),a.ERROR=f(8,"ERROR"),a.OFF=f(99,"OFF");var p=function(e){this.context=e,this.setLevel(e.filterLevel),this.log=this.info};p.prototype={setLevel:function(e){e&&"value"in e&&(this.context.filterLevel=e)},getLevel:function(){return this.context.filterLevel},enabledFor:function(e){var t=this.context.filterLevel;return e.value>=t.value},debug:function(){this.invoke(a.DEBUG,arguments)},info:function(){this.invoke(a.INFO,arguments)},warn:function(){this.invoke(a.WARN,arguments)},error:function(){this.invoke(a.ERROR,arguments)},time:function(e){"string"==typeof e&&e.length>0&&this.invoke(a.TIME,[e,"start"])},timeEnd:function(e){"string"==typeof e&&e.length>0&&this.invoke(a.TIME,[e,"end"])},invoke:function(e,t){u&&this.enabledFor(e)&&u(t,l({level:e},this.context))}};var v=new p({filterLevel:a.OFF});!function(){var e=a;e.enabledFor=c(v,v.enabledFor),e.debug=c(v,v.debug),e.time=c(v,v.time),e.timeEnd=c(v,v.timeEnd),e.info=c(v,v.info),e.warn=c(v,v.warn),e.error=c(v,v.error),e.log=e.info}(),a.setHandler=function(e){u=e},a.setLevel=function(e){v.setLevel(e);for(var t in s)s.hasOwnProperty(t)&&s[t].setLevel(e)},a.getLevel=function(){return v.getLevel()},a.get=function(e){return s[e]||(s[e]=new p(l({name:e},v.context)))},a.createDefaultHandler=function(e){e=e||{},e.formatter=e.formatter||function(e,t){t.name&&e.unshift("["+t.name+"]")};var t={},n=function(e,t){Function.prototype.apply.call(e,console,t)};return"undefined"==typeof console?function(){}:function(r,o){r=Array.prototype.slice.call(r);var i,u=console.log;o.level===a.TIME?(i=(o.name?"["+o.name+"] ":"")+r[0],"start"===r[1]?console.time?console.time(i):t[i]=(new Date).getTime():console.timeEnd?console.timeEnd(i):n(u,[i+": "+((new Date).getTime()-t[i])+"ms"])):(o.level===a.WARN&&console.warn?u=console.warn:o.level===a.ERROR&&console.error?u=console.error:o.level===a.INFO&&console.info?u=console.info:o.level===a.DEBUG&&console.debug&&(u=console.debug),e.formatter(r,o),n(u,r))}},a.useDefaults=function(e){a.setLevel(e&&e.defaultLevel||a.DEBUG),a.setHandler(a.createDefaultHandler(e))},r=a,void 0!==(o="function"==typeof r?r.call(t,n,t,e):r)&&(e.exports=o)}()},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.OTTConfiguration=void 0;var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(4),a={serviceParams:{apiVersion:"4.7.1"}},u=function(){function e(){r(this,e)}return o(e,null,[{key:"set",value:function(e){e&&Object.assign(a,e)}},{key:"get",value:function(){return(0,i.clone)(a)}}]),e}();t.default=u,t.OTTConfiguration=u},,,function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(14),c=r(s),l=n(0),f=r(l),p=n(7),v=r(p),d=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),u(t,null,[{key:"add",value:function(e,t,n){var r=new Map;r.set("Content-Type","application/json");var o=new f.default(r);o.service="bookmark",o.action="add",o.method="POST",o.url=o.getUrl(e);var i={objectType:"KontorolBookmarkPlayerData",action:n.playerData.action,averageBitrate:n.playerData.averageBitrate,totalBitrate:n.playerData.totalBitrate,currentBitrate:n.playerData.currentBitrate,fileId:n.playerData.fileId},a={objectType:"KontorolBookmark",type:n.type,id:n.id,position:n.position,playerData:i},u=v.default.get(),s=u.serviceParams;return Object.assign(s,{bookmark:a,ks:t}),o.params=JSON.stringify(s),o}}]),t}(c.default);t.default=d},,,function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.VERSION=t.NAME=t.RequestBuilder=t.OTTConfiguration=t.OTTBookmarkService=void 0;var o=n(0),i=r(o),a=n(7),u=r(a),s=n(10),c=r(s);t.OTTBookmarkService=c.default,t.OTTConfiguration=u.default,t.RequestBuilder=i.default,t.NAME="pakhshkit-js-providers-bookmark-service",t.VERSION="2.7.1"},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(3),u=r(a),s=n(7),c=r(s),l=function(){function e(){o(this,e)}return i(e,null,[{key:"getMultiRequest",value:function(e,t){var n=c.default.get(),r=n.serviceParams;e&&Object.assign(r,{ks:e}),t&&Object.assign(r,{partnerId:t});var o=new Map;o.set("Content-Type","application/json");var i=new u.default(o);return i.method="POST",i.service="multirequest",i.url=i.getUrl(n.serviceUrl),i.params=r,i}}]),e}();t.default=l}])});
//# sourceMappingURL=pakhshkit-bookmark-service.js.map