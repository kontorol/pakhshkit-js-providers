!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.bookmark=t():(e.playkit=e.playkit||{},e.playkit.services=e.playkit.services||{},e.playkit.services.bookmark=t())}(this,function(){return function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var r={};return t.m=e,t.c=r,t.i=function(e){return e},t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=17)}([function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),i=r(2),a=function(e){return e&&e.__esModule?e:{default:e}}(i),u=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Map;n(this,e),this._attemptCounter=1,this.headers=t}return o(e,[{key:"getUrl",value:function(e){return e+"/service/"+this.service+(this.action?"/action/"+this.action:"")}},{key:"doHttpRequest",value:function(){var e=this,t=new Promise(function(t,r){e._requestPromise={resolve:t,reject:r}});return this.url||this._requestPromise.reject(new a.default(a.default.Severity.CRITICAL,a.default.Category.NETWORK,a.default.Code.MALFORMED_DATA_URI,{url:this.url})),this._createXHR(),t}},{key:"_createXHR",value:function(){var e=this,t=new XMLHttpRequest;t.onreadystatechange=function(){if(4===t.readyState&&200===t.status)try{var r=JSON.parse(t.responseText);return e.responseHeaders=e._getResponseHeaders(t),e._requestPromise.resolve(r)}catch(r){e._requestPromise.reject(e._createError(t,a.default.Code.BAD_SERVER_RESPONSE,{text:t.responseText}))}},t.open(this.method,this.url,this.retryConfig.async),this.retryConfig.async&&this.retryConfig.timeout&&(t.timeout=this.retryConfig.timeout);var r=performance.now();t.ontimeout=function(){e._handleError(t,a.default.Code.TIMEOUT,{timeout:(performance.now()-r)/1e3,statusText:t.statusText})},t.onerror=t.onabort=function(){e._handleError(t,a.default.Code.HTTP_ERROR,{text:t.responseText,statusText:t.statusText})},this.headers.forEach(function(e,r){t.setRequestHeader(r,e)}),t.send(this.params)}},{key:"_getResponseHeaders",value:function(e){return e.getAllResponseHeaders().split("\n").filter(function(e){return 0===e.toLowerCase().indexOf("x-")})}},{key:"_handleError",value:function(e,t,r){var n=this._createError(e,t,r);if(e.onreadystatechange=function(){},e.onerror=function(){},e.ontimeout=function(){},e.onabort=function(){},!(this.retryConfig.maxAttempts&&this._attemptCounter<this.retryConfig.maxAttempts))return this._requestPromise.reject(n);this._attemptCounter++,this._createXHR()}},{key:"_createError",value:function(e,t,r){return Object.assign(r,{url:this.url,headers:this._getResponseHeaders(e),attempt:this._attemptCounter}),new a.default(a.default.Severity.CRITICAL,a.default.Category.NETWORK,t,r)}}]),e}();t.default=u},,function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=r(3),i=function(e){return e&&e.__esModule?e:{default:e}}(o),a=r(9),u=r(8),s=r(7),l=function e(t,r,i){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};n(this,e),this.severity=t,this.category=r,this.code=i,this.data=a,(0,o.getLogLevel)("Error")!==o.LogLevel.OFF&&e._logger.error("Category:"+r+" | Code:"+i+" |",a)};l.Severity=a.Severity,l.Category=s.Category,l.Code=u.Code,l._logger=(0,i.default)("Error"),t.default=l},function(e,t,r){"use strict";function n(e){s.setHandler(function(t,r){return e(t,r)})}function o(e){return e?s.get(e):s}function i(e){return o(e).getLevel()}function a(e,t){o(t).setLevel(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.setLogHandler=t.setLogLevel=t.getLogLevel=t.LogLevel=void 0;var u=r(10),s=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}(u),l={DEBUG:s.DEBUG,INFO:s.INFO,TIME:s.TIME,WARN:s.WARN,ERROR:s.ERROR,OFF:s.OFF};s.useDefaults({defaultLevel:s.ERROR}),t.default=o,t.LogLevel=l,t.getLogLevel=i,t.setLogLevel=a,t.setLogHandler=n},function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function e(t){n(this,e),this.hasError=!1,"KalturaAPIException"===t.objectType?(this.hasError=!0,this.error=new i(t.code,t.message)):t.error&&"KalturaAPIException"===t.error.objectType?(this.hasError=!0,this.error=new i(t.error.code,t.error.message)):this.data=t};t.default=o;var i=function e(t,r){n(this,e),this.code=t,this.message=r}},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.MultiRequestResult=void 0;var s=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),l=r(0),c=n(l),f=r(3),d=n(f),p=r(4),v=n(p),y=r(2),h=n(y),g=function(e){function t(){var e,r,n,o;i(this,t);for(var u=arguments.length,s=Array(u),l=0;l<u;l++)s[l]=arguments[l];return r=n=a(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(s))),n.requests=[],o=r,a(n,o)}return u(t,e),s(t,[{key:"add",value:function(e){this.requests.push(e);var t={},r={service:e.service,action:e.action};return Object.assign(t,o({},this.requests.length,Object.assign(r,e.params))),Object.assign(t,this.params),this.params=t,this}},{key:"execute",value:function(){var e=this;return new Promise(function(r,n){try{e.params=JSON.stringify(e.params)}catch(r){t._logger.error(""+r.message),n(new h.default(h.default.Severity.CRITICAL,h.default.Category.PROVIDER,h.default.Code.FAILED_PARSING_REQUEST,{error:r,params:e.params}))}e.doHttpRequest().then(function(t){var o=new b(t);o.success?r({headers:e.responseHeaders,response:o}):n(new h.default(h.default.Severity.CRITICAL,h.default.Category.NETWORK,h.default.Code.MULTIREQUEST_API_ERROR,{url:e.url,headers:e.responseHeaders,results:o.results}))},function(e){n(e)})})}}]),t}(c.default);g._logger=(0,d.default)("MultiRequestBuilder"),t.default=g;var b=t.MultiRequestResult=function e(t){var r=this;i(this,e),this.results=[],this.success=!0,(t.result?t.result:t).forEach(function(t){var n=new v.default(t);if(r.results.push(n),n.hasError)return e._logger.error("Service returned an error with error code: "+n.error.code+" and message: "+n.error.message+"."),void(r.success=!1)})};b._logger=(0,d.default)("MultiRequestResult")},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=function e(t){var r=void 0;return Array.isArray(t)?(r=t.length>0?t.slice(0):[],r.forEach(function(t,o){("object"===(void 0===t?"undefined":n(t))&&t!=={}||Array.isArray(t)&&t.length>0)&&(r[o]=e(t))})):"object"===(void 0===t?"undefined":n(t))?(r=Object.assign({},t),Object.keys(r).forEach(function(t){("object"===n(r[t])&&r[t]!=={}||Array.isArray(r[t])&&r[t].length>0)&&(r[t]=e(r[t]))})):r=t,r};t.clone=o},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={NETWORK:1,SERVICE:2,PROVIDER:3};t.Category=n},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={UNSUPPORTED_SCHEME:1e3,BAD_HTTP_STATUS:1001,HTTP_ERROR:1002,TIMEOUT:1003,MALFORMED_DATA_URI:1004,BAD_SERVER_RESPONSE:1005,MULTIREQUEST_API_ERROR:1006,API_RESPONSE_MISMATCH:1007,ERROR:2e3,BLOCK_ACTION:2001,MISSING_MANDATORY_PARAMS:3e3,MISSING_PLAY_SOURCE:3001};t.Code=n},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={RECOVERABLE:1,CRITICAL:2};t.Severity=n},function(e,t,r){var n,o;/*!
 * js-logger - http://github.com/jonnyreeves/js-logger
 * Jonny Reeves, http://jonnyreeves.co.uk/
 * js-logger may be freely distributed under the MIT license.
 */
!function(i){"use strict";var a={};a.VERSION="1.4.1";var u,s={},l=function(e,t){return function(){return t.apply(e,arguments)}},c=function(){var e,t,r=arguments,n=r[0];for(t=1;t<r.length;t++)for(e in r[t])e in n||!r[t].hasOwnProperty(e)||(n[e]=r[t][e]);return n},f=function(e,t){return{value:e,name:t}};a.DEBUG=f(1,"DEBUG"),a.INFO=f(2,"INFO"),a.TIME=f(3,"TIME"),a.WARN=f(4,"WARN"),a.ERROR=f(8,"ERROR"),a.OFF=f(99,"OFF");var d=function(e){this.context=e,this.setLevel(e.filterLevel),this.log=this.info};d.prototype={setLevel:function(e){e&&"value"in e&&(this.context.filterLevel=e)},getLevel:function(){return this.context.filterLevel},enabledFor:function(e){var t=this.context.filterLevel;return e.value>=t.value},debug:function(){this.invoke(a.DEBUG,arguments)},info:function(){this.invoke(a.INFO,arguments)},warn:function(){this.invoke(a.WARN,arguments)},error:function(){this.invoke(a.ERROR,arguments)},time:function(e){"string"==typeof e&&e.length>0&&this.invoke(a.TIME,[e,"start"])},timeEnd:function(e){"string"==typeof e&&e.length>0&&this.invoke(a.TIME,[e,"end"])},invoke:function(e,t){u&&this.enabledFor(e)&&u(t,c({level:e},this.context))}};var p=new d({filterLevel:a.OFF});!function(){var e=a;e.enabledFor=l(p,p.enabledFor),e.debug=l(p,p.debug),e.time=l(p,p.time),e.timeEnd=l(p,p.timeEnd),e.info=l(p,p.info),e.warn=l(p,p.warn),e.error=l(p,p.error),e.log=e.info}(),a.setHandler=function(e){u=e},a.setLevel=function(e){p.setLevel(e);for(var t in s)s.hasOwnProperty(t)&&s[t].setLevel(e)},a.getLevel=function(){return p.getLevel()},a.get=function(e){return s[e]||(s[e]=new d(c({name:e},p.context)))},a.createDefaultHandler=function(e){e=e||{},e.formatter=e.formatter||function(e,t){t.name&&e.unshift("["+t.name+"]")};var t={},r=function(e,t){Function.prototype.apply.call(e,console,t)};return"undefined"==typeof console?function(){}:function(n,o){n=Array.prototype.slice.call(n);var i,u=console.log;o.level===a.TIME?(i=(o.name?"["+o.name+"] ":"")+n[0],"start"===n[1]?console.time?console.time(i):t[i]=(new Date).getTime():console.timeEnd?console.timeEnd(i):r(u,[i+": "+((new Date).getTime()-t[i])+"ms"])):(o.level===a.WARN&&console.warn?u=console.warn:o.level===a.ERROR&&console.error?u=console.error:o.level===a.INFO&&console.info?u=console.info:o.level===a.DEBUG&&console.debug&&(u=console.debug),e.formatter(n,o),r(u,n))}},a.useDefaults=function(e){a.setLevel(e&&e.defaultLevel||a.DEBUG),a.setHandler(a.createDefaultHandler(e))},n=a,void 0!==(o="function"==typeof n?n.call(t,r,t,e):n)&&(e.exports=o)}()},function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.OTTConfiguration=void 0;var o=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),i=r(6),a={serviceParams:{apiVersion:"4.7.1"}},u=function(){function e(){n(this,e)}return o(e,null,[{key:"set",value:function(e){e&&Object.assign(a,e)}},{key:"get",value:function(){return(0,i.clone)(a)}}]),e}();t.default=u,t.OTTConfiguration=u},,,function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),s=r(18),l=n(s),c=r(0),f=n(c),d=r(11),p=n(d),v=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),u(t,null,[{key:"add",value:function(e,t,r){var n=new Map;n.set("Content-Type","application/json");var o=new f.default(n);o.service="bookmark",o.action="add",o.method="POST",o.url=o.getUrl(e);var i={objectType:"KalturaBookmarkPlayerData",action:r.playerData.action,averageBitrate:r.playerData.averageBitrate,totalBitrate:r.playerData.totalBitrate,currentBitrate:r.playerData.currentBitrate,fileId:r.playerData.fileId},a={objectType:"KalturaBookmark",type:r.type,id:r.id,position:r.position,playerData:i},u=p.default.get(),s=u.serviceParams;return Object.assign(s,{bookmark:a,ks:t}),o.params=JSON.stringify(s),o}}]),t}(l.default);t.default=v},,,function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.VERSION=t.NAME=t.RequestBuilder=t.OTTConfiguration=t.OTTBookmarkService=void 0;var o=r(0),i=n(o),a=r(11),u=n(a),s=r(14),l=n(s);t.OTTBookmarkService=l.default,t.OTTConfiguration=u.default,t.RequestBuilder=i.default,t.NAME="playkit-js-providers-bookmark-service",t.VERSION="2.19.0"},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),a=r(5),u=n(a),s=r(11),l=n(s),c=function(){function e(){o(this,e)}return i(e,null,[{key:"getMultiRequest",value:function(e,t){var r=l.default.get(),n=r.serviceParams;e&&Object.assign(n,{ks:e}),t&&Object.assign(n,{partnerId:t});var o=new Map;o.set("Content-Type","application/json");var i=new u.default(o);return i.method="POST",i.service="multirequest",i.url=i.getUrl(r.serviceUrl),i.params=n,i}}]),e}();t.default=c}])});
//# sourceMappingURL=playkit-bookmark-service.js.map