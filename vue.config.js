/* eslint-disable no-template-curly-in-string */
module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: 'top.mizuka.kanban',
        artifactName: '${productName}-${version}-${os}-${arch}.${ext}',
        publish: ['github'],
        mac: {
          target: {
            arch: 'universal',
            target: 'dmg'
          }
        }
      },
      nodeIntegration: true
    }
  }
}
