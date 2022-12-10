import Navbar from "@/components/navbar"
import Table from "@/pages/Table"
import Index from "@/pages/Index"
import Dashboard from "@/pages/Dashboard"
import Page404 from "@/pages/404"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Logout from "@/pages/Logout"

import { Route, Switch } from "wouter"
import { useAtom } from 'jotai'
import { userAtom } from "@/state/atoms"

const Layout = () => {
  const [user, _] = useAtom(userAtom)

  const protectedPage = (page: any) => (
    user.token ? page : Login
  )

  const loggedOut = (page: any) => (
    user.token ? Index : page
  )

  return (
    <div className="flex flex-row bg-slate-800 min-h-screen h-full min-w-min w-full">
      <Navbar className="sticky top-0 flex flex-col p-10 bg-slate-700 space-y-4 font-semibold w-40" />
      <div className="p-5 flex flex-col text-white w-full items-center justify-center">
        <Switch>
          <Route path="/" component={Index} />
          <Route path="/login" component={loggedOut(Login)} />
          <Route path="/logout" component={protectedPage(Logout)} />
          <Route path="/register" component={loggedOut(Register)} />
          <Route path="/dashboard" component={protectedPage(Dashboard)} />
          <Route path="/history" component={protectedPage(Index)} />
          <Route path="/recent" component={protectedPage(Table)} />
          <Route path="/graph" component={protectedPage(Index)} />
          <Route component={Page404} />
        </Switch>
      </div>
    </div>
  )
}

export default Layout
