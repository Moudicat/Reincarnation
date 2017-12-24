"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["/index.html","a6cdb4fa8a0149cece983667f8781975"],["/manifest.json","7b34e095c283f8519121f438f722d132"],["/static/base.css","08b1844cb69b08cbe5e0d72ac2ffc9fa"],["/static/css/app.11963e402313c314f8364002aa9a2eaa.css","2219a963444c1607ef6bb72d1c7bf157"],["/static/fonts/element-icons.6f0a763.ttf","6f0a76321d30f3c8120915e57f7bd77e"],["/static/fonts/icomoon.eot","750fa59834611ed1e7ecc09c870edb7d"],["/static/fonts/icomoon.svg","83d492f265348d1f35cce2595558d0e0"],["/static/fonts/icomoon.ttf","07666982a1f94ff22c2077deb9341d3a"],["/static/fonts/icomoon.woff","010fd80d5bc7f2dfcf26f354b64e833f"],["/static/img/cat_with_fish.126900f.svg","126900f31f0a1153fe72620939ffeb10"],["/static/img/cat_with_mouse.b172378.svg","b172378d7aeda93b31a1986510fc43e7"],["/static/img/moudicat144x144.png","60b5a439c01e688175dba33995174f54"],["/static/img/moudicat192x192.png","700ac787ab023d7ca8c03b4129ccc3c3"],["/static/img/moudicat512x512.png","d08754691f251d66069cba6b25f938dd"],["/static/img/moudicat72x72.png","a90540f02c8650b9f3736ad412a70dbe"],["/static/img/pic_top.a76c2cc.png","a76c2cc6fb040dd0709ad1ccf4df51ad"],["/static/js/0.cd7ee7b6dfc39145325c.js","ab8f0930e28c1b1ebcd9cd1798b6f50e"],["/static/js/app.e811f7117297156373f4.js","2df5ffdbb1086f1749b61884deaf6a04"],["/static/js/manifest.b86e6cf0dcc95115f979.js","45dc025686feac9e67a52d963930ecbb"],["/static/js/vendor.1f8a39d274fdbe6ce2e9.js","daa0b8e3ae467cc361858c36ba3a4048"],["/static/responsive.scss","fab963914ee81096a95e947d21421f1b"],["/static/var.scss","cee247038e8d6b242692fd323be769db"]],cacheName="sw-precache-v3-Reincarnation-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=t),n.toString()},cleanResponse=function(e){if(!e.redirected)return Promise.resolve(e);return("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})})},createCacheKey=function(e,t,n,r){var o=new URL(e);return r&&o.pathname.match(r)||(o.search+=(o.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(n)),o.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var n=new URL(t).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,t){var n=new URL(e);return n.hash="",n.search=n.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),n.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],n=e[1],r=new URL(t,self.location),o=createCacheKey(r,hashParamName,n,!1);return[r.toString(),o]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(n){if(!t.has(n)){var r=new Request(n,{credentials:"same-origin"});return fetch(r).then(function(t){if(!t.ok)throw new Error("Request for "+n+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(n,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(n){return Promise.all(n.map(function(n){if(!t.has(n.url))return e.delete(n)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,n=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching),r="index.html";(t=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,r),t=urlsToCacheKeys.has(n));var o="https://www.moudicat.com/index.html";!t&&"navigate"===e.request.mode&&isPathWhitelisted([],e.request.url)&&(n=new URL(o,self.location).toString(),t=urlsToCacheKeys.has(n)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}}),function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).toolbox=e()}}(function(){return function e(t,n,r){function o(c,i){if(!n[c]){if(!t[c]){var s="function"==typeof require&&require;if(!i&&s)return s(c,!0);if(a)return a(c,!0);var u=new Error("Cannot find module '"+c+"'");throw u.code="MODULE_NOT_FOUND",u}var f=n[c]={exports:{}};t[c][0].call(f.exports,function(e){var n=t[c][1][e];return o(n||e)},f,f.exports,e,t,n,r)}return n[c].exports}for(var a="function"==typeof require&&require,c=0;c<r.length;c++)o(r[c]);return o}({1:[function(e,t,n){function r(e,t){((t=t||{}).debug||i.debug)&&console.log("[sw-toolbox] "+e)}function o(e){var t;return e&&e.cache&&(t=e.cache.name),t=t||i.cache.name,caches.open(t)}function a(e){var t=Array.isArray(e);if(t&&e.forEach(function(e){"string"==typeof e||e instanceof Request||(t=!1)}),!t)throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");return e}var c,i=e("./options"),s=e("./idb-cache-expiration");t.exports={debug:r,fetchAndCache:function(e,t){var n=(t=t||{}).successResponses||i.successResponses;return fetch(e.clone()).then(function(a){return"GET"===e.method&&n.test(a.status)&&o(t).then(function(n){n.put(e,a).then(function(){var o=t.cache||i.cache;(o.maxEntries||o.maxAgeSeconds)&&o.name&&function(t,a,i){var u=function(e,t,n){var o=e.url,a=n.maxAgeSeconds,c=n.maxEntries,i=n.name,u=Date.now();return r("Updating LRU order for "+o+". Max entries is "+c+", max age is "+a),s.getDb(i).then(function(e){return s.setTimestampForUrl(e,o,u)}).then(function(e){return s.expireEntries(e,c,a,u)}).then(function(e){r("Successfully updated IDB.");var n=e.map(function(e){return t.delete(e)});return Promise.all(n).then(function(){r("Done with cache cleanup.")})}).catch(function(e){r(e)})}.bind(null,e,n,o);c=c?c.then(u):u()}()})}),a.clone()})},openCache:o,renameCache:function(e,t,n){return r("Renaming cache: ["+e+"] to ["+t+"]",n),caches.delete(t).then(function(){return Promise.all([caches.open(e),caches.open(t)]).then(function(t){var n=t[0],r=t[1];return n.keys().then(function(e){return Promise.all(e.map(function(e){return n.match(e).then(function(t){return r.put(e,t)})}))}).then(function(){return caches.delete(e)})})})},cache:function(e,t){return o(t).then(function(t){return t.add(e)})},uncache:function(e,t){return o(t).then(function(t){return t.delete(e)})},precache:function(e){e instanceof Promise||a(e),i.preCacheItems=i.preCacheItems.concat(e)},validatePrecacheInput:a,isResponseFresh:function(e,t,n){if(!e)return!1;if(t){var r=e.headers.get("date");if(r&&new Date(r).getTime()+1e3*t<n)return!1}return!0}}},{"./idb-cache-expiration":2,"./options":4}],2:[function(e,t,n){var r="sw-toolbox-",o=1,a="store",c="url",i="timestamp",s={};t.exports={getDb:function(e){return e in s||(s[e]=function(e){return new Promise(function(t,n){var s=indexedDB.open(r+e,o);s.onupgradeneeded=function(){s.result.createObjectStore(a,{keyPath:c}).createIndex(i,i,{unique:!1})},s.onsuccess=function(){t(s.result)},s.onerror=function(){n(s.error)}})}(e)),s[e]},setTimestampForUrl:function(e,t,n){return new Promise(function(r,o){var c=e.transaction(a,"readwrite");c.objectStore(a).put({url:t,timestamp:n}),c.oncomplete=function(){r(e)},c.onabort=function(){o(c.error)}})},expireEntries:function(e,t,n,r){return function(e,t,n){return t?new Promise(function(r,o){var s=1e3*t,u=[],f=e.transaction(a,"readwrite"),h=f.objectStore(a);h.index(i).openCursor().onsuccess=function(e){var t=e.target.result;if(t&&n-s>t.value[i]){var r=t.value[c];u.push(r),h.delete(r),t.continue()}},f.oncomplete=function(){r(u)},f.onabort=o}):Promise.resolve([])}(e,n,r).then(function(n){return function(e,t){return t?new Promise(function(n,r){var o=[],s=e.transaction(a,"readwrite"),u=s.objectStore(a),f=u.index(i),h=f.count();f.count().onsuccess=function(){var e=h.result;e>t&&(f.openCursor().onsuccess=function(n){var r=n.target.result;if(r){var a=r.value[c];o.push(a),u.delete(a),e-o.length>t&&r.continue()}})},s.oncomplete=function(){n(o)},s.onabort=r}):Promise.resolve([])}(e,t).then(function(e){return n.concat(e)})})}}},{}],3:[function(e,t,n){function r(e){return e.reduce(function(e,t){return e.concat(t)},[])}e("serviceworker-cache-polyfill");var o=e("./helpers"),a=e("./router"),c=e("./options");t.exports={fetchListener:function(e){var t=a.match(e.request);t?e.respondWith(t(e.request)):a.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(a.default(e.request))},activateListener:function(e){o.debug("activate event fired");var t=c.cache.name+"$$$inactive$$$";e.waitUntil(o.renameCache(t,c.cache.name))},installListener:function(e){var t=c.cache.name+"$$$inactive$$$";o.debug("install event fired"),o.debug("creating cache ["+t+"]"),e.waitUntil(o.openCache({cache:{name:t}}).then(function(e){return Promise.all(c.preCacheItems).then(r).then(o.validatePrecacheInput).then(function(t){return o.debug("preCache list: "+(t.join(", ")||"(none)")),e.addAll(t)})}))}}},{"./helpers":1,"./options":4,"./router":6,"serviceworker-cache-polyfill":16}],4:[function(e,t,n){var r;r=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,t.exports={cache:{name:"$$$toolbox-cache$$$"+r+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},{}],5:[function(e,t,n){var r=new URL("./",self.location).pathname,o=e("path-to-regexp"),a=function(e,t,n,a){t instanceof RegExp?this.fullUrlRegExp=t:(0!==t.indexOf("/")&&(t=r+t),this.keys=[],this.regexp=o(t,this.keys)),this.method=e,this.options=a,this.handler=n};a.prototype.makeHandler=function(e){var t;if(this.regexp){var n=this.regexp.exec(e);t={},this.keys.forEach(function(e,r){t[e.name]=n[r+1]})}return function(e){return this.handler(e,t,this.options)}.bind(this)},t.exports=a},{"path-to-regexp":15}],6:[function(e,t,n){var r=e("./route"),o=e("./helpers"),a=function(e,t){for(var n=e.entries(),r=n.next(),o=[];!r.done;){new RegExp(r.value[0]).test(t)&&o.push(r.value[1]),r=n.next()}return o},c=function(){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null};["get","post","put","delete","head","any"].forEach(function(e){c.prototype[e]=function(t,n,r){return this.add(e,t,n,r)}}),c.prototype.add=function(e,t,n,a){a=a||{};var c;t instanceof RegExp?c=RegExp:(c=a.origin||self.location.origin,c=c instanceof RegExp?c.source:function(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}(c)),e=e.toLowerCase();var i=new r(e,t,n,a);this.routes.has(c)||this.routes.set(c,new Map);var s=this.routes.get(c);s.has(e)||s.set(e,new Map);var u=s.get(e),f=i.regexp||i.fullUrlRegExp;u.has(f.source)&&o.debug('"'+t+'" resolves to same regex as existing route.'),u.set(f.source,i)},c.prototype.matchMethod=function(e,t){var n=new URL(t),r=n.origin,o=n.pathname;return this._match(e,a(this.routes,r),o)||this._match(e,[this.routes.get(RegExp)],t)},c.prototype._match=function(e,t,n){if(0===t.length)return null;for(var r=0;r<t.length;r++){var o=t[r],c=o&&o.get(e.toLowerCase());if(c){var i=a(c,n);if(i.length>0)return i[0].makeHandler(n)}}return null},c.prototype.match=function(e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},t.exports=new c},{"./helpers":1,"./route":5}],7:[function(e,t,n){var r=e("../options"),o=e("../helpers");t.exports=function(e,t,n){return n=n||{},o.debug("Strategy: cache first ["+e.url+"]",n),o.openCache(n).then(function(t){return t.match(e).then(function(t){var a=n.cache||r.cache,c=Date.now();return o.isResponseFresh(t,a.maxAgeSeconds,c)?t:o.fetchAndCache(e,n)})})}},{"../helpers":1,"../options":4}],8:[function(e,t,n){var r=e("../options"),o=e("../helpers");t.exports=function(e,t,n){return n=n||{},o.debug("Strategy: cache only ["+e.url+"]",n),o.openCache(n).then(function(t){return t.match(e).then(function(e){var t=n.cache||r.cache,a=Date.now();if(o.isResponseFresh(e,t.maxAgeSeconds,a))return e})})}},{"../helpers":1,"../options":4}],9:[function(e,t,n){var r=e("../helpers"),o=e("./cacheOnly");t.exports=function(e,t,n){return r.debug("Strategy: fastest ["+e.url+"]",n),new Promise(function(a,c){var i=!1,s=[],u=function(e){s.push(e.toString()),i?c(new Error('Both cache and network failed: "'+s.join('", "')+'"')):i=!0},f=function(e){e instanceof Response?a(e):u("No result returned")};r.fetchAndCache(e.clone(),n).then(f,u),o(e,t,n).then(f,u)})}},{"../helpers":1,"./cacheOnly":8}],10:[function(e,t,n){t.exports={networkOnly:e("./networkOnly"),networkFirst:e("./networkFirst"),cacheOnly:e("./cacheOnly"),cacheFirst:e("./cacheFirst"),fastest:e("./fastest")}},{"./cacheFirst":7,"./cacheOnly":8,"./fastest":9,"./networkFirst":11,"./networkOnly":12}],11:[function(e,t,n){var r=e("../options"),o=e("../helpers");t.exports=function(e,t,n){var a=(n=n||{}).successResponses||r.successResponses,c=n.networkTimeoutSeconds||r.networkTimeoutSeconds;return o.debug("Strategy: network first ["+e.url+"]",n),o.openCache(n).then(function(t){var i,s,u=[];if(c){var f=new Promise(function(a){i=setTimeout(function(){t.match(e).then(function(e){var t=n.cache||r.cache,c=Date.now(),i=t.maxAgeSeconds;o.isResponseFresh(e,i,c)&&a(e)})},1e3*c)});u.push(f)}var h=o.fetchAndCache(e,n).then(function(e){if(i&&clearTimeout(i),a.test(e.status))return e;throw o.debug("Response was an HTTP error: "+e.statusText,n),s=e,new Error("Bad response")}).catch(function(r){return o.debug("Network or response error, fallback to cache ["+e.url+"]",n),t.match(e).then(function(e){if(e)return e;if(s)return s;throw r})});return u.push(h),Promise.race(u)})}},{"../helpers":1,"../options":4}],12:[function(e,t,n){var r=e("../helpers");t.exports=function(e,t,n){return r.debug("Strategy: network only ["+e.url+"]",n),fetch(e)}},{"../helpers":1}],13:[function(e,t,n){var r=e("./options"),o=e("./router"),a=e("./helpers"),c=e("./strategies"),i=e("./listeners");a.debug("Service Worker Toolbox is loading"),self.addEventListener("install",i.installListener),self.addEventListener("activate",i.activateListener),self.addEventListener("fetch",i.fetchListener),t.exports={networkOnly:c.networkOnly,networkFirst:c.networkFirst,cacheOnly:c.cacheOnly,cacheFirst:c.cacheFirst,fastest:c.fastest,router:o,options:r,cache:a.cache,uncache:a.uncache,precache:a.precache}},{"./helpers":1,"./listeners":3,"./options":4,"./router":6,"./strategies":10}],14:[function(e,t,n){t.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],15:[function(e,t,n){function r(e,t){for(var n,r=[],o=0,a=0,i="",s=t&&t.delimiter||"/";null!=(n=l.exec(e));){var u=n[0],f=n[1],h=n.index;if(i+=e.slice(a,h),a=h+u.length,f)i+=f[1];else{var p=e[a],d=n[2],m=n[3],g=n[4],v=n[5],w=n[6],x=n[7];i&&(r.push(i),i="");var b=null!=d&&null!=p&&p!==d,y="+"===w||"*"===w,R="?"===w||"*"===w,E=n[2]||s,C=g||v;r.push({name:m||o++,prefix:d||"",delimiter:E,optional:R,repeat:y,partial:b,asterisk:!!x,pattern:C?function(e){return e.replace(/([=!:$\/()])/g,"\\$1")}(C):x?".*":"[^"+c(E)+"]+?"})}}return a<e.length&&(i+=e.substr(a)),i&&r.push(i),r}function o(e){return encodeURI(e).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function a(e){for(var t=new Array(e.length),n=0;n<e.length;n++)"object"==typeof e[n]&&(t[n]=new RegExp("^(?:"+e[n].pattern+")$"));return function(n,r){for(var a="",c=n||{},i=(r||{}).pretty?function(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}:encodeURIComponent,s=0;s<e.length;s++){var u=e[s];if("string"!=typeof u){var f,l=c[u.name];if(null==l){if(u.optional){u.partial&&(a+=u.prefix);continue}throw new TypeError('Expected "'+u.name+'" to be defined')}if(h(l)){if(!u.repeat)throw new TypeError('Expected "'+u.name+'" to not repeat, but received `'+JSON.stringify(l)+"`");if(0===l.length){if(u.optional)continue;throw new TypeError('Expected "'+u.name+'" to not be empty')}for(var p=0;p<l.length;p++){if(f=i(l[p]),!t[s].test(f))throw new TypeError('Expected all "'+u.name+'" to match "'+u.pattern+'", but received `'+JSON.stringify(f)+"`");a+=(0===p?u.prefix:u.delimiter)+f}}else{if(f=u.asterisk?o(l):i(l),!t[s].test(f))throw new TypeError('Expected "'+u.name+'" to match "'+u.pattern+'", but received "'+f+'"');a+=u.prefix+f}}else a+=u}return a}}function c(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function i(e,t){return e.keys=t,e}function s(e){return e.sensitive?"":"i"}function u(e,t,n){h(t)||(n=t||n,t=[]);for(var r=(n=n||{}).strict,o=!1!==n.end,a="",u=0;u<e.length;u++){var f=e[u];if("string"==typeof f)a+=c(f);else{var l=c(f.prefix),p="(?:"+f.pattern+")";t.push(f),f.repeat&&(p+="(?:"+l+p+")*"),a+=p=f.optional?f.partial?l+"("+p+")?":"(?:"+l+"("+p+"))?":l+"("+p+")"}}var d=c(n.delimiter||"/"),m=a.slice(-d.length)===d;return r||(a=(m?a.slice(0,-d.length):a)+"(?:"+d+"(?=$))?"),a+=o?"$":r&&m?"":"(?="+d+"|$)",i(new RegExp("^"+a,s(n)),t)}function f(e,t,n){return h(t)||(n=t||n,t=[]),n=n||{},e instanceof RegExp?function(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return i(e,t)}(e,t):h(e)?function(e,t,n){for(var r=[],o=0;o<e.length;o++)r.push(f(e[o],t,n).source);return i(new RegExp("(?:"+r.join("|")+")",s(n)),t)}(e,t,n):function(e,t,n){return u(r(e,n),t,n)}(e,t,n)}var h=e("isarray");t.exports=f,t.exports.parse=r,t.exports.compile=function(e,t){return a(r(e,t))},t.exports.tokensToFunction=a,t.exports.tokensToRegExp=u;var l=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},{isarray:14}],16:[function(e,t,n){!function(){var e=Cache.prototype.addAll,t=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);if(t)var n=t[1],r=parseInt(t[2]);e&&(!t||"Firefox"===n&&r>=46||"Chrome"===n&&r>=50)||(Cache.prototype.addAll=function(e){function t(e){this.name="NetworkError",this.code=19,this.message=e}var n=this;return t.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return e=e.map(function(e){return e instanceof Request?e:String(e)}),Promise.all(e.map(function(e){"string"==typeof e&&(e=new Request(e));var n=new URL(e.url).protocol;if("http:"!==n&&"https:"!==n)throw new t("Invalid scheme");return fetch(e.clone())}))}).then(function(r){if(r.some(function(e){return!e.ok}))throw new t("Incorrect response status");return Promise.all(r.map(function(t,r){return n.put(e[r],t)}))}).then(function(){})},Cache.prototype.add=function(e){return this.addAll([e])})}()},{}]},{},[13])(13)}),toolbox.router.get(/^https:\/\/say\.moe\/api\/.*/,toolbox.networkFirst,{}),toolbox.router.get(/^https:\/\/moudicat-data\.oss-cn-beijing\.aliyuncs\.com\/cdn\/.*/,toolbox.cacheFirst,{});