"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.getPackageEntryPoint = getPackageEntryPoint;
exports.redirectModulePath = redirectModulePath;
var _toPosixPath = _interopRequireDefault(require("./utils/toPosixPath"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function getPackageEntryPoint(context, packageInfo, platform) {
  const { mainFields } = context;
  const pkg = packageInfo.packageJson;
  let main = "index";
  for (const name of mainFields) {
    if (typeof pkg[name] === "string" && pkg[name].length) {
      main = pkg[name];
      break;
    }
  }
  const variants = [
    main,
    main.slice(0, 2) === "./" ? main.slice(2) : "./" + main,
  ].flatMap((variant) => [
    variant,
    variant + ".js",
    variant + ".json",
    variant.replace(/(\.js|\.json)$/, ""),
  ]);
  const replacement = matchSubpathFromMainFields(variants, pkg, mainFields);
  if (typeof replacement === "string") {
    return replacement;
  }
  return main;
}
function redirectModulePath(context, modulePath) {
  const { getPackageForModule, mainFields, originModulePath } = context;
  const containingPackage = getPackageForModule(
    _path.default.isAbsolute(modulePath) ? modulePath : originModulePath
  );
  if (containingPackage == null) {
    return modulePath;
  }
  let redirectedPath;
  if (modulePath.startsWith(".") || _path.default.isAbsolute(modulePath)) {
    const packageRelativeModulePath = _path.default.relative(
      containingPackage.rootPath,
      _path.default.resolve(_path.default.dirname(originModulePath), modulePath)
    );
    redirectedPath = matchSubpathFromMainFields(
      "./" + (0, _toPosixPath.default)(packageRelativeModulePath),
      containingPackage.packageJson,
      mainFields
    );
    if (typeof redirectedPath === "string") {
      redirectedPath = _path.default.resolve(
        containingPackage.rootPath,
        redirectedPath
      );
    }
  } else {
    redirectedPath = matchSubpathFromMainFields(
      modulePath,
      containingPackage.packageJson,
      mainFields
    );
  }
  if (redirectedPath != null) {
    return redirectedPath;
  }
  return modulePath;
}
function matchSubpathFromMainFields(subpath, pkg, mainFields) {
  const fieldValues = mainFields
    .map((name) => pkg[name])
    .filter((value) => value != null && typeof value !== "string");
  if (!fieldValues.length) {
    return null;
  }
  const replacements = Object.assign({}, ...fieldValues.reverse());
  const variants = Array.isArray(subpath)
    ? subpath
    : expandSubpathVariants(subpath);
  for (const variant of variants) {
    const replacement = replacements[variant];
    if (replacement != null) {
      return replacement;
    }
  }
  return null;
}
function expandSubpathVariants(subpath) {
  return [subpath, subpath + ".js", subpath + ".json"];
}
