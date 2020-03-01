module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        "productName": "Devdocs",
        "appId": "com.gengjiawen.devdocs",
        "mac": {
          "icon": "build/icons/icon.icns"
        },
        "win": {
          "icon": "build/icons/icon.ico"
        },
        "linux": {
          "icon": "build/icons",
          "category": "Development",
          "target": [
            "AppImage",
            "deb"
          ]
        }
      }
    }
  }
}