"use strict";
//@ts-nocheck
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unused = void 0;
const t = __importStar(require("@babel/types"));
// https://github.com/chuyik/babel-plugin-danger-remove-unused-import
// https://github.com/chuyik/babel-plugin-danger-remove-unused-import/blob/c5454c21e94698a2464a12baa5590761932a71a8/License#L1
exports.unused = {
    Program: {
        exit: (path) => {
            const UnRefBindings = new Map();
            for (const [name, binding] of Object.entries(path.scope.bindings)) {
                if (!binding.path.parentPath || binding.kind !== 'module')
                    continue;
                const source = binding.path.parentPath.get('source');
                const importName = source.node.value;
                if (!t.isStringLiteral(source))
                    continue;
                const key = `${importName}(${source.node.loc &&
                    source.node.loc.start.line})`;
                if (!UnRefBindings.has(key)) {
                    UnRefBindings.set(key, binding);
                }
                if (binding.referenced) {
                    UnRefBindings.set(key, null);
                }
                else {
                    const nodeType = binding.path.node.type;
                    if (nodeType === 'ImportSpecifier') {
                        binding.path.remove();
                    }
                    else if (nodeType === 'ImportDefaultSpecifier') {
                        binding.path.remove();
                    }
                    else if (nodeType === 'ImportNamespaceSpecifier') {
                        binding.path.remove();
                    }
                    else if (binding.path.parentPath) {
                        binding.path.parentPath.remove();
                    }
                }
            }
            UnRefBindings.forEach((binding, key) => {
                if (binding && binding.path.parentPath) {
                    binding.path.parentPath.remove();
                }
            });
        }
    }
};
