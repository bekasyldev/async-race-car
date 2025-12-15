import path from "node:path";

import { includeIgnoreFile } from "@eslint/compat";
import js from "@eslint/js";
import { configs, plugins, rules } from "eslint-config-airbnb-extended";
import { rules as prettierConfigRules } from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

const gitignorePath = path.resolve(".", ".gitignore");

const jsConfig = [
    // ESLint Recommended Rules
    {
        name: "js/config",
        ...js.configs.recommended,
    },
    // Stylistic Plugin
    plugins.stylistic,
    // Import X Plugin
    plugins.importX,
    // Airbnb Base Recommended Config
    ...configs.base.recommended,
    // Strict Import Config
    rules.base.importsStrict,
];

const reactConfig = [
    // React Plugin
    plugins.react,
    // React Hooks Plugin
    plugins.reactHooks,
    // React JSX A11y Plugin
    plugins.reactA11y,
    // Airbnb React Recommended Config
    ...configs.react.recommended,
    // Strict React Config
    rules.react.strict,
];

const typescriptConfig = [
    // TypeScript ESLint Plugin
    plugins.typescriptEslint,
    // Airbnb Base TypeScript Config
    ...configs.base.typescript,
    // Strict TypeScript Config
    rules.typescript.typescriptEslintStrict,
    // Airbnb React TypeScript Config
    ...configs.react.typescript,
];

const prettierConfig = [
    // Prettier Plugin
    {
        name: "prettier/plugin/config",
        plugins: {
            prettier: prettierPlugin,
        },
    },
    // Prettier Config
    {
        name: "prettier/config",
        rules: {
            ...prettierConfigRules,
            "prettier/prettier": "error",
        },
    },
];

export default [
    // Ignore .gitignore files/folder in eslint
    includeIgnoreFile(gitignorePath),
    // Javascript Config
    ...jsConfig,
    // React Config
    ...reactConfig,
    // TypeScript Config
    ...typescriptConfig,
    // Prettier Config
    ...prettierConfig,
    // Custom Rules
    {
        name: "custom/rules",
        rules: {
            // Modern React doesn't need React import
            "react/react-in-jsx-scope": "off",
            // Allow default exports (common in React)
            "import-x/prefer-default-export": "off",
            // Allow underscore in query params (_page, _limit)
            "no-underscore-dangle": ["error", { allow: ["_page", "_limit", "_sort", "_order"] }],
            // Assignment requirements
            "max-lines-per-function": [
                "error",
                { max: 40, skipBlankLines: true, skipComments: true },
            ],
            "no-magic-numbers": [
                "warn",
                {
                    ignore: [0, 1, -1],
                    ignoreArrayIndexes: true,
                    ignoreDefaultValues: true,
                },
            ],
            // Turn off strict naming for interfaces (allow DTO pattern)
            "@typescript-eslint/naming-convention": "off",
            // Allow function components without explicit return types
            "@typescript-eslint/explicit-module-boundary-types": "off",
            // Allow non-null assertions in DOM code
            "@typescript-eslint/no-non-null-assertion": "warn",
            // Relax prop types rules for TypeScript projects
            "react/require-default-props": "off",
            "react/no-unused-prop-types": "off",
            // Allow both arrow and regular functions for components
            "react/function-component-definition": [
                "error",
                {
                    namedComponents: ["arrow-function", "function-declaration"],
                    unnamedComponents: "arrow-function",
                },
            ],
            // Allow .tsx extensions in imports
            "import-x/extensions": [
                "error",
                "ignorePackages",
                {
                    ts: "never",
                    tsx: "never",
                },
            ],
            // Allow ++ in for loops
            "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
        },
    },
];
