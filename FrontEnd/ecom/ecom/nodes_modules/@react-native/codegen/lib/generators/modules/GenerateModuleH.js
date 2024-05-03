/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 * @format
 */

'use strict';

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArrayLimit(arr, i) ||
    _unsupportedIterableToArray(arr, i) ||
    _nonIterableRest()
  );
}
function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  );
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(o);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit(arr, i) {
  var _i =
    null == arr
      ? null
      : ('undefined' != typeof Symbol && arr[Symbol.iterator]) ||
        arr['@@iterator'];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (((_x = (_i = _i.call(arr)).next), 0 === i)) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else
        for (
          ;
          !(_n = (_s = _x.call(_i)).done) &&
          (_arr.push(_s.value), _arr.length !== i);
          _n = !0
        );
    } catch (err) {
      (_d = !0), (_e = err);
    } finally {
      try {
        if (!_n && null != _i.return && ((_r = _i.return()), Object(_r) !== _r))
          return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
const _require = require('../../parsers/parsers-commons'),
  unwrapNullable = _require.unwrapNullable;
const _require2 = require('../TypeUtils/Cxx'),
  wrapOptional = _require2.wrapOptional;
const _require3 = require('../Utils'),
  getEnumName = _require3.getEnumName,
  toSafeCppString = _require3.toSafeCppString;
const _require4 = require('../Utils'),
  indent = _require4.indent;
const _require5 = require('./Utils'),
  createAliasResolver = _require5.createAliasResolver,
  getAreEnumMembersInteger = _require5.getAreEnumMembersInteger,
  getModules = _require5.getModules,
  isArrayRecursiveMember = _require5.isArrayRecursiveMember,
  isDirectRecursiveMember = _require5.isDirectRecursiveMember;
const ModuleClassDeclarationTemplate = ({
  hasteModuleName,
  moduleProperties,
  structs,
  enums,
}) => {
  return `${enums}
  ${structs}class JSI_EXPORT ${hasteModuleName}CxxSpecJSI : public TurboModule {
protected:
  ${hasteModuleName}CxxSpecJSI(std::shared_ptr<CallInvoker> jsInvoker);

public:
  ${indent(moduleProperties.join('\n'), 2)}

};`;
};
const ModuleSpecClassDeclarationTemplate = ({
  hasteModuleName,
  moduleName,
  moduleProperties,
}) => {
  return `template <typename T>
class JSI_EXPORT ${hasteModuleName}CxxSpec : public TurboModule {
public:
  jsi::Value get(jsi::Runtime &rt, const jsi::PropNameID &propName) override {
    return delegate_.get(rt, propName);
  }

  static constexpr std::string_view kModuleName = "${moduleName}";

protected:
  ${hasteModuleName}CxxSpec(std::shared_ptr<CallInvoker> jsInvoker)
    : TurboModule(std::string{${hasteModuleName}CxxSpec::kModuleName}, jsInvoker),
      delegate_(reinterpret_cast<T*>(this), jsInvoker) {}

private:
  class Delegate : public ${hasteModuleName}CxxSpecJSI {
  public:
    Delegate(T *instance, std::shared_ptr<CallInvoker> jsInvoker) :
      ${hasteModuleName}CxxSpecJSI(std::move(jsInvoker)), instance_(instance) {}

    ${indent(moduleProperties.join('\n'), 4)}

  private:
    T *instance_;
  };

  Delegate delegate_;
};`;
};
const FileTemplate = ({modules}) => {
  return `/**
 * This code was generated by [react-native-codegen](https://www.npmjs.com/package/react-native-codegen).
 *
 * Do not edit this file as changes may cause incorrect behavior and will be lost
 * once the code is regenerated.
 *
 * ${'@'}generated by codegen project: GenerateModuleH.js
 */

#pragma once

#include <ReactCommon/TurboModule.h>
#include <react/bridging/Bridging.h>

namespace facebook::react {

${modules.join('\n\n')}

} // namespace facebook::react
`;
};
function translatePrimitiveJSTypeToCpp(
  moduleName,
  parentObjectAliasName,
  nullableTypeAnnotation,
  optional,
  createErrorMessage,
  resolveAlias,
  enumMap,
) {
  const _unwrapNullable = unwrapNullable(nullableTypeAnnotation),
    _unwrapNullable2 = _slicedToArray(_unwrapNullable, 2),
    typeAnnotation = _unwrapNullable2[0],
    nullable = _unwrapNullable2[1];
  const isRecursiveType = isDirectRecursiveMember(
    parentObjectAliasName,
    nullableTypeAnnotation,
  );
  const isRequired = (!optional && !nullable) || isRecursiveType;
  let realTypeAnnotation = typeAnnotation;
  if (realTypeAnnotation.type === 'TypeAliasTypeAnnotation') {
    realTypeAnnotation = resolveAlias(realTypeAnnotation.name);
  }
  switch (realTypeAnnotation.type) {
    case 'ReservedTypeAnnotation':
      switch (realTypeAnnotation.name) {
        case 'RootTag':
          return wrapOptional('double', isRequired);
        default:
          realTypeAnnotation.name;
          throw new Error(createErrorMessage(realTypeAnnotation.name));
      }
    case 'VoidTypeAnnotation':
      return 'void';
    case 'StringTypeAnnotation':
      return wrapOptional('jsi::String', isRequired);
    case 'NumberTypeAnnotation':
      return wrapOptional('double', isRequired);
    case 'DoubleTypeAnnotation':
      return wrapOptional('double', isRequired);
    case 'FloatTypeAnnotation':
      return wrapOptional('double', isRequired);
    case 'Int32TypeAnnotation':
      return wrapOptional('int', isRequired);
    case 'BooleanTypeAnnotation':
      return wrapOptional('bool', isRequired);
    case 'EnumDeclaration':
      switch (realTypeAnnotation.memberType) {
        case 'NumberTypeAnnotation':
          return wrapOptional('jsi::Value', isRequired);
        case 'StringTypeAnnotation':
          return wrapOptional('jsi::String', isRequired);
        default:
          throw new Error(createErrorMessage(realTypeAnnotation.type));
      }
    case 'GenericObjectTypeAnnotation':
      return wrapOptional('jsi::Object', isRequired);
    case 'UnionTypeAnnotation':
      switch (typeAnnotation.memberType) {
        case 'NumberTypeAnnotation':
          return wrapOptional('double', isRequired);
        case 'ObjectTypeAnnotation':
          return wrapOptional('jsi::Object', isRequired);
        case 'StringTypeAnnotation':
          return wrapOptional('jsi::String', isRequired);
        default:
          throw new Error(createErrorMessage(realTypeAnnotation.type));
      }
    case 'ObjectTypeAnnotation':
      return wrapOptional('jsi::Object', isRequired);
    case 'ArrayTypeAnnotation':
      return wrapOptional('jsi::Array', isRequired);
    case 'FunctionTypeAnnotation':
      return wrapOptional('jsi::Function', isRequired);
    case 'PromiseTypeAnnotation':
      return wrapOptional('jsi::Value', isRequired);
    case 'MixedTypeAnnotation':
      return wrapOptional('jsi::Value', isRequired);
    default:
      realTypeAnnotation.type;
      throw new Error(createErrorMessage(realTypeAnnotation.type));
  }
}
function createStructsString(moduleName, aliasMap, resolveAlias, enumMap) {
  const getCppType = (parentObjectAlias, v) =>
    translatePrimitiveJSTypeToCpp(
      moduleName,
      parentObjectAlias,
      v.typeAnnotation,
      false,
      typeName => `Unsupported type for param "${v.name}". Found: ${typeName}`,
      resolveAlias,
      enumMap,
    );

  // TODO: T171006733 [Begin] Remove deprecated Cxx TMs structs after a new release.
  return (
    Object.keys(aliasMap)
      .map(alias => {
        const value = aliasMap[alias];
        if (value.properties.length === 0) {
          return '';
        }
        const structName = `${moduleName}Base${alias}`;
        const structNameNew = `${moduleName}${alias}`;
        const templateParameterWithTypename = value.properties
          .map((v, i) => `typename P${i}`)
          .join(', ');
        const templateParameter = value.properties
          .map((v, i) => 'P' + i)
          .join(', ');
        const debugParameterConversion = value.properties
          .map(
            (v, i) => `  static ${getCppType(alias, v)} ${
              v.name
            }ToJs(jsi::Runtime &rt, P${i} value) {
    return bridging::toJs(rt, value);
  }`,
          )
          .join('\n\n');
        return `
#pragma mark - ${structName}

template <${templateParameterWithTypename}>
struct [[deprecated("Use ${structNameNew} instead.")]] ${structName} {
${value.properties.map((v, i) => '  P' + i + ' ' + v.name).join(';\n')};
  bool operator==(const ${structName} &other) const {
    return ${value.properties
      .map(v => `${v.name} == other.${v.name}`)
      .join(' && ')};
  }
};

template <${templateParameterWithTypename}>
struct [[deprecated("Use ${structNameNew}Bridging instead.")]] ${structName}Bridging {
  static ${structName}<${templateParameter}> fromJs(
      jsi::Runtime &rt,
      const jsi::Object &value,
      const std::shared_ptr<CallInvoker> &jsInvoker) {
    ${structName}<${templateParameter}> result{
${value.properties
  .map(
    (v, i) =>
      `      bridging::fromJs<P${i}>(rt, value.getProperty(rt, "${v.name}"), jsInvoker)`,
  )
  .join(',\n')}};
    return result;
  }

#ifdef DEBUG
${debugParameterConversion}
#endif

  static jsi::Object toJs(
      jsi::Runtime &rt,
      const ${structName}<${templateParameter}> &value,
      const std::shared_ptr<CallInvoker> &jsInvoker) {
    auto result = facebook::jsi::Object(rt);
${value.properties
  .map((v, i) => {
    if (v.optional) {
      return `    if (value.${v.name}) {
      result.setProperty(rt, "${v.name}", bridging::toJs(rt, value.${v.name}.value(), jsInvoker));
    }`;
    } else {
      return `    result.setProperty(rt, "${v.name}", bridging::toJs(rt, value.${v.name}, jsInvoker));`;
    }
  })
  .join('\n')}
    return result;
  }
};

`;
      })
      .join('\n') +
    // TODO: T171006733 [End] Remove deprecated Cxx TMs structs after a new release.
    Object.keys(aliasMap)
      .map(alias => {
        const value = aliasMap[alias];
        if (value.properties.length === 0) {
          return '';
        }
        const structName = `${moduleName}${alias}`;
        const templateParameter = value.properties.filter(
          v =>
            !isDirectRecursiveMember(alias, v.typeAnnotation) &&
            !isArrayRecursiveMember(alias, v.typeAnnotation),
        );
        const templateParameterWithTypename = templateParameter
          .map((v, i) => `typename P${i}`)
          .join(', ');
        const templateParameterWithoutTypename = templateParameter
          .map((v, i) => `P${i}`)
          .join(', ');
        let i = -1;
        const templateMemberTypes = value.properties.map(v => {
          if (isDirectRecursiveMember(alias, v.typeAnnotation)) {
            return `std::unique_ptr<${structName}<${templateParameterWithoutTypename}>> ${v.name}`;
          } else if (isArrayRecursiveMember(alias, v.typeAnnotation)) {
            const _unwrapNullable3 = unwrapNullable(v.typeAnnotation),
              _unwrapNullable4 = _slicedToArray(_unwrapNullable3, 1),
              nullable = _unwrapNullable4[0];
            return (
              (nullable
                ? `std::optional<std::vector<${structName}<${templateParameterWithoutTypename}>>>`
                : `std::vector<${structName}<${templateParameterWithoutTypename}>>`) +
              ` ${v.name}`
            );
          } else {
            i++;
            return `P${i} ${v.name}`;
          }
        });
        const debugParameterConversion = value.properties
          .map(
            v => `  static ${getCppType(alias, v)} ${
              v.name
            }ToJs(jsi::Runtime &rt, decltype(types.${v.name}) value) {
    return bridging::toJs(rt, value);
  }`,
          )
          .join('\n\n');
        return `
#pragma mark - ${structName}

template <${templateParameterWithTypename}>
struct ${structName} {
${templateMemberTypes.map(v => '  ' + v).join(';\n')};
  bool operator==(const ${structName} &other) const {
    return ${value.properties
      .map(v => `${v.name} == other.${v.name}`)
      .join(' && ')};
  }
};

template <typename T>
struct ${structName}Bridging {
  static T types;

  static T fromJs(
      jsi::Runtime &rt,
      const jsi::Object &value,
      const std::shared_ptr<CallInvoker> &jsInvoker) {
    T result{
${value.properties
  .map(v => {
    if (isDirectRecursiveMember(alias, v.typeAnnotation)) {
      return `      value.hasProperty(rt, "${v.name}") ? std::make_unique<T>(bridging::fromJs<T>(rt, value.getProperty(rt, "${v.name}"), jsInvoker)) : nullptr`;
    } else {
      return `      bridging::fromJs<decltype(types.${v.name})>(rt, value.getProperty(rt, "${v.name}"), jsInvoker)`;
    }
  })
  .join(',\n')}};
    return result;
  }

#ifdef DEBUG
${debugParameterConversion}
#endif

  static jsi::Object toJs(
      jsi::Runtime &rt,
      const T &value,
      const std::shared_ptr<CallInvoker> &jsInvoker) {
    auto result = facebook::jsi::Object(rt);
${value.properties
  .map(v => {
    if (isDirectRecursiveMember(alias, v.typeAnnotation)) {
      return `    if (value.${v.name}) {
        result.setProperty(rt, "${v.name}", bridging::toJs(rt, *value.${v.name}, jsInvoker));
      }`;
    } else if (v.optional) {
      return `    if (value.${v.name}) {
      result.setProperty(rt, "${v.name}", bridging::toJs(rt, value.${v.name}.value(), jsInvoker));
    }`;
    } else {
      return `    result.setProperty(rt, "${v.name}", bridging::toJs(rt, value.${v.name}, jsInvoker));`;
    }
  })
  .join('\n')}
    return result;
  }
};

`;
      })
      .join('\n')
  );
}
const EnumTemplate = ({
  enumName,
  values,
  fromCases,
  toCases,
  nativeEnumMemberType,
}) => {
  const _ref =
      nativeEnumMemberType === 'std::string'
        ? [
            'const jsi::String &rawValue',
            'std::string value = rawValue.utf8(rt);',
            'jsi::String',
          ]
        : [
            'const jsi::Value &rawValue',
            'double value = (double)rawValue.asNumber();',
            'jsi::Value',
          ],
    _ref2 = _slicedToArray(_ref, 3),
    fromValue = _ref2[0],
    fromValueConversion = _ref2[1],
    toValue = _ref2[2];
  return `
#pragma mark - ${enumName}

enum class ${enumName} { ${values} };

template <>
struct Bridging<${enumName}> {
  static ${enumName} fromJs(jsi::Runtime &rt, ${fromValue}) {
    ${fromValueConversion}
    ${fromCases}
  }

  static ${toValue} toJs(jsi::Runtime &rt, ${enumName} value) {
    ${toCases}
  }
};`;
};
function generateEnum(moduleName, origEnumName, members, memberType) {
  const enumName = getEnumName(moduleName, origEnumName);
  const nativeEnumMemberType =
    memberType === 'StringTypeAnnotation'
      ? 'std::string'
      : getAreEnumMembersInteger(members)
      ? 'int32_t'
      : 'float';
  const getMemberValueAppearance = value =>
    memberType === 'StringTypeAnnotation'
      ? `"${value}"`
      : `${value}${nativeEnumMemberType === 'float' ? 'f' : ''}`;
  const fromCases =
    members
      .map(
        member => `if (value == ${getMemberValueAppearance(member.value)}) {
      return ${enumName}::${toSafeCppString(member.name)};
    }`,
      )
      .join(' else ') +
    ` else {
      throw jsi::JSError(rt, "No appropriate enum member found for value");
    }`;
  const toCases =
    members
      .map(
        member => `if (value == ${enumName}::${toSafeCppString(member.name)}) {
      return bridging::toJs(rt, ${getMemberValueAppearance(member.value)});
    }`,
      )
      .join(' else ') +
    ` else {
      throw jsi::JSError(rt, "No appropriate enum member found for enum value");
    }`;
  return EnumTemplate({
    enumName,
    values: members.map(member => member.name).join(', '),
    fromCases,
    toCases,
    nativeEnumMemberType,
  });
}
function createEnums(moduleName, enumMap, resolveAlias) {
  return Object.entries(enumMap)
    .map(([enumName, enumNode]) => {
      return generateEnum(
        moduleName,
        enumName,
        enumNode.members,
        enumNode.memberType,
      );
    })
    .filter(Boolean)
    .join('\n');
}
function translatePropertyToCpp(
  moduleName,
  prop,
  resolveAlias,
  enumMap,
  abstract = false,
) {
  const _unwrapNullable5 = unwrapNullable(prop.typeAnnotation),
    _unwrapNullable6 = _slicedToArray(_unwrapNullable5, 1),
    propTypeAnnotation = _unwrapNullable6[0];
  const params = propTypeAnnotation.params.map(
    param => `std::move(${param.name})`,
  );
  const paramTypes = propTypeAnnotation.params.map(param => {
    const translatedParam = translatePrimitiveJSTypeToCpp(
      moduleName,
      null,
      param.typeAnnotation,
      param.optional,
      typeName =>
        `Unsupported type for param "${param.name}" in ${prop.name}. Found: ${typeName}`,
      resolveAlias,
      enumMap,
    );
    return `${translatedParam} ${param.name}`;
  });
  const returnType = translatePrimitiveJSTypeToCpp(
    moduleName,
    null,
    propTypeAnnotation.returnTypeAnnotation,
    false,
    typeName => `Unsupported return type for ${prop.name}. Found: ${typeName}`,
    resolveAlias,
    enumMap,
  );

  // The first param will always be the runtime reference.
  paramTypes.unshift('jsi::Runtime &rt');
  const method = `${returnType} ${prop.name}(${paramTypes.join(', ')})`;
  if (abstract) {
    return `virtual ${method} = 0;`;
  }
  return `${method} override {
  static_assert(
      bridging::getParameterCount(&T::${prop.name}) == ${paramTypes.length},
      "Expected ${prop.name}(...) to have ${paramTypes.length} parameters");

  return bridging::callFromJs<${returnType}>(
      rt, &T::${prop.name}, jsInvoker_, ${['instance_', ...params].join(', ')});
}`;
}
module.exports = {
  generate(
    libraryName,
    schema,
    packageName,
    assumeNonnull = false,
    headerPrefix,
  ) {
    const nativeModules = getModules(schema);
    const modules = Object.keys(nativeModules).flatMap(hasteModuleName => {
      const _nativeModules$hasteM = nativeModules[hasteModuleName],
        aliasMap = _nativeModules$hasteM.aliasMap,
        enumMap = _nativeModules$hasteM.enumMap,
        properties = _nativeModules$hasteM.spec.properties,
        moduleName = _nativeModules$hasteM.moduleName;
      const resolveAlias = createAliasResolver(aliasMap);
      const structs = createStructsString(
        moduleName,
        aliasMap,
        resolveAlias,
        enumMap,
      );
      const enums = createEnums(moduleName, enumMap, resolveAlias);
      return [
        ModuleClassDeclarationTemplate({
          hasteModuleName,
          moduleProperties: properties.map(prop =>
            translatePropertyToCpp(
              moduleName,
              prop,
              resolveAlias,
              enumMap,
              true,
            ),
          ),
          structs,
          enums,
        }),
        ModuleSpecClassDeclarationTemplate({
          hasteModuleName,
          moduleName,
          moduleProperties: properties.map(prop =>
            translatePropertyToCpp(moduleName, prop, resolveAlias, enumMap),
          ),
        }),
      ];
    });
    const fileName = `${libraryName}JSI.h`;
    const replacedTemplate = FileTemplate({
      modules,
    });
    return new Map([[fileName, replacedTemplate]]);
  },
};
