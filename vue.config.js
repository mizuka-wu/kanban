module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        publish: [
          {
            provider: 'github',
            owner: 'mizuka-wu',
            repo: 'kanban',
            releaseType: 'release'
          }
        ]
      },
      nodeIntegration: true
    }
  }
}
