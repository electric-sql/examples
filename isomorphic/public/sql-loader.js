console.log("Adding sql-wasm.js script tag")

const s = document.createElement('script')
s.setAttribute('src', '/sql-wasm.js')
document.body.appendChild(s)

window.initSql = async () => {
  console.log("initSql function called")

  return await initSqlJs({
    locateFile: file => `/${file}`
  })
}

console.log('sql-loader.js')
console.log('window.initSql', window.initSql)
