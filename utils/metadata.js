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
    },
    {
      path: '/configuracion',
      name: 'Configuración',
      icon: 'cog'
    }
  ],
  security: {
    pages: {
      loggedToAccess: [ '/horarios', '/tareas', '/configuracion' ],
      notLoggedToAccess: [ '/acceder' ],
      safeRedirect: '/',
      redirectWhenLogged: '/horarios'
    }
  },
  cookies: { maxAge: 7 * 24 * 60 * 60, path: '/' }
}