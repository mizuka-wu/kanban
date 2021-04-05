/* eslint-disable no-template-curly-in-string */
module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: 'top.mizuka.kanban',
        artifactName: '${productName}-${version}-${os}-${arch}.${ext}',
        publish: ['github'],
        afterSign: 'electron-builder-notarize',
        mac: {
          hardenedRuntime: true,
          target: {
            arch: 'universal',
            target: 'default'
          }
        }
      },
      nodeIntegration: true
    }
  }
}
