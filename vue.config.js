module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        mac: {
          target: {
            target: 'dir',
            arch: ['arm64', 'x64']
          }
        },
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
