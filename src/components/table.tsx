interface Props<T> {
  data: T[]
  headers: string[]
  accessor: (data: T) => string[]
  id: (data: T) => string,
  cellClass?: (data: T) => string,
  rowClass?: (data: T) => string,
}

const Table = <T extends unknown>({ data, headers, accessor, id, cellClass, rowClass }: Props<T>) => {

  return (
    <table className="table table-auto border-collapse border-2 border-slate-600 rounded">
      <thead>
        <tr>
        {headers.map(heading => (
          <th key={heading} className=" bg-slate-600 font-semibold p-2 uppercase text-slate-100">
            { heading }
          </th>
        ))}
        </tr>
      </thead>
      <tbody>
        { data.map(row => (
          <tr key={id(row)} className={rowClass && rowClass(row)}>
            {accessor(row).map(value => (
              <td key={value} className={cellClass && cellClass(row)}>
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
