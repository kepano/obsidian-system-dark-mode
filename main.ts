import { Plugin } from "obsidian";
const { nativeTheme } = require('electron').remote;

export default class SystemDarkMode extends Plugin {
	async onload() {
		// Watch for system changes to color theme
		const media = window.matchMedia("(prefers-color-scheme: dark)");

		const callback = () => {
			if (media.matches || nativeTheme.shouldUseDarkColors) {
				console.log("Dark mode active");
				this.updateDarkStyle();
			} else {
				console.log("Light mode active");
				this.updateLightStyle();
			}
		};

		const eventRef = nativeTheme.on('updated', callback);
		this.register(() => nativeTheme.off('updated', callback));

		media.addEventListener("change", callback);
		// Remove listener when we unload
		this.register(() => media.removeEventListener("change", callback));

		callback();
	}

	updateDarkStyle() {
		// @ts-ignore
		this.app.setTheme('obsidian');
		// @ts-ignore
		this.app.vault.setConfig('theme', 'obsidian');
		this.app.workspace.trigger('css-change');
	}
	
	updateLightStyle() {
		// @ts-ignore
		this.app.setTheme('moonstone');
		// @ts-ignore
		this.app.vault.setConfig('theme', 'moonstone');
			this.app.workspace.trigger('css-change');
	}
}
