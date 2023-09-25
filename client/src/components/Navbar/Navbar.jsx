import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../../components/Search/Search.jsx";
import style from './navbar.module.css';

export const Navbar = ({currentPage}) => {
  return (
    <div className={ style.container }>
        <Link to="/" className={ style.logo }>
          <img src="img/logo.png" alt="" />
        </Link>
        <SearchBar  currentPage={() => currentPage(1)}/>
        <ul className={style.ul}>
            <li className={style.li}><Link to="/home" className={style.link}>Pokedex</Link></li>
            &nbsp;
            <li className={style.li}><Link to="/create" className={style.link}>Create</Link></li>
            &nbsp;
            <li className={style.li}><Link to="/team" className={style.link}>Team</Link></li>
        </ul>
    </div>
  );
};