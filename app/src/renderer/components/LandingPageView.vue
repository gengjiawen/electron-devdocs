<template>
  <div class="container">
    <el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit">
      <el-tab-pane
              v-for="(item, index) in editableTabs"
              :key="index"
              :label="item.title"
              :name="item.name" >
        <!--<version></version>-->
        <!--{{item.url}} {{item.name}}-->
        <webview :src="item.url" v-on:new-window="handleUrl"></webview>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import Version from './LandingPageView/Versions.vue'
  import {shell} from 'electron'
  export default {
    components: {
      Version
    },
    data () {
      return {
        editableTabsValue: '1',
        editableTabs: [{
          title: 'Devdocs',
          name: '1',
          url: 'https://devdocs.io'
        }],
        tabIndex: 1
      }
    },
    mounted () {
      console.log('mounted')
//      this is hack for weird webview bug
//      only in mac, investigate tommorow
//      if (this.tabIndex === 1) {
//        setTimeout(() => {
//          this.$el.querySelector('webview').reload()
//        }, 3000)
//      }
    },
    methods: {
      handleTabsEdit (targetName, action) {
        if (action === 'add') {
          let newTabName = ++this.tabIndex + ''
          this.editableTabs.push({
            title: 'Devdocs',
            name: newTabName,
            url: 'https://devdocs.io'
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
      handleUrl (e) {
        shell.openExternal(e.url)
      }
    }
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
