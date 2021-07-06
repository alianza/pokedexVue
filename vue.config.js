module.exports = {
    pwa: {
        name: 'PokéDex Vue App',
        themeColor: '#8a2be2',
        msTileColor: '#8a2be2',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'default',
        manifestPath: 'manifest.json',
        workboxOptions: {
            exclude: [/_redirects/]
        }
    }
}
