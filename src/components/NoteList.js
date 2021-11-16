import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

import ReactTimeAgo from 'react-time-ago'

const NoteList = () => {

    const [notas, setNotas] = useState([])

    useEffect(()=>{
        const peticionGet = async ()=>{
            const res = await axios.get('http://localhost:4000/api/notes');
            setNotas(res.data);
        } 
        peticionGet();
    },[notas])

    const deleteNote = async(id) =>{
        await axios.delete('http://localhost:4000/api/notes/' + id)
    }
      
    return (
        <div className="row">
            {
                notas.map(nota => (
                    <div className="col-md-4 p-2" key={nota._id}>
                        <div className="card">

                            <div className="card-header">
                                <h4>{nota.title}</h4>
                            </div>

                            <div className="card-body">
                                <p>{nota.content}</p>
                                <h6>{nota.author}</h6>
                                <p><ReactTimeAgo date={nota.date} locale="en-US"/></p>
                            </div>

                            <div className="card-footer">
                                <button className="btn btn-danger" onClick={()=>deleteNote(nota._id)}> 
                                    Delete
                                </button>

                                <Link className="btn btn-primary m-2" to={'/edit/' + nota._id}> 
                                    Update
                                </Link>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default NoteList

