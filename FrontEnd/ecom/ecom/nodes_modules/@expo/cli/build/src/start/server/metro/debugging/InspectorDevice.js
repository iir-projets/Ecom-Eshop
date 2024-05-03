"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createInspectorDeviceClass = createInspectorDeviceClass;
var _nodeFetch = _interopRequireDefault(require("node-fetch"));
var _networkResponse = require("./inspectorHandlers/NetworkResponse");
var _pageReload = require("./inspectorHandlers/PageReload");
var _vscodeDebuggerGetPossibleBreakpoints = require("./inspectorHandlers/VscodeDebuggerGetPossibleBreakpoints");
var _vscodeDebuggerScriptParsed = require("./inspectorHandlers/VscodeDebuggerScriptParsed");
var _vscodeDebuggerSetBreakpointByUrl = require("./inspectorHandlers/VscodeDebuggerSetBreakpointByUrl");
var _vscodeRuntimeCallFunctionOn = require("./inspectorHandlers/VscodeRuntimeCallFunctionOn");
var _vscodeRuntimeGetProperties = require("./inspectorHandlers/VscodeRuntimeGetProperties");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function createInspectorDeviceClass(metroBundler, MetroDeviceClass) {
    return class ExpoInspectorDevice extends MetroDeviceClass {
        /** All handlers that should be used to intercept or reply to CDP events */ handlers = [
            // Generic handlers
            new _networkResponse.NetworkResponseHandler(),
            new _pageReload.PageReloadHandler(metroBundler),
            // Vscode-specific handlers
            new _vscodeDebuggerGetPossibleBreakpoints.VscodeDebuggerGetPossibleBreakpointsHandler(),
            new _vscodeDebuggerScriptParsed.VscodeDebuggerScriptParsedHandler(this),
            new _vscodeDebuggerSetBreakpointByUrl.VscodeDebuggerSetBreakpointByUrlHandler(),
            new _vscodeRuntimeGetProperties.VscodeRuntimeGetPropertiesHandler(),
            new _vscodeRuntimeCallFunctionOn.VscodeRuntimeCallFunctionOnHandler(), 
        ];
        onDeviceMessage(message, info) {
            var ref;
            return this.handlers.some((handler)=>{
                return (ref = handler.onDeviceMessage == null ? void 0 : handler.onDeviceMessage(message, info)) != null ? ref : false;
            });
        }
        onDebuggerMessage(message, info) {
            var ref;
            return this.handlers.some((handler)=>{
                return (ref = handler.onDebuggerMessage == null ? void 0 : handler.onDebuggerMessage(message, info)) != null ? ref : false;
            });
        }
        /** Hook into the message life cycle to answer more complex CDP messages */ async _processMessageFromDevice(message, info) {
            if (!this.onDeviceMessage(message, info)) {
                await super._processMessageFromDevice(message, info);
            }
        }
        /** Hook into the message life cycle to answer more complex CDP messages */ _interceptMessageFromDebugger(request, info, socket) {
            // Note, `socket` is the exact same as `info.socket`
            if (this.onDebuggerMessage(request, info)) {
                return true;
            }
            return super._interceptMessageFromDebugger(request, info, socket);
        }
        /**
     * Overwrite the default text fetcher, to load sourcemaps from sources other than `localhost`.
     * @todo Cedric: remove the custom `DebuggerScriptSource` handler when switching over to `metro@>=0.75.1`
     * @see https://github.com/facebook/metro/blob/77f445f1bcd2264ad06174dbf8d542bc75834d29/packages/metro-inspector-proxy/src/Device.js#L573-L588
     * @since metro-inspector-proxy@0.75.1
     */ async _fetchText(url) {
            const LENGTH_LIMIT_BYTES = 350000000; // 350mb
            const response = await (0, _nodeFetch).default(url);
            if (!response.ok) {
                throw new Error(`Received status ${response.status} while fetching: ${url}`);
            }
            const contentLength = response.headers.get("Content-Length");
            if (contentLength && Number(contentLength) > LENGTH_LIMIT_BYTES) {
                throw new Error("Expected file size is too large (more than 350mb)");
            }
            const text = await response.text();
            if (Buffer.byteLength(text, "utf8") > LENGTH_LIMIT_BYTES) {
                throw new Error("File size is too large (more than 350mb)");
            }
            return text;
        }
    };
}

//# sourceMappingURL=InspectorDevice.js.map