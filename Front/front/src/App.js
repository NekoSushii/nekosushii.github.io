import './App.css';
import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Mainpage from './components/mainpage'
import Create from './components/create'
import Viewpage from './components/viewpage'
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { doc, setDoc } from 'firebase/firestore';
import {db} from './firebase'

function App() {

  const [openmodal, setopenmodal] = React.useState(false)
  const [content, setcontent] = useState('')
  const [title, settitle] = useState('')
  
  useEffect(()=>{
    /* async function fetchstuff(){
      await axios.get('http://localhost:4000/homepage')
      .then((response)=>{
        console.log(response.data)
      }) 
    }
    fetchstuff() */
  },[])

  const handlecreate =()=>{
    setopenmodal(true)
  }

  const handleclose =()=>{
    setopenmodal(false)
  }

  const handlesubmit =async ()=>{
    setopenmodal(false)
    let temp = {content: content}
    await setDoc(doc(db,'wenzhang', title),{
      content: content
    })
    .then(()=>{
      toast.success('Composition Created: ' + title,{
        position: 'top-right',
        autoClose: 1000
      })
      window.location.reload()
    })
    
  }

  return (
    <div>
    <Router>
      <div className='navbar'>
        <li className='navitem_float_left'>
          <Link to={'/'} className='navlink'>Home</Link>
        </li>
        <li className='navitem_float_left'>
          <a onClick={handlecreate} className='navlink'>Create</a>
        </li>
      </div>
      <div className='bg'>
        <div className='maincon'>
          <Routes>
            <Route exact path='/' element={<Mainpage/>}/>
            <Route path='/view/:titlename' element={<Viewpage/>}/>
          </Routes>
        </div>
      </div>
    
    <Dialog open={openmodal} onClose={handleclose}>
      <DialogTitle><strong>Create New Composition</strong></DialogTitle>
      <DialogContent className='portalmodal'>
        <TextField label='Enter Title' autoFocus margin="dense" value={title} onChange={(e) => settitle(e.target.value)} fullWidth variant="standard"></TextField>
        <TextField multiline={true} autoFocus margin="dense" value={content} onChange={(e) => setcontent(e.target.value)} label="Enter Content" fullWidth variant="standard"/>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleclose}>Cancel</Button>
        <Button onClick={handlesubmit}>Create</Button>
      </DialogActions>
    </Dialog>
    </Router>
    <ToastContainer/>
    </div>
  );
}

export default App;