<template>
  <div class="container">
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      editable
      @edit="handleTabsEdit"
    >
      <el-tab-pane
        v-for="(item, index) in editableTabs"
        :key="index"
        :label="item.title"
        :name="item.name"
      >
        <webview
          ref="webview"
          :src="item.url"
          v-on:new-window="handleUrl"
          @dom-ready="domReady"
        ></webview>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { shell } from 'electron'

export default {
  name: 'landing-page',
  data() {
    return {
      editableTabsValue: '1',
      editableTabs: [
        {
          title: 'Devdocs',
          name: '1',
          url: 'https://devdocs.io',
        },
      ],
      tabIndex: 1,
    }
  },
  mounted: () => {},
  methods: {
    handleTabsEdit(targetName, action) {
      console.log(targetName, action)
      if (action === 'add') {
        let newTabName = ++this.tabIndex + ''
        console.log(newTabName)
        this.editableTabs.push({
          title: 'Devdocs',
          name: newTabName,
          url: 'https://devdocs.io',
        })
        this.editableTabsValue = newTabName
      }
      if (action === 'remove') {
        let tabs = this.editableTabs
        let activeName = this.editableTabsValue
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                activeName = nextTab.name
              }
            }
          })
        }

        this.editableTabsValue = activeName
        this.editableTabs = tabs.filter(tab => tab.name !== targetName)
      }
    },
    handleUrl(e) {
      shell.openExternal(e.url)
    },
    domReady() {
      console.log('ready')
      console.log(this.$refs)
      const webviewElements = this.$refs.webview
      webviewElements.forEach(i => {
        require('electron-context-menu')({
          window: i,
          prepend: params => [
            {
              label: 'Google Search',
              click: () => {
                console.log(params)
                shell.openExternal(
                  `https://www.google.com/search?q=${params.selectionText}&&client=electron-devdocs-by-danile-geng`
                )
              },
            },
          ],
        })
      })

      // webviewElement.openDevTools()
    },
  },
}
</script>

<style scoped>
div {
  height: 100%;
}
webview {
  height: 100%;
}
</style>
