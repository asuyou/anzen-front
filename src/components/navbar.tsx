import { Routes } from "@/data/routes"
import { useAtom } from 'jotai'
import { userAtom } from "@/state/atoms"
import { Link } from "wouter"

type prop = React.HTMLAttributes<HTMLDivElement>

const Navbar: React.FC<prop> = props => {
  const [ user, _] = useAtom(userAtom)

  const NavLink = ({name, href}: {name: string, href: string}) => (
    <Link href={href}>
      <a className="text-slate-300 hover:text-white transition underline underline-offset-4 decoration-indigo-400">{name}</a>
    </Link>
  )

  return (
    <nav className="bg-slate-700">
      <div {...props}>
      {Routes.map(({name, href, protect, loggedOut }) => {
        if ( loggedOut && !user.token ) {
          return (
            <NavLink name={name} href={href} key={name} />
          )
        } else if ( (user.token || !protect) && !loggedOut ) {
          return (
            <NavLink name={name} href={href} key={name} />
          )
        }
      }
      )}
      </div>
    </nav>
  )
}

export default Navbar
