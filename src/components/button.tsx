const Button = (props: React.PropsWithChildren<any>): JSX.Element => {
  let { children, ...other } = props
  return (
    <button
      className="border-blue-400 border-2 px-3 py-2 rounded hover:bg-blue-500 hover:border-blue-500 active:bg-blue-600 active:border-blue-600 hover:text-slate-900 transition drop-shadow"
      {...other}
    >{children}</button>
  )
}

export default Button
