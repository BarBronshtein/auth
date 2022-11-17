import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation';
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		federation({
			name: 'auth-app',
			filename: 'remoteEntry.js',
			exposes: {
				'./Login': './src/exports/login.ts',
				'./App': './src/exports/App.ts',
			},
		}),
	],
	build: {
		outDir: '../auth-app-backend/dist/public',
		emptyOutDir: true,
	},
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
});
