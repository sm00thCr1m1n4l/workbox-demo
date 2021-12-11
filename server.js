
const express = require('express')
const app = express()
const port = 3000


app.use(express.static('./dist',{
  etag:true,
  lastModified:true,
  maxAge:1000*60*60*24*30
}));
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})