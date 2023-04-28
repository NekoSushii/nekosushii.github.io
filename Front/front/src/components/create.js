import React, { useEffect, useState } from 'react';
import {db} from '../firebase'
import {collection, addDoc, getDocs, getDoc, updateDoc,deleteDoc ,Timestamp} from 'firebase/firestore'
import {Link} from 'react-router-dom';

function Create(){

    return(
        <div>
            Create
        </div>
    )

}

export default Create