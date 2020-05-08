import React, { Fragment, useState } from 'react';
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';
import Dropdown from 'react-dropdown';
import { Table } from '@material-ui/core';
import 'react-dropdown/style.css';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { red } from '@material-ui/core/colors';
import { toDate } from 'date-fns';

function countryToFlag(isoCode) {
    return typeof String.fromCodePoint !== 'undefined'
      ? isoCode
          .toUpperCase()
          .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
      : isoCode;
  }

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    table: {
        margin: theme.spacing(5),
        backgroundColor: red,
    }
}));

const _useStyles = makeStyles({
    option: {
        fontSize: 15,
        '& > span': {
            marginRight: 10,
            fontSize: 18,
            color:red,
        },
       // color:green,
    },
});

let _string = "New Sample";


const FileUpload2 = () => {
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
        // document.getElementById('place1').value = '';
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

    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const countries = [
        { code: 'SEAB', label: 'Stockholm', phone: '376' },
        { code: 'SEAC', label: 'Västerbotten' , phone: '306'},
        { code: 'SEM', label: 'Skåne', phone: '376' },
        { code: 'SEK', label: 'Blekinge' , phone: '306'},
        { code: 'SEO', label: 'Västra Götaland' , phone: '306'},
    ]
    const classes = useStyles();
    const _classes = _useStyles();



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

                    <br />




                </div>
                <table className={classes.root}>
                    <tr>
                        <td>
                            <TextField id="standard-basic" label="Place" id="place" />
                        </td>
                        <td>
                            <Autocomplete
                                id="country-select-demo"
                                style={{ width: 200 }}
                                options={countries}
                                _classes={{
                                    option: _classes.option,
                                }}
                                autoHighlight
                                getOptionLabel={(option) => option.label}
                                renderOption={(option) => (
                                    <React.Fragment> 
                                        <span>{countryToFlag(option.code)}</span>
                                        {option.label} ({option.code}) +{option.phone}
                                    </React.Fragment>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="`"
                                        margin="none"
                                        // variant="outlined"
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                        }}
                                    />
                                )}
                            />
                            {/* <TextField id="standard-basic" label="Region" id="place1" /> */}
                        </td>
                        <td>
                            <TextField id="standard-basic" label="Freetext" id="place2" />
                        </td>
                        <td>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker
                                        margin="none"
                                        id="date-picker-dialog"
                                        label="Date picker dialog"
                                        format="MM/dd/yyyy"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />

                                </Grid>
                            </MuiPickersUtilsProvider>
                        </td>
                    </tr>
                </table>
                <br /> <br /> <br /> <br />

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
export default FileUpload2