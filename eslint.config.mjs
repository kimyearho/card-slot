import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

import prettierConfig from 'eslint-config-prettier' // 포매팅 규칙 비활성화
// Tailwind CSS 플러그인은 보통 .prettierrc.json에서 처리되므로 여기서는 ESLint 규칙만 설정합니다.

const eslintConfig = defineConfig([
	...nextVitals,
	...nextTs,
	// 🚨 Prettier 설정 추가 (항상 배열의 마지막에 위치하여 포매팅 규칙을 덮어쓰도록 합니다)
	prettierConfig,
	// Override default ignores of eslint-config-next.
	globalIgnores([
		// Default ignores of eslint-config-next:
		'.next/**',
		'out/**',
		'build/**',
		'next-env.d.ts',
	]),
])

export default eslintConfig
