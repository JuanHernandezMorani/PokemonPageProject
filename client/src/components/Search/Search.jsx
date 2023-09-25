import { useState } from "react";
import { useDispatch } from "react-redux";
import style from "./search.module.css";
import { getName } from '../../actions';

export default function SearchBar({currentPage}){
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const Swal = require('sweetalert2');
  const handleChange = (e) => {
    setName(e.target.value);
  }

  const handleSubmit = (e) => {
    if(name.length === 0){return Swal.fire({icon:'error',title:'Error, something went wrong!',text:'There is no pokemon name to search'})}
   e.preventDefault();
    dispatch(getName(name))
    setName('');
    setTimeout(() => {currentPage(1)},100);
  }

  return (
    <div className={style.container}>
        <input type='text' placeholder='Search your Pokemon...' onChange={(e) => handleChange(e)} value={name} className={style.inputText}/>
        &nbsp;
        <button type= "submit" onClick={(e) => handleSubmit(e)} className={style.button}>Search</button>
    </div>
)
};