import React, { useEffect, useState } from 'react';
import {db} from '../firebase'
import {collection,doc,  addDoc, getDocs, getDoc, updateDoc,deleteDoc ,Timestamp} from 'firebase/firestore'
import { useParams } from 'react-router-dom';
import binicon from '../bin.png'
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Viewpage(){

    let history = useNavigate();
    let {titlename} = useParams()
    const [body,setbody] = useState({})

    useEffect(()=>{
        async function initialise(){
            await getDocs(collection(db,'wenzhang'))
            .then(response=>{
                for(let i=0;i<response.docs.length;i++){
                    if(response.docs[i].id == titlename){
                        setbody(response.docs[i].data())
                    }
                }
            })
        }
        initialise()
      },[])

    const handlebin =async()=>{
        let check = window.confirm('Do you want to delete?')
        if(check === true){
            await deleteDoc(doc(db,'wenzhang',titlename)).then(()=>{
                history("/");
            })
        }
    }

    return(
        <div>
            <button style={{outline:'none', float:'right',backgroundColor:'red'}} onClick={handlebin}><img className='binicon' src={binicon}/></button>
            <header className='header'>
                {titlename}
            </header>
            <p className='bodyfont'>
                {body.content}
            </p>
            <ToastContainer/>
        </div>
    )
}

export default Viewpage