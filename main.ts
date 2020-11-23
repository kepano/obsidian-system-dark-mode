import { App, Workspace, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

export default class SystemDarkMode extends Plugin {

	async onload() {

  // Watch for system changes to color theme 

  window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', event => {
    if (event.matches) {
      console.log('Dark mode active');
      this.updateDarkStyle()

    } else {
      console.log('Light mode active');
      this.updateLightStyle()
    }
  })

  this.enableSystemTheme();

}

  enableSystemTheme = () => {
    (this.app.workspace as any).layoutReady ? this.refreshSystemTheme() : this.app.workspace.on('layout-ready', this.refreshSystemTheme);
  }

  refreshSystemTheme = () => {
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

    if(isDarkMode){
        console.log('Dark mode active');
        this.updateDarkStyle()

      } else {
        console.log('Light mode active');
        this.updateLightStyle()
      }
  }

  updateDarkStyle = () => {
  	document.body.removeClass('theme-light');
    document.body.addClass('theme-dark');
    this.app.workspace.trigger('css-change');
  }

  updateLightStyle = () => {
  	document.body.removeClass('theme-dark');
    document.body.addClass('theme-light');
    this.app.workspace.trigger('css-change');
  }

}