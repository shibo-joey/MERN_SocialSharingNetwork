import React, {useRef,useState,useEffect} from 'react';
import './imageUpload.css'
import Button from './Button';
const ImageUpload = (props) => {
    const [file,setFile] = useState()
    const [previewUrl,setPreviewUrl] = useState()
    const [isValid, setIsValid] = useState(false)

    const filePickerRef = useRef()
    const pickImageHandler = () => {
        filePickerRef.current.click()
    }

    useEffect(() => {
        if(!file){
            return;
        }

        const fileReader = new FileReader()
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result)
        }
        fileReader.readAsDataURL(file)

    }, [file])

    const pickedHandler = event => {
        let pickedFile
        let fileIsValid = isValid
        if(event.target.files || event.target.files.length === 1){
            const pickedFile = event.target.files[0]
            setFile(pickedFile)
            setIsValid(true)
            fileIsValid = true
        }else{
            setIsValid(false)
            fileIsValid = false
        }
        props.onInput(props.id, pickedFile, fileIsValid)
    }

        return ( 
            <div className="form-control"> 
                <input type="file"
                    id={props.id}
                    ref={filePickerRef}
                    style={{display:'none'}}
                    accept = ".jpg, .png, .jpeg"
                    onChange={pickedHandler}
                        />
                <div className={`image-upload ${props.center && 'center'}`}>
                    <div className="image-upload__preview">
                        {previewUrl && <img src={previewUrl} alt="preview"/>}
                        {!previewUrl && <p> Please picke an image</p>}
                    </div>

                    <Button type='button' onClick={pickImageHandler} > pick image</Button>
                </div>
        {!isValid && <p>{props.errorText}</p>}
            </div>
        );
    }
 
export default ImageUpload;