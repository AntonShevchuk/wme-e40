// User level required for apply geometry for all entities in the view area
export const REQUIRED_LEVEL = 2

// Translations
export const TRANSLATION: Record<string, any> = {
  'en': {
    title: 'POI Geometry',
    description: 'Change geometry in the current view area',
    options: {
      title: 'Navigation Points',
      navigationPoint: 'Highlight entrance for selected place',
      navigationPointAll: 'Highlight all entrances for selected place',
      navigationPointOnHover: 'Highlight entrance on hover',
    },
    warning: '⚠️ This option is available for editors with a rank higher than ' + REQUIRED_LEVEL,
    help: 'You can use the <strong>Keyboard shortcuts</strong> to apply the settings. It\'s more convenient than clicking on the buttons.',
    orthogonalize: 'Orthogonalize',
    smooth: 'Smooth',
    simplify: 'Simplify',
    scale: 'Scale',
    rotate: 'Rotate',
    circle: 'Circle',
    square: 'Square',
    copy: 'Copy',
    about: '<a href="https://greasyfork.org/scripts/388271-wme-e40-geometry">WME E40 Geometry</a>',
  },
  'uk': {
    title: 'Геометрія POI',
    description: 'Змінити геометрію об\u2019єктів у поточному розташуванні',
    options: {
      title: 'Точки навігації',
      navigationPoint: 'Підсвічувати навігацію до місця',
      navigationPointAll: 'Підсвічувати навігацію до всіх точок входу',
      navigationPointOnHover: 'Підсвічувати навігацію за наведенням мишки',
    },
    warning: '⚠️ Ця опція доступна лише для редакторів з рангом вищім ніж ' + REQUIRED_LEVEL,
    help: 'Використовуйте <strong>гарячі клавіши</strong>, це значно швидше ніж використовувати кнопки',
    orthogonalize: 'Вирівняти',
    smooth: 'Згладити',
    simplify: 'Спростити',
    scale: 'Масштабувати',
    rotate: 'Повернути',
    circle: 'Круг',
    square: 'Квадрат',
    copy: 'Копіювати',
    about: '<a href="https://greasyfork.org/uk/scripts/388271-wme-e40-geometry">WME E40 Geometry</a>',
  },
  'ru': {
    title: 'Геометрия POI',
    description: 'Изменить геометрию объектов в текущем расположении',
    options: {
      title: 'Точки навигации',
      navigationPoint: 'Показывать навигацию до выбранного места',
      navigationPointAll: 'Показывать навигацию ко всем точкам входа',
      navigationPointOnHover: 'Подсвечивать навигацию при наведении мыши',
    },
    warning: '⚠️ Эта опция доступна для редакторов с рангов выше ' + REQUIRED_LEVEL,
    help: 'Используйте <strong>комбинации клавиш</strong>, и не надо будет клацать кнопки',
    orthogonalize: 'Выровнять',
    smooth: 'Сгладить',
    simplify: 'Упростить',
    scale: 'Масштабировать',
    rotate: 'Повернуть',
    circle: 'Круг',
    square: 'Квадрат',
    copy: 'Копировать',
    about: '<a href="https://greasyfork.org/uk/scripts/388271-wme-e40-geometry">WME E40 Geometry</a>',
  }
}
