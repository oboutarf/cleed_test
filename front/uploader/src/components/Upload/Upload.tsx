 // eslint-disable-next-line
import React, {ChangeEvent, useState } from 'react'
import axios from 'axios'
import './Upload.scss'

const   Upload = () =>  {

    const [upload, setUpload] = useState<File | null>(null)
    const [successUpload, setSuccessUpload] = useState<string | null>(null)
    const [uploadSelectedFileName, setUploadSelectedFileName] = useState<string | null>(null)

    function    waitRotateBeforeSuccess()   {
        setSuccessUpload('success')
    }
    function    changeInputState(e: React.ChangeEvent<HTMLInputElement>)  {
        if (e.target.files) {
            setUpload(e.target.files[0])
            setUploadSelectedFileName(e.target.files[0].name)
        }
    }

    function    clearSelectedFile() {
        setUploadSelectedFileName(null)
        setSuccessUpload(null)
        setUpload(null)
    }

    let angleRotate: number = 0
    async function    rotateUploadWaiting(e: React.MouseEvent<HTMLImageElement>)   {
        if (upload) {
            setUploadSelectedFileName(upload.name)
            const imageData = new FormData()
            imageData.append('image', upload)
            await axios({
                url: "http://localhost:8080/api/upload",
                method: "POST",
                data: imageData
            })
            const imageElement = e.target as HTMLImageElement
            imageElement.style.transition = 'transform 0.5s ease'
            angleRotate += 360
            const rotate = `rotate(${angleRotate}deg)`
            imageElement.style.transform = rotate
            const interval = setInterval(waitRotateBeforeSuccess, 1000)
            setTimeout(() => clearInterval(interval), 1000)
        }
    }

    return (
        <div className="upload-container">
            <div className="container-main-content">
                <div className="user-interact-title">
                    <h1>Your Web Uploader</h1>
                    <p>powered by oscoding</p>
                </div>
                <div className="user-interact-contain">
                    { !uploadSelectedFileName ?
                        <div>
                            <input className="uploader-input" accept="image/*" type="file" onChange={changeInputState} id="file-input" />
                            <label className="container-upload-button" htmlFor="file-input">
                                <h2>Pick an image</h2>
                                <img className="upload-image-img" src="https://www.nicepng.com/png/full/108-1084516_upload-to-cloud-blue-button-upload-cloud-icon.png" alt="upload-img" />
                            </label>
                        </div>
                    :
                        <div className="file-selected-contain">
                            <h3>{ uploadSelectedFileName }</h3>
                            <img onClick={clearSelectedFile} className="choose-other-icon" src="https://cdn-icons-png.flaticon.com/512/2546/2546705.png" alt="img" />
                        </div>
                    }
                    { !successUpload ?
                        <div className="change-avatar-button">
                            <h2>Upload</h2>
                            <img onClick={rotateUploadWaiting} className="send-button-img" src="https://icon-library.com/images/newsletter-icon/newsletter-icon-10.jpg" alt="img" />
                        </div>
                    :
                        <div className="success-icon-container">
                            <img src="https://cdn0.iconfinder.com/data/icons/round-ui-icons/512/tick_blue.png" className="sucess-icon-upload" alt="img" />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Upload
