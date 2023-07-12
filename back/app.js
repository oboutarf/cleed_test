const   express = require('express')
const   multer = require('multer')
const   cors = require('cors')
const   app = express()
const   router = express.Router()
const   port = 8080

const store = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, './uploads') },
    filename: (req, file, cb) => { cb(null, file.fieldname + '-' + Date.now()) }
})
const upload = multer({ storage: store })

app.use(cors())

router.get('/', (req, res) => {
  res.send('Hello, World!')
})

router.post('/api/upload', upload.single('image'), (req, res) => {
    console.log("app-back: upload file ", req.data)
    res.status(200).json('uploaded')
})
app.use('/', router)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
