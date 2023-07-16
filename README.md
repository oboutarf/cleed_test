# 🔮&nbsp;&nbsp;Cleed.ai #
## ✈️&nbsp;&nbsp;Deploy ##
> Makefile
```app:
$(MAKE) -j2 back front
front:
	cd ~/cleed_test/back && npm i && npm run start
back:
	cd ~/cleed_test/front/uploader && npm i && npm run start
```
Ensure to clone the repository at the root of your {**$HOME**} directory.</br>
To deploy the app's cd into the 'cleed_test' directory you just downloaded.

```cd ~/cleed_test```

Then launch the command 'make app' to install the dependencies and run the project 🚀

```make app```
</br></br>
> Ports </br>
The front is accessible at **http://localhost:3000**</br>
The back is accessible at **http://localhost:8080**

## 🛠️&nbsp;&nbsp;Dependencies ##
> front </br>

In order to make HTTP requests to the back, containing the images the front uses the **Axios** library.

> back </br>

The back uses **Multer** middleware to handle the incoming uploading of images.</br>
```const multer = require('multer')
const store = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, './uploads') },
    filename: (req, file, cb) => { cb(null, file.originalname) }
})
const upload = multer({ storage: store })
```

When an image is uploaded by the server, it decompresses it using **Sharp** library to gain space.</br>
```await sharp(inpt).toFile(outp).catch((err) => console.log("app-back: error: ", err))```

To enable routing, listen to ports and receive requests the app uses the **Express** Node JS framework.</br>
```const   app = express()
const   router = express.Router()
app.use('/', router)
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
```

In order to manage the upload directory during the upload process, the back uses the built-in module **fs**

## 👀&nbsp;&nbsp;View ##

At the back's URL, at the root ```http://localhost:8080/``` you can see all uploaded images, and a searchbar is enabled so </br>
that you can see if your file was uploaded successfully or search for an image in particular 🔎 </br>
This render is possible tanks to the back using a Node JS Embedded Template: **ejs**.

## 🚧&nbsp;&nbsp;Structure ##
```cleed_test
├── Makefile
├── README.md
├── back
│   ├── app.js
│   ├── package-lock.json
│   ├── package.json
│   └── views
│       └── gallery.ejs
└── front
    └── uploader
        ├── package-lock.json
        ├── package.json
        ├── public
        │   ├── favicon.ico
        │   ├── index.html
        │   ├── manifest.json
        │   └── robots.txt
        ├── src
        │   ├── App.scss
        │   ├── App.tsx
        │   ├── assets
        │   │   └── background-app.gif
        │   ├── components
        │   │   └── Upload
        │   │       ├── Upload.scss
        │   │       └── Upload.tsx
        │   ├── index.css
        │   ├── index.tsx
        │   └── reportWebVitals.js
        └── tsconfig.json

10 directories, 21 files
```
