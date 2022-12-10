import { useLocation, Link} from "wouter";

const Page404 = () => {
  const [location, _] = useLocation();
  
  return (
    <>
      <h1 className="text-2xl font-semibold">Error 404</h1>
      <h2 className="text-lg text-slate-300">How did you get here?</h2>
      <hr className="p-3" />
      <p>You tried to vist <span className="bg-slate-500 p-2 py-0.5 rounded-md">{location}</span> but it doesn't look like thats a page.</p>
      <p>Go <Link href="/" className="underline text-violet-300 hover:text-violet-200 transition">Home?</Link></p>
    </>
  )
}

export default Page404

