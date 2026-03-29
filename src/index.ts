import { NAME, TRANSLATION } from './translations'
import { SETTINGS } from './settings'
import { getPlaceButtons, getPointButtons, getTabButtons } from './buttons'
import { E40 } from './e40'
import { setE40Instance } from './helpers'
import css from './style.css'

WMEUI.addTranslation(NAME, TRANSLATION)
WMEUI.addStyle(css)

$(document).on('bootstrap.wme', () => {
  let instance = new E40(NAME, SETTINGS, getTabButtons(), getPlaceButtons(), getPointButtons())
  setE40Instance(instance)
})
