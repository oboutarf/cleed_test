const   express = require('express')
const   multer = require('multer')
const   cors = require('cors')
const   path = require('path')
const   fs = require('fs')

const   app = express()
app.use(cors())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const   router = express.Router()
const   port = 8080

const store = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, './uploads') },
    filename: (req, file, cb) => { cb(null, file.originalname) }
})
const upload = multer({ storage: store })

function uploadDirectory(req, res, next) {
    if (!fs.existsSync('./uploads')) { fs.mkdirSync('./uploads') }
    next()
}

router.get('/', (req, res) => {
    try {
        const images = path.join(__dirname, 'uploads')
        fs.readdir(images, (err, files) => { res.render('gallery', { images: files }) })
    }
    catch (err) { console.log("app-back: error: ", err) }
})

router.get('/api/search', (req, res) => {
    const searched = req.query.query
    const images = path.join(__dirname, 'uploads')
    fs.readdir(images, (err, files) => {
        const searchedOutput = files.filter((fileName) => { return fileName.toLowerCase().includes(searched.toLowerCase()) })
        res.json({ images: searchedOutput })
    })
})

router.post('/api/upload', uploadDirectory, upload.single('image'), (req, res) => {
    try {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'app-back: success: file uploaded successfully' }))
    }
    catch (err) {
        res.writeHead(404, { 'Content-type': 'application/json' })
        res.end(JSON.stringify({ message: 'app-back: error: upload failed' }))
    }
})


app.use('/', router)
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
