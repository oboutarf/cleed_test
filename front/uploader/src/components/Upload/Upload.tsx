 // eslint-disable-next-line
import React, {ChangeEvent, useState } from 'react'
import axios from 'axios'

const   Upload = () =>  {

    const [upload, setUpload] = useState<File>()


    function    changeInputState(e: React.ChangeEvent<HTMLInputElement>)  {
        if (e.target.files)
            setUpload(e.target.files[0])
    }
    
    function    sendUploadedImage() {
        if (upload) {
            const imageData = new FormData()
            imageData.append('image', upload)
            const res = axios({
                url: "http://localhost:8080/api/upload",
                method: "POST",
                data: imageData
            })
        }
    }


    return (
        <div className="upload-container">
            <input className="uploader-input" accept="image/*" type="file" onChange={changeInputState} />
            <button className="change-avatar-button" onClick={sendUploadedImage} >Submit</button>
        </div>
    )
}

export default Upload
