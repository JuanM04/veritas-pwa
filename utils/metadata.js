module.exports = {
  tabs: [
    {
      path: '/horarios',
      name: 'Horarios',
      icon: 'calendar-alt'
    },
    {
      path: '/tareas',
      name: 'Tareas',
      icon: 'tasks'
    }
  ],
  security: {
    pages: {
      loggedToAccess: [ '/horarios', '/tareas' ],
      notLoggedToAccess: [ '/acceder' ],
      safeRedirect: '/',
      redirectWhenLogged: '/horarios'
    }
  }
}