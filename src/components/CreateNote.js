import React, { useEffect, useState } from 'react'
import axios from 'axios'


import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { useParams } from 'react-router';

const CreateNote = () => {

    const valoresIniciales={
        title:'',
        content:'',
        userSelected:''
    }
    let {id} = useParams();

    const [usuarios, setUsuarios] = useState([])
    const [startDate, setStartDate] = useState(new Date());
    const [notas, setNotas] = useState(valoresIniciales)

    const [item, setItem] = useState(id)
    
    // ESTA SECCION ES PARA HACER PETICIONES DE TODO NUESTRA BASE DE DATOS
    useEffect(()=>{
        const peticionGet = async ()=>{
            
            const res = await axios.get('http://localhost:4000/api/users');
            setUsuarios(res.data);
            
        } 
        peticionGet();
    },[usuarios])

    // ESTE USEEFECT ES PARA LA ACTUALIZACION
    useEffect(()=>{
        if(item!==''){
            getOne(item)
        }
    },[item])

    // FUNCION PARA ALMACENAR LOS DATOS EN POST
    const onSubmit = async(e)=>{
        e.preventDefault();
        saveNotas(notas);
        setNotas({...valoresIniciales})
        
    }

    const saveNotas = async(valor)=>{
        // if(item === ''){
            const newNote = {
                title: notas.title,
                content: notas.content,
                date: startDate,
                author: notas.userSelected
            };
            await axios.post('http://localhost:4000/api/notes', newNote)
        // }
        // else{
        //     const newNote = {
        //         title: notas.title,
        //         content: notas.content,
        //         date: startDate,
        //         author: notas.userSelected
        //     };
        //     await axios.put('http://localhost:4000/api/notes/' + item, newNote)  
        // }
        // setItem('')
    }

    // ESCUCHAR LOS INPUTEXT
    const onHandledChange = (e)=>{
        const {name, value} = e.target;
        setNotas({...notas, [name]:value})
    }
    // HACER UNA CONSULTA DE UN DOCUMENTO
    const getOne = async(pId)=> {
        const res = await axios.get('http://localhost:4000/api/notes/' + pId)
        setNotas({
            title: res.data.title,
            content: res.data.content,
            userSelected: res.data.author
        });
        setStartDate(new Date(res.data.date))
    }


    // ESTA FUNCION  ES PARA ACTUALIZAR
    const updateNota = async (e) => {
      e.preventDefault();
      const newNote = {
        title: notas.title,
        content: notas.content,
        date: startDate,
        author: notas.userSelected,
      };
      await axios.put("http://localhost:4000/api/notes/" + item, newNote);
      setNotas({...valoresIniciales})
      setItem('')
    };

    return (
      <div className="col-md-6 offset-md-3">
        <div className="card card-body">
          <div className="card card-body">
            <h4>Crear una nota</h4>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <select
                  name="userSelected"
                  className="form-control"
                  onChange={onHandledChange}
                  value={notas.userSelected}
                >
                  {usuarios.map((user) => (
                    <option key={user._id} value={user.username}>
                      {user.username}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group mt-2">
                <input
                  type="text"
                  name="title"
                  placeholder="ingrese el titulo de la nota"
                  className="form-control"
                  onChange={onHandledChange}
                  value={notas.title}
                  required
                />
              </div>

              <div className="form-group mt-2">
                <textarea
                  name="content"
                  className="form-control"
                  rows="4"
                  placeholder="Contenido"
                  onChange={onHandledChange}
                  value={notas.content}
                  required
                ></textarea>
              </div>

              <div className="form-group mt-2">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="form-control"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary form-control mt-4"
              >
                guardar nota
              </button>
            </form>

            <form onSubmit={updateNota}>
              <button
                type="submit"
                className="btn btn-success form-control mt-4"
              >
                Actualizar nota
              </button>
            </form>
          </div>
        </div>
      </div>
    );
}

export default CreateNote
