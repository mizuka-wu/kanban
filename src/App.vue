<template>
  <div id="app">
    <draggable v-model="lanes">
      <transition-group class="lanes-container" tag="div">
        <el-card class="lane-card" v-for="lane in lanes" shadow="hover" :key="lane.id" body-style="padding: 6px">
          <div slot="header">
            <div class="lane-name">
              <ClickEdit style="display: inline-block" v-model="lane.name" :options="{ type: 'text' }" />
              <span class="lane-card-number">{{ lane.cards.length }}</span>
              <el-button type="text" icon="el-icon-delete" @click="deleteLane(lane)" />
            </div>
          </div>
          <div class="card-container">
            <draggable v-model="lane.cards" :group="{ name: 'card' }" :emptyInsertThreshold="100">
              <transition-group>
                <div :key="card.id" v-for="card of lane.cards" class="card">
                  <el-tag size="mini" v-for="tag of card.tags" :key="tag">{{ tag }}</el-tag>
                  <div class="name-container">
                    <ClickEdit style="display: inline-block" v-model="card.name" :options="{ type: 'text' }" />
                    <el-popover placement="top-start" title="备注" width="300" trigger="click">
                      <div slot="reference">
                        <div v-html="card.desc || '-'" class="card-desc"></div>
                      </div>
                      <quill-editor ref="myQuillEditor" v-model="card.desc" />
                    </el-popover>
                  </div>
                  <div class="control-container">
                    <div>
                      <el-button type="text" icon="el-icon-delete" @click="deleteCard(lane, card)"></el-button>
                    </div>
                    <div class="time">
                      <el-popover placement="top-start" width="100" trigger="hover">
                        <span slot="reference">
                          {{ card.time || 0 }}
                        </span>
                        <el-input-number v-model="card.time" size="mini" :step="1" :min="0" />
                      </el-popover>
                    </div>
                  </div>
                </div>
              </transition-group>
              <el-button type="text" slot="footer" @click="addCard(lane)">添加卡片</el-button>
            </draggable>
          </div>
        </el-card>
      </transition-group>
    </draggable>
    <div class="control">
      <el-button size="mini" @click="addLane">添加泳道</el-button>
      <el-select size="mini" v-model="src">
        <el-option v-for="mp4 of mp4List" :key="mp4" :label="mp4" :value="mp4" />
      </el-select>
    </div>
    <video :src="src" muted autoplay loop />
  </div>
</template>

<script>
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import { ipcRenderer } from 'electron'

const mp4List = fs.readdirSync(__static).filter(item => item.includes('.mp4')).map((item) => `media://${item}`)

export default {
  components: {
  },
  name: 'App',
  data () {
    return {
      // 泳道
      lanes: [],
      src: mp4List[0],
      mp4List
    }
  },
  methods: {
    addLane () {
      this.lanes.push({
        id: uuidv4(),
        name: 'Story',
        cards: []
      })
    },
    deleteLane (lane) {
      const index = this.lanes.findIndex(({ id }) => id === lane.id)
      this.lanes.splice(index, 1)
    },
    addCard (lane) {
      lane.cards.push({
        id: uuidv4(),
        name: '请输入内容',
        tag: [],
        time: 0

      })
    },
    deleteCard (lane, card) {
      const index = lane.cards.findIndex(({ id }) => id === card.id)
      if (index > -1) {
        lane.cards.splice(index, 1)
      }
    }
  },
  watch: {
    lanes: {
      deep: true,
      handler (lanes) {
        ipcRenderer.send('setStore', {
          name: 'lanes',
          value: lanes
        })
      }
    }
  },
  mounted () {
    const lanes = ipcRenderer.sendSync('getStore', 'lanes') || []
    this.lanes = lanes
  }
}
</script>

<style lang="less">
html,
body,
#app {
  height: 100%;
  margin: 0;
}
#app {
  overflow: auto;
  padding: 8px;
  box-sizing: border-box;
  // background:  #eeeeee url(http://api.btstu.cn/sjbz/?lx=dongman) no-repeat fixed top;
}

* {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.control {
  margin-top: 10px;
}

.lanes-container {
  display: flex;
  width: auto;
}

.lane-card {
  width: 200px;
  flex-shrink: 0;
  flex-basis: 1;
  background: #eeeeee !important;
  box-sizing: content-box;
  height: 100%;

  & + .lane-card {
    margin-left: 8px;
  }

  .el-card__header {
    padding: 6px;
  }
  .lane-name {
    font-weight: 600;
  }
  .lane-card-number {
    color: #ccc;
    margin-left: 5px;
  }

  .card-container {
    max-height: 80vh;
    overflow: auto;
  }

  .card {
    background: #ffffff;
    padding: 4px;
    border-radius: 4px;
    font-weight: 400;

    .card-desc {
      margin: 0;
      text-overflow: ellipsis;
      display: inline-block;
      color: #aaaaaa;
      font-size: 12;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      * {
        width: 100%;
        margin: 0;
      }
    }

    .name-container {
      min-height: 32px;
    }

    .control-container {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      .time {
        border-radius: 8px;
        background: #aaaaaa;
        padding: 2px 8px;
        color: #ffffff;
        font-size: 12px;
        display: inline;
      }
    }

    & + .card {
      margin-top: 8px;
    }
  }
}
video {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  object-fit: cover;
  object-position: 50% 50%;
}
</style>
