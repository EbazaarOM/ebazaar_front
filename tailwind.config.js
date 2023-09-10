module.exports = {
  purge: {
    content: ['./components/**/*.js', './pages/**/*.js'],
    options: {
      whitelistPatterns: [/^grid-cols-/]
    }
  },
  theme: {
    screens: require('./commons/ui/theme/screens'),
    spacing: require('./commons/ui/theme/spacing'),
    inset: require('./commons/ui/theme/spacing'),
    colors: require('./commons/ui/theme/colors'),
    fontSize: require('./commons/ui/theme/fontSize'),
    borderRadius: require('./commons/ui/theme/borderRadius'),
    lineHeight: require('./commons/ui/theme/lineHeight'),
    zIndex: require('./commons/ui/theme/zIndex'),
    opacity: require('./commons/ui/theme/opacity'),
    maxWidth: require('./commons/ui/theme/maxWidth'),
    minWidth: require('./commons/ui/theme/minWidth'),
    maxHeight: require('./commons/ui/theme/maxHeight'),
    minHeight: require('./commons/ui/theme/minHeight'),
    fontFamily: require('./commons/ui/theme/fontFamily'),
    cursor: require('./commons/ui/theme/cursor')
  },
  variants: {
    textColor: ['hover', 'group-hover', 'responsive'],
    backgroundColor: ['hover', 'group-hover', 'responsive'],
    opacity: ['hover', 'group-hover', 'responsive'],
    transform: ['responsive', 'hover'],
    scale: ['hover', 'group-hover', 'responsive'],
    translate: ['hover', 'group-hover', 'responsive'],
    margin: ['last', 'responsive'],
    pointerEvents: ['group-hover', 'responsive'],
    borderColor: ['group-hover', 'responsive', 'hover', 'focus', 'last'],
    borderOpacity: ['responsive', 'hover', 'focus', 'last'],
    borderRadius: ['responsive', 'last'],
    borderStyle: ['responsive', 'last'],
    borderWidth: ['responsive', 'last', 'first'],
    padding: ['hover', 'group-hover', 'responsive']
  },
  corePlugins: require('./commons/ui/plugins/corePlugins'),
  plugins: require('./commons/ui/plugins')
};
