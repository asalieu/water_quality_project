import React, { Fragment, useState } from 'react';
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';
import Dropdown from 'react-dropdown';
 

let _string = "New Sample";


const FileUpload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [place, setPlacename] = useState('');

  const myfile = 'from api test';

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };



  const onSubmit = async e => {
    e.preventDefault();
    fetchMethod();
    const formData = new FormData();
    formData.append('file', file);
    document.getElementById('place').value = '';
    document.getElementById('place2').value = '';
    //setPlacename(e.target.value);

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
      if (err) {
        setMessage('There was a problem with the server ' + err.message);
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  const fetchMethod = () => {
    fetch('/api/upload/', {
      method: 'POST',
      body: JSON.stringify(
        { "name": "Lamin" }
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
  const options = ['Skane', 'Stockholm', 'Blekinge'];
  const defaultOption = options[0];
    

  return ( 
    
    <div className="file_upload">
      <div className="new">
      
      </div>

      {message ? <Message msg={message} /> : null}
      
      <form onSubmit={onSubmit}>
        {/* known / clean  water sample file here  */}
        
        <div className='custom-file mb-5' >
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
           <label className="col-md-2 m-auto">Place: </label>
          <input type="text" className="col-md-4 m-auto" id="place"/>  
          <label className="col-md-2 m-auto">Date:</label>
          <input type="date" className="col-md-4 m-auto" />
          <label className="col-md-2 m-auto">Rec No:</label>
          <input type="text" className="col-md-4 m-auto" id="place2" />
        </div> 
        <br /> <br /> <br /> <br />

        <label className="col-md-2 m-auto">Lan: </label>
          <Dropdown class="dropdown" options={options} value={defaultOption} placeholder="Select an option" className="col-md-4 m-auto" /> 
        
 
        <Progress percentage={uploadPercentage} />
        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-5'
        />
      </form>

      {uploadedFile ? (
        <div className='row mt'>
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