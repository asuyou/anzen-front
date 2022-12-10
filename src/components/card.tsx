const Card = (props: React.PropsWithChildren<any>) => {
  let {children, className, ...other } = props;
  return (
    <div className={`p-5 bg-slate-700 rounded drop-shadow ${className}`} {...other}>
      {children}
    </div>
  )
}

export default Card
