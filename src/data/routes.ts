interface Route {
  name: string,
  href: string,
  protect: boolean,
  loggedOut?: boolean
}


export const Routes: Route[] = [
  { name: "Home", href: "/", protect: false },
  { name: "Dashboard", href: "/dashboard", protect: true },
  { name: "History", href: "/history", protect: true },
  { name: "Recent", href: "/recent", protect: true },
  { name: "Graph", href: "/graph", protect: true },
  { name: "Login", href: "/login", protect: false, loggedOut: true },
  { name: "Logout", href: "/logout", protect: true },
  { name: "Register", href: "/register", protect: false, loggedOut: true },
]

