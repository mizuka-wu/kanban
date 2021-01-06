module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        mac: {
          target: {
            target: 'dir',
            arch: ['arm64', 'x64']
          }
        }
      },
      nodeIntegration: true
    }
  }
}
