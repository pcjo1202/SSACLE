import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  { ignores: ["dist"] },
  {
    extends:["prettier"],
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: { react: { version: "19.0.0" } },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      // React 관련 규칙
      "react/prop-types": "off", // prop-types 검사 비활성화
      "react/react-in-jsx-scope": "off", // React import 검사 비활성화

      // 변수 관련 규칙
      "no-unused-vars": "warn", // 사용하지 않는 변수 경고
      "prefer-const": "warn", // let 대신 const 사용 권장

      // 디버깅 관련 규칙
      "no-console": "warn", // console.log() 사용 시 경고
      "no-undef": "error", // 정의되지 않은 변수 사용 금지
      "no-multiple-empty-lines": ["error", { "max": 2 }], // 연속된 빈 줄 금지

      // 코드 스타일 규칙
      "semi": ["error", "never"], // 세미콜론 사용 금지
      
      // 함수 관련 규칙
      'arrow-parens': ['warn', 'always'], // 화살표 함수 매개변수 괄호 필수
      'func-style': ['warn', 'expression'], // 함수 표현식 사용 권장
      
      // 객체/배열 관련 규칙
      'array-bracket-spacing': ['error', 'never'], // 배열 대괄호 내부 공백 금지
      
      // 네이밍 규칙
      'camelcase': ['error', { properties: 'never' }], // camelCase 강제
      
      // 코드 복잡도 관련 규칙
      'max-depth': ['error', 4], // 중첩 블록 최대 깊이
      
      // ES6+ 관련 규칙
      'no-var': 'error', // var 사용 금지
      'prefer-template': 'warn', // 템플릿 리터럴 사용 권장
      'prefer-destructuring': ['warn', { array: true, object: true }], // 구조 분해 할당 권장
      'prefer-spread': 'warn', // spread 연산자 사용 권장
      
      // 공백과 줄바꿈 관련 규칙
      'no-trailing-spaces': 'warn', // 줄 끝 공백 금지
      
      // import/export 관련 규칙
      'sort-imports': ['error', { ignoreDeclarationSort: true }], // import 문 정렬
      'no-duplicate-imports': 'error' // 중복 import 금지
    },
  },
];
