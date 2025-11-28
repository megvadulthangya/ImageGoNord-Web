module.exports = {
  lintOnSave: false, // <--- EZ A KULCS! Kikapcsolja az ellenőrzést.
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/global.scss";`
      }
    }
  }
};