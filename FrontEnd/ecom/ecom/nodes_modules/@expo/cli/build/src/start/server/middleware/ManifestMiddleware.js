"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getWorkspaceRoot = getWorkspaceRoot;
exports.getEntryWithServerRoot = getEntryWithServerRoot;
exports.getMetroServerRoot = getMetroServerRoot;
exports.resolveMainModuleName = resolveMainModuleName;
exports.DEVELOPER_TOOL = void 0;
var _config = require("@expo/config");
var _paths = require("@expo/config/paths");
var _findYarnWorkspaceRoot = _interopRequireDefault(require("find-yarn-workspace-root"));
var _path = _interopRequireDefault(require("path"));
var _url = require("url");
var _expoMiddleware = require("./ExpoMiddleware");
var _metroOptions = require("./metroOptions");
var _resolveAssets = require("./resolveAssets");
var _resolvePlatform = require("./resolvePlatform");
var _exportHermes = require("../../../export/exportHermes");
var Log = _interopRequireWildcard(require("../../../log"));
var _env = require("../../../utils/env");
var _errors = require("../../../utils/errors");
var _url1 = require("../../../utils/url");
var ProjectDevices = _interopRequireWildcard(require("../../project/devices"));
var _router = require("../metro/router");
var _platformBundlers = require("../platformBundlers");
var _webTemplate = require("../webTemplate");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};
        if (obj != null) {
            for(var key in obj){
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                    if (desc.get || desc.set) {
                        Object.defineProperty(newObj, key, desc);
                    } else {
                        newObj[key] = obj[key];
                    }
                }
            }
        }
        newObj.default = obj;
        return newObj;
    }
}
const debug = require("debug")("expo:start:server:middleware:manifest");
function getWorkspaceRoot(projectRoot) {
    try {
        return (0, _findYarnWorkspaceRoot).default(projectRoot);
    } catch (error) {
        if (error.message.includes("Unexpected end of JSON input")) {
            return null;
        }
        throw error;
    }
}
const supportedPlatforms = [
    "ios",
    "android",
    "web",
    "none"
];
function getEntryWithServerRoot(projectRoot, props) {
    if (!supportedPlatforms.includes(props.platform)) {
        throw new _errors.CommandError(`Failed to resolve the project's entry file: The platform "${props.platform}" is not supported.`);
    }
    return _path.default.relative(getMetroServerRoot(projectRoot), (0, _paths).resolveEntryPoint(projectRoot, props));
}
function getMetroServerRoot(projectRoot) {
    if (_env.env.EXPO_USE_METRO_WORKSPACE_ROOT) {
        var ref;
        return (ref = getWorkspaceRoot(projectRoot)) != null ? ref : projectRoot;
    }
    return projectRoot;
}
function resolveMainModuleName(projectRoot, props) {
    const entryPoint = getEntryWithServerRoot(projectRoot, props);
    debug(`Resolved entry point: ${entryPoint} (project root: ${projectRoot})`);
    return (0, _url1).stripExtension(entryPoint, "js");
}
const DEVELOPER_TOOL = "expo-cli";
exports.DEVELOPER_TOOL = DEVELOPER_TOOL;
class ManifestMiddleware extends _expoMiddleware.ExpoMiddleware {
    constructor(projectRoot, options){
        super(projectRoot, /**
       * Only support `/`, `/manifest`, `/index.exp` for the manifest middleware.
       */ [
            "/",
            "/manifest",
            "/index.exp"
        ]);
        this.projectRoot = projectRoot;
        this.options = options;
        this.initialProjectConfig = (0, _config).getConfig(projectRoot);
        this.platformBundlers = (0, _platformBundlers).getPlatformBundlers(projectRoot, this.initialProjectConfig.exp);
    }
    /** Exposed for testing. */ async _resolveProjectSettingsAsync({ platform , hostname , protocol  }) {
        // Read the config
        const projectConfig = (0, _config).getConfig(this.projectRoot);
        // Read from headers
        const mainModuleName = this.resolveMainModuleName({
            pkg: projectConfig.pkg,
            platform
        });
        const isHermesEnabled = (0, _exportHermes).isEnableHermesManaged(projectConfig.exp, platform);
        // Create the manifest and set fields within it
        const expoGoConfig = this.getExpoGoConfig({
            mainModuleName,
            hostname
        });
        const hostUri = this.options.constructUrl({
            scheme: "",
            hostname
        });
        var _mode;
        const bundleUrl = this._getBundleUrl({
            platform,
            mainModuleName,
            hostname,
            engine: isHermesEnabled ? "hermes" : undefined,
            baseUrl: (0, _metroOptions).getBaseUrlFromExpoConfig(projectConfig.exp),
            asyncRoutes: (0, _metroOptions).getAsyncRoutesFromExpoConfig(projectConfig.exp, (_mode = this.options.mode) != null ? _mode : "development", platform),
            routerRoot: (0, _router).getRouterDirectoryModuleIdWithManifest(this.projectRoot, projectConfig.exp),
            protocol
        });
        // Resolve all assets and set them on the manifest as URLs
        await this.mutateManifestWithAssetsAsync(projectConfig.exp, bundleUrl);
        return {
            expoGoConfig,
            hostUri,
            bundleUrl,
            exp: projectConfig.exp
        };
    }
    /** Get the main entry module ID (file) relative to the project root. */ resolveMainModuleName(props) {
        let entryPoint = getEntryWithServerRoot(this.projectRoot, props);
        debug(`Resolved entry point: ${entryPoint} (project root: ${this.projectRoot})`);
        // NOTE(Bacon): Webpack is currently hardcoded to index.bundle on native
        // in the future (TODO) we should move this logic into a Webpack plugin and use
        // a generated file name like we do on web.
        // const server = getDefaultDevServer();
        // // TODO: Move this into BundlerDevServer and read this info from self.
        // const isNativeWebpack = server instanceof WebpackBundlerDevServer && server.isTargetingNative();
        if (this.options.isNativeWebpack) {
            entryPoint = "index.js";
        }
        return (0, _url1).stripExtension(entryPoint, "js");
    }
    /** Store device IDs that were sent in the request headers. */ async saveDevicesAsync(req) {
        var ref;
        const deviceIds = (ref = req.headers) == null ? void 0 : ref["expo-dev-client-id"];
        if (deviceIds) {
            await ProjectDevices.saveDevicesAsync(this.projectRoot, deviceIds).catch((e)=>Log.exception(e)
            );
        }
    }
    /** Create the bundle URL (points to the single JS entry file). Exposed for testing. */ _getBundleUrl({ platform , mainModuleName , hostname , engine , baseUrl , isExporting , asyncRoutes , routerRoot , protocol  }) {
        var _mode;
        const path = (0, _metroOptions).createBundleUrlPath({
            mode: (_mode = this.options.mode) != null ? _mode : "development",
            minify: this.options.minify,
            platform,
            mainModuleName,
            lazy: (0, _metroOptions).shouldEnableAsyncImports(this.projectRoot),
            engine,
            bytecode: engine === "hermes",
            baseUrl,
            isExporting: !!isExporting,
            asyncRoutes,
            routerRoot
        });
        return this.options.constructUrl({
            scheme: protocol != null ? protocol : "http",
            // hostType: this.options.location.hostType,
            hostname
        }) + path;
    }
    getExpoGoConfig({ mainModuleName , hostname  }) {
        return {
            // localhost:8081
            debuggerHost: this.options.constructUrl({
                scheme: "",
                hostname
            }),
            // Required for Expo Go to function.
            developer: {
                tool: DEVELOPER_TOOL,
                projectRoot: this.projectRoot
            },
            packagerOpts: {
                // Required for dev client.
                dev: this.options.mode !== "production"
            },
            // Indicates the name of the main bundle.
            mainModuleName,
            // Add this string to make Flipper register React Native / Metro as "running".
            // Can be tested by running:
            // `METRO_SERVER_PORT=8081 open -a flipper.app`
            // Where 8081 is the port where the Expo project is being hosted.
            __flipperHack: "React Native packager is running"
        };
    }
    /** Resolve all assets and set them on the manifest as URLs */ async mutateManifestWithAssetsAsync(manifest, bundleUrl) {
        await (0, _resolveAssets).resolveManifestAssets(this.projectRoot, {
            manifest,
            resolver: async (path)=>{
                if (this.options.isNativeWebpack) {
                    // When using our custom dev server, just do assets normally
                    // without the `assets/` subpath redirect.
                    return (0, _url).resolve(bundleUrl.match(/^https?:\/\/.*?\//)[0], path);
                }
                return bundleUrl.match(/^https?:\/\/.*?\//)[0] + "assets/" + path;
            }
        });
        // The server normally inserts this but if we're offline we'll do it here
        await (0, _resolveAssets).resolveGoogleServicesFile(this.projectRoot, manifest);
    }
    getWebBundleUrl() {
        const platform = "web";
        // Read from headers
        const mainModuleName = this.resolveMainModuleName({
            pkg: this.initialProjectConfig.pkg,
            platform
        });
        var _mode;
        return (0, _metroOptions).createBundleUrlPathFromExpoConfig(this.projectRoot, this.initialProjectConfig.exp, {
            platform,
            mainModuleName,
            minify: this.options.minify,
            lazy: (0, _metroOptions).shouldEnableAsyncImports(this.projectRoot),
            mode: (_mode = this.options.mode) != null ? _mode : "development",
            // Hermes doesn't support more modern JS features than most, if not all, modern browser.
            engine: "hermes",
            isExporting: false,
            bytecode: false
        });
    }
    /**
   * Web platforms should create an index.html response using the same script resolution as native.
   *
   * Instead of adding a `bundleUrl` to a `manifest.json` (native) we'll add a `<script src="">`
   * to an `index.html`, this enables the web platform to load JavaScript from the server.
   */ async handleWebRequestAsync(req, res) {
        // Read from headers
        const bundleUrl = this.getWebBundleUrl();
        res.setHeader("Content-Type", "text/html");
        res.end(await (0, _webTemplate).createTemplateHtmlFromExpoConfigAsync(this.projectRoot, {
            exp: this.initialProjectConfig.exp,
            scripts: [
                bundleUrl
            ]
        }));
    }
    /** Exposed for testing. */ async checkBrowserRequestAsync(req, res, next) {
        var ref;
        if (this.platformBundlers.web === "metro" && ((ref = this.initialProjectConfig.exp.platforms) == null ? void 0 : ref.includes("web"))) {
            // NOTE(EvanBacon): This effectively disables the safety check we do on custom runtimes to ensure
            // the `expo-platform` header is included. When `web.bundler=web`, if the user has non-standard Expo
            // code loading then they'll get a web bundle without a clear assertion of platform support.
            const platform = (0, _resolvePlatform).parsePlatformHeader(req);
            // On web, serve the public folder
            if (!platform || platform === "web") {
                var ref1;
                var ref2;
                if ([
                    "static",
                    "server"
                ].includes((ref2 = (ref1 = this.initialProjectConfig.exp.web) == null ? void 0 : ref1.output) != null ? ref2 : "")) {
                    // Skip the spa-styled index.html when static generation is enabled.
                    next();
                    return true;
                } else {
                    await this.handleWebRequestAsync(req, res);
                    return true;
                }
            }
        }
        return false;
    }
    async handleRequestAsync(req, res, next) {
        // First check for standard JavaScript runtimes (aka legacy browsers like Chrome).
        if (await this.checkBrowserRequestAsync(req, res, next)) {
            return;
        }
        // Save device IDs for dev client.
        await this.saveDevicesAsync(req);
        // Read from headers
        const options = this.getParsedHeaders(req);
        const { body , version , headers  } = await this._getManifestResponseAsync(options);
        for (const [headerName, headerValue] of headers){
            res.setHeader(headerName, headerValue);
        }
        res.end(body);
        // Log analytics
        this.trackManifest(version != null ? version : null);
    }
}
exports.ManifestMiddleware = ManifestMiddleware;

//# sourceMappingURL=ManifestMiddleware.js.map