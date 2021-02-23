const path = require('path')
const fs = require('fs')
const { app } = require('electron')
const os = require('os')

const icloudPath = os.platform() === 'darwin' && path.join(os.homedir(), 'Library', 'Mobile Documents', 'com~apple~CloudDocs')

const icloudDir = icloudPath && path.join(icloudPath, app.getName())

if (icloudDir && !fs.existsSync(icloudDir)) {
  fs.mkdirSync(icloudDir)
}

module.exports = {
  icloudPath,
  icloudDir
}
