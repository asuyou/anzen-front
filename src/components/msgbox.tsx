const MsgBox = (props: React.PropsWithChildren<any>): JSX.Element => {
  let { children, color, ...other } = props

  return (
    <div className={`${color} px-3 py-2 rounded`} {...other}>
      {children}
    </div>
  )
}

export default MsgBox
