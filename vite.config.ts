import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		open: true,
		hmr: true,
		host: "0.0.0.0",
		port: 5656,
		https: false,
		// 代理配置
		proxy: {
			"^/api": {
				target: "http://121.41.44.122:6565/",
				changeOrigin: true,
				rewrite: url => url.replace(/^\/api/, "")
				// bypass: () => {}
			}
		}
	},
	base: "./",
	resolve: {
		alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }]
	},
	plugins: [react()]
});
