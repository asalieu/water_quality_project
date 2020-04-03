import React, { Fragment, useState } from 'react';
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';
let _string  ="New Sample";

 
const FileUpload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const myfile='from api test';

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };



  const onSubmit = async e => {
    e.preventDefault();
    fetchMethod();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/api/postFIle/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );

          // Clear percentage
          setTimeout(() => setUploadPercentage(0), 10000);
        }
      });

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

      setMessage('File Uploaded');
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  const fetchMethod =()=>{
    fetch('/api/upload/', {
        method: 'POST',            
        body: JSON.stringify( 
            {"name": "Lamin"}
        ),
        headers: { 
            "Content-Type": "application/json"
           // 'Accept': 'application/json, text/plain, */*',
        }
        })
        .then(response => { 
            console.log(
               
            )
        })
        .catch(error => console.error('Error:', error))
        console.log('error occured')
  }
  
  return (
      <div className="file_upload">
      {message ? <Message msg={message} /> : null}
      
      <form onSubmit={onSubmit}>
         {/* known / clean  water sample file here  */}
        <div className='custom-file mb-4'>
          <input
            type='file' 
            multiple={true}
            className='custom-file-input'
            id='customFile'
            onChange={onChange}   
            name="multi-files" multiple id="input-multi-files"          
          /> 
          <label className='custom-file-label' htmlFor='customFile'>
            {filename}
          </label> 
        </div> 

        <Progress percentage={uploadPercentage} />
        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4'
        />
      </form>
      {uploadedFile ? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>{uploadedFile.fileName}</h3>
            <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default FileUpload;