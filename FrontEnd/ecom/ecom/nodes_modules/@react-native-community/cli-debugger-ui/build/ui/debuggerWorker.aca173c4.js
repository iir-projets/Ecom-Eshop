parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Hdai":[function(require,module,exports) {
function o(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?module.exports=o=function(o){return typeof o}:module.exports=o=function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},o(t)}module.exports=o;
},{}],"sYUN":[function(require,module,exports) {
"use strict";var e=t(require("@babel/runtime/helpers/typeof"));function t(e){return e&&e.__esModule?e:{default:e}}onmessage=function(){var t,i,n=(i=!1,function(){i||console.warn.toString().includes("[native code]")||(i=!0,console.warn("Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab (or opening it in a separate window)."))}),r={executeApplicationScript:function(e,t){for(var i in e.inject)self[i]=JSON.parse(e.inject[i]);var n;try{importScripts(e.url)}catch(r){n=r.message}t(null,n)},setDebuggerVisibility:function(e){t=e.visibilityState}};return function(i){"hidden"===t&&n();var a=i.data,o=function(e,t){postMessage({replyID:a.id,result:e,error:t})},s=r[a.method];if(s)s(a,o);else{var c,u=[[],[],[],0];try{"object"===("undefined"==typeof __fbBatchedBridge?"undefined":(0,e.default)(__fbBatchedBridge))?u=__fbBatchedBridge[a.method].apply(null,a.arguments):c="Failed to call function, __fbBatchedBridge is undefined"}catch(d){c=d.message}finally{o(JSON.stringify(u),c)}}}}();
},{"@babel/runtime/helpers/typeof":"Hdai"}]},{},["sYUN"], null)
//# sourceMappingURL=/debugger-ui/debuggerWorker.aca173c4.js.map