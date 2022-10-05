import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa'

const config: UserConfig = {
	plugins: [
		sveltekit(),
		VitePWA({
			workbox: {
                globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
            },
            registerType: "autoUpdate",
            manifest: {
                "background_color": "#ffffff",
                "theme_color": "#7E1F86",
                "name": "Mahjong",
                "short_name": "Mahjong",
                "start_url": "/",
                "display": "standalone",
                "icons": [
                    {
                        "src": "favicon.png",
                        "sizes": "1000x1000",
                        "type": "image/png",
                        "purpose": "maskable any"
                    }
                ]
            }
		})
	]
};

export default config;
