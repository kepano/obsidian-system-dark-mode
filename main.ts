import { App, Workspace, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

export default class SystemDarkMode extends Plugin {

  async onload() {

    // Watch for system changes to color theme 

    let media = window.matchMedia('(prefers-color-scheme: dark)');

    let callback = () => {
      if (media.matches) {
        console.log('Dark mode active');
        this.updateDarkStyle()

      } else {
        console.log('Light mode active');
        this.updateLightStyle()
      }
    }
    media.addEventListener('change', callback);

    // Remove listener when we unload

    this.register(() => media.removeEventListener('change', callback));
    
    callback();
  }

  onunload() {
    console.log('System color scheme checking is turned off');
  }

  refreshSystemTheme() {
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

    if(isDarkMode){
        console.log('Dark mode active');
        this.updateDarkStyle()

      } else {
        console.log('Light mode active');
        this.updateLightStyle()
      }
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