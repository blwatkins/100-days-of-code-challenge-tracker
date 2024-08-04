/*
 * Copyright (C) 2024 brittni and the polar bear LLC.
 *
 * This file is a part of brittni and the polar bear's Generative Art Project Template,
 * which is released under the GNU Affero General Public License, Version 3.0.
 * You may not use this file except in compliance with the license.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. See LICENSE or go to
 * https://www.gnu.org/licenses/agpl-3.0.en.html for full license details.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Affero General Public License for more details.
 */

import js from '@eslint/js';

import es_x from 'eslint-plugin-es-x';
import node from 'eslint-plugin-n';
import security from 'eslint-plugin-security';

import stylistic from '@stylistic/eslint-plugin'

import typescript from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

import tsEslint from 'typescript-eslint';

export default tsEslint.config(
    js.configs.recommended,
    es_x.configs['flat/restrict-to-es2022'],
    node.configs["flat/recommended"],
    security.configs.recommended,
    stylistic.configs['recommended-flat'],
    ...tsEslint.configs.recommended,
    ...tsEslint.configs.recommendedTypeChecked,
    ...tsEslint.configs.strict,
    ...tsEslint.configs.strictTypeChecked,
    ...tsEslint.configs.stylistic,
    ...tsEslint.configs.strictTypeChecked,
    {
        languageOptions: {
            parser: tsParser,
            ecmaVersion: 6,
            sourceType: 'script',

            parserOptions: {
                projectService: {
                    defaultProject: './tsconfig.json'
                },
            }
        },
        plugins: {
            'es-x': es_x,
            '@stylistic': stylistic,
            '@typescript-eslint': typescript
        },
        rules: {
            'one-var': ['error', 'never'],

            'n/no-missing-import': 'off',

            'security/detect-object-injection': 'off',

            '@stylistic/brace-style': ['error', '1tbs'],

            '@stylistic/no-extra-semi': 'error',

            '@stylistic/function-call-argument-newline': ['error', 'consistent'],

            '@stylistic/function-call-spacing': ['error', 'never'],

            '@stylistic/comma-dangle': ['error', 'never'],

            '@stylistic/indent': ['error',
                4,
                {
                    SwitchCase: 1,
                    FunctionDeclaration: {
                        parameters: 'first'
                    },
                    FunctionExpression: {
                        parameters: 'first'
                    }
                }
            ],

            '@stylistic/indent-binary-ops': 'off',

            '@stylistic/member-delimiter-style': ['error', {
                multiline: {
                    delimiter: 'semi',
                    requireLast: false
                },
                singleline: {
                    delimiter: 'semi',
                    requireLast: false
                }
            }],

            '@stylistic/operator-linebreak': ['error', 'after'],

            '@stylistic/quotes': ['error',
                'single',
                {
                    avoidEscape: true,
                    allowTemplateLiterals: true
                }
            ],

            '@stylistic/semi': ['error', 'always'],

            'dot-notation': 'off',
            '@typescript-eslint/dot-notation': 'error',

            'no-array-constructor': 'off',
            '@typescript-eslint/no-array-constructor': 'error',

            'no-empty-function': 'off',
            '@typescript-eslint/no-empty-function': 'error',

            'no-loop-func': 'off',
            '@typescript-eslint/no-loop-func': 'error',

            'no-loss-of-precision': 'off',
            '@typescript-eslint/no-loss-of-precision': 'error',

            'no-shadow': 'off',
            '@typescript-eslint/no-shadow': 'error',

            'no-unused-expressions': 'off',
            '@typescript-eslint/no-unused-expressions': 'error',

            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'error',

            'no-use-before-define': 'off',
            '@typescript-eslint/no-use-before-define': 'error',

            'no-useless-constructor': 'off',
            '@typescript-eslint/no-useless-constructor': 'error',

            '@typescript-eslint/class-literal-property-style': ['error', 'getters'],

            '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

            '@typescript-eslint/no-explicit-any': 'off',

            '@typescript-eslint/no-extraneous-class': ['error', {
                allowStaticOnly: true,
            }],

            '@typescript-eslint/no-inferrable-types': 'off',

            '@typescript-eslint/prefer-for-of': 'off'
        }
    }
);
