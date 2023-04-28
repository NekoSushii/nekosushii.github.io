import React, { useEffect, useState } from 'react';
import {db} from '../firebase'
import {collection, addDoc, getDocs, getDoc, updateDoc,deleteDoc ,Timestamp} from 'firebase/firestore'
import {Link} from 'react-router-dom';

import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Mainpage(){

    const [wenzhang,setwenchang] = useState([])
    const [optionsVal,setoptionsVal] = useState([])
    const [checkstate, setcheckstate] = useState(Boolean)
    let temp = []

    useEffect(()=>{
        async function getstuff(){
            await getDocs(collection(db,'wenzhang'))
            .then(response=>{
                setwenchang(response.docs)
                let temp = response.docs.map((val,key)=>({id: val.id}))
                setoptionsVal(temp)
            })
        }
        getstuff()
        const toastId = '1'
        if(!toast.isActive(toastId)){
            toast.promise(getstuff(),{
                pending: 'Pending',
                error: 'Error',
            })
        }
        
        
        setcheckstate(true)
      },[])

    function init() {
        for(let i=0;i<optionsVal.length;i++){
            temp.push(optionsVal[i].id)
        }
    }

    function initialstate(){
        return(
            <div>
            {optionsVal.map((val,key)=>(
                <div>
                    <Link to={'/view/'+val.id} className='navlink'>
                    <header className='bodyfont'>
                        {val.id}
                    </header>
                    </Link>
                </div>
            ))}
            </div>
        )
    }

    const handlesubmit =async(e)=>{
        let i = e.target.id
        let tempval
        let temparray =[]
        console.log(i)
        if(!i.includes('option')){
            console.log(true)
            temparray = wenzhang.map((val,key)=>({id: val.id}))
            setoptionsVal(temparray)
        }
        else{
            console.log(false)
            tempval = e.target.id.slice(12)
                temparray.push({id: wenzhang[tempval].id})
                setoptionsVal(temparray)
        }
    }
    
    return(
        <div>
            <Autocomplete
                sx={{width:300}}
                options={temp}
                autoComplete
                filterSelectedOptions
                autoHighlight
                renderInput={(params) => (
                    <TextField {...params} label="Search" fullWidth />
                  )}
                onClose={handlesubmit}
            />
            <div>
            {init()}
            </div>
                {initialstate()}
                <ToastContainer 
                position='top-right'
                autoClose={1000}
                />
        </div>
    )
}

export default Mainpage;