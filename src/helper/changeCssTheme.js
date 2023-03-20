export const changeCssTheme = (theme) => {
  const arrCssProperty = [
    'background1',
    'backgroundlist',
    'backgroundcard',
    'colorcard',
    'headerbackground',
    'headerlinkbackgroundhover',
    'headerlinkbackground',
    'colorlink',
    'chestcolor',
    'sun',
  ]
  const root = document.querySelector(':root')

  arrCssProperty.forEach((property) => {
    root.style.setProperty(
      `--choose-${property}`,
      `var(--${theme}-${property})`
    )
  })
}
