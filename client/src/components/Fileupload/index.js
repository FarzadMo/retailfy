
import React from "react";


const FileUpload = (props) => {


    return (

        <>
            <form onSubmit={props.onSubmit}>
                <div className='custom-file '>

                    <input type="file" className='custom-file-input' id='customFile' onChange={props.onChange} />
                    <label className='custom-file-label' htmlFor='customFile'>
                        {props.filename}
                    </label>
                </div>
                <input type="submit" value="Upload" className="btn btn-primary btn-block mt-4" />
            </form>
            {props.uploadedFile ? (<div className="row mt-5">
                <div className="col-md-6 m-auto">
                    <h3 className="text-center">{props.uploadedFile.fileName}</h3>
                    <img alt="Adimage" style={{ width: '100%' }} src={props.uploadedFile.filePath} />
                </div>
            </div>) : null}

        </>


    )




}

export default FileUpload;