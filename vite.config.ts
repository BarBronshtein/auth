import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation';
// https://vitejs.dev/config/
export default defineConfig({
	base: '',
	plugins: [
		vue(),
		federation({
			name: 'auth-app',
			filename: 'remoteEntry.js',
			exposes: {
				'./Login': './src/exports/login.ts',
				'./Personal-Info': './src/exports/personal-info.ts',
				'./Personal-Info-Edit': './src/exports/personal-info-edit.ts',
				'./Modal': './src/exports/modal.ts',
				'./App-Header': './src/exports/app-header.ts',
				'./Store': './src/exports/Store.ts',
			},
		}),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
});
