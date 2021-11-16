import React, { useEffect, useState } from 'react'

import axios from 'axios'



const CreateUser = () => {

    const valorInicial = {
        username: ''
    }

    const [users, setUsers] = useState([])
    const [usernames, setUsername] = useState(valorInicial)

    useEffect(()=>{
        const peticionGet = async ()=>{
            const res = await axios.get('http://localhost:4000/api/users');
            setUsers(res.data);
        } 
        peticionGet();
    },[users])
    

    const onchangeUsername = (e)=>{
       const {name, value} = e.target;
       setUsername({[name]: value});
        
    }
    
    const onsubmitUser = async(e)=>{
        e.preventDefault();
        const res = await axios.post('http://localhost:4000/api/users',{
            username: usernames.username
        })
        console.log(res);
        setUsername({...valorInicial})
    }

    const deleteUSer = async(id)=>{
        await axios.delete('http://localhost:4000/api/users/' + id)
    }

    return (
        <div className="row">
            {/* <h1>crear usuarios</h1>
            <button onClick={peticionGet}> 
                click
            </button> */}

            <div className="col-md-4">
                <div className="card card-body">
                    <h3 className="mb-3">Create new user</h3>
                    <form className="" onSubmit={onsubmitUser} > 
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="introducir el nombre de usuario" onChange={onchangeUsername} 
                                name="username" required value={usernames.username}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary mt-3 form-control" > 
                            Guardar usuario
                        </button>
                    </form>
                </div>
            </div>

            <div className="col-md-8">
                <ul className="list-group">
                    {
                        users.map(user=> <li className="list-group-item list-group-item-action" key={user._id} onDoubleClick={()=> deleteUSer(user._id)} >
                            {user.username}
                        </li> )
                    }
                </ul>
            </div>

        </div>
    )
}

export default CreateUser
