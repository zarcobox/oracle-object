function oracleObject(result: any, fn?: Function | object, options?: any): Array<object> {
  const { metaData, rows: rowsData } = result
  const rows: any = []
  rowsData.map((rowData: any) => {
    let row = {}
    rowData.map((item: any, index: number) => {
      const column = metaData[index].name
      if(item != null || options?.allowNull) {
        if (typeof fn === 'object' && fn !== null) {
          Object.assign(row, { [(fn as any)[column] ? (fn as any)[column] : 
            options?.defaultFn ? options.defaultFn(column) : column
          ]: item })
        } else Object.assign(row, { [fn ? fn(column) : column]: item })
      }
    })
    rows.push(row)
  })
  return rows
}

export default oracleObject
