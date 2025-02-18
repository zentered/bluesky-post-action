import globals from 'globals'
import js from '@eslint/js'

export default [
  js.configs.recommended,
  {
    ignores: ['dist', 'node_modules']
  },
  {
    languageOptions: {
      globals: globals.node
    }
  }
]
