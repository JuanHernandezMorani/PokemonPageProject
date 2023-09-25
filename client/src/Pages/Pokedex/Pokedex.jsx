import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getPokemons, getTypes, getAbilities, getMoves, filterPokemonByAbility, filterPokemonByMove, filterPokemonByType, filterPokemonByOfficial, filterPokemonByName, sortPokemonByAttack,sortPokemonByWeight, sortPokemonByDefense, sortPokemonByHeight, sortPokemonByHp, sortPokemonBySpAttack, sortPokemonBySpDefense, sortPokemonBySpeed} from '../../actions';
import { Link } from 'react-router-dom';
import { Card } from '../../components/Cards/Card.jsx';
import { Navbar } from "../../components/Navbar/Navbar.jsx";
import style from './pokedex.module.css'
import './darkmode.css'

export const Pokedex = () => {
    const dispatch = useDispatch();
    const allPokemons = useSelector(state => state.Pokemons);
    const allTypes = useSelector(state => state.Types);
    const allMoves = useSelector(state => state.Moves);
    const Swal = require('sweetalert2');
    const allAbilities = useSelector(state => state.Abilities);
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage] = useState(8);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const indexLastPokemon = currentPage * pokemonsPerPage;
    const indexFirstPokemon = indexLastPokemon - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(indexFirstPokemon, indexLastPokemon);
    const [order, setOrder] = useState('');
    const [charge, setCharge] = useState(false);

console.log(order);


    useEffect(() => {
        setCharge(true);
        dispatch(getTypes());
        dispatch(getAbilities());
        dispatch(getMoves());
        dispatch(getPokemons());
        setTimeout(() => {
            setCharge(false);
        }, 4000);
    }, [dispatch]);

    function handleTypes(e){
        e.preventDefault();
        dispatch(filterPokemonByType(e.target.value));
        setCurrentPage(1);
    };

    function handleAbilities(e){
        e.preventDefault();
        dispatch(filterPokemonByAbility(e.target.value));
        setCurrentPage(1);
    };

    function handleMoves(e){
        e.preventDefault();
        dispatch(filterPokemonByMove(e.target.value));
        setCurrentPage(1);
    };

    function handleCreated(e){
        e.preventDefault();
        dispatch(filterPokemonByOfficial(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value);
    };

    function handleOrder(e){
try{
    if(e.target.value === 'desc' || e.target.value === 'asc'){
            e.preventDefault();
            dispatch(filterPokemonByName(e.target.value));
            setCurrentPage(1);
            setOrder(e.target.value);
        }
        if(e.target.value === 'attackMin' || e.target.value === 'attackMax'){
            e.preventDefault();
            dispatch(sortPokemonByAttack(e.target.value));
            setCurrentPage(1);
            setOrder(e.target.value);
        }
        if(e.target.value === 'SpAttackMin' || e.target.value === 'SpAttackMax'){
            e.preventDefault();
            dispatch(sortPokemonBySpAttack(e.target.value));
            setCurrentPage(1);
            setOrder(e.target.value);
        }
        if(e.target.value === 'defenseMin' || e.target.value === 'defenseMax'){
            e.preventDefault();
            dispatch(sortPokemonByDefense(e.target.value));
            setCurrentPage(1);
            setOrder(e.target.value);
        }
        if(e.target.value === 'SpDefenseMin' || e.target.value === 'SpDefenseMax'){
            e.preventDefault();
            dispatch(sortPokemonBySpDefense(e.target.value));
            setCurrentPage(1);
            setOrder(e.target.value);
        }
        if(e.target.value === 'weightMin' || e.target.value === 'weightMax'){
            e.preventDefault();
            dispatch(sortPokemonByWeight(e.target.value));
            setCurrentPage(1);
            setOrder(e.target.value);
        }
        if(e.target.value === 'heightMin' || e.target.value === 'heightMax'){
            e.preventDefault();
            dispatch(sortPokemonByHeight(e.target.value));
            setCurrentPage(1);
            setOrder(e.target.value);
        }
        if(e.target.value === 'hpMin' || e.target.value === 'hpMax'){
            e.preventDefault();
            dispatch(sortPokemonByHp(e.target.value));
            setCurrentPage(1);
            setOrder(e.target.value);
        }
        if(e.target.value === 'speedMin' || e.target.value === 'speedMax'){
            e.preventDefault();
            dispatch(sortPokemonBySpeed(e.target.value));
            setCurrentPage(1);
            setOrder(e.target.value);
        }}
catch(error){console.log(error)}
}

    
    const maxPage = Math.ceil(allPokemons.length / pokemonsPerPage);
    const pages = [];
    for(let i = 1; i <= Math.ceil(allPokemons.length/pokemonsPerPage);i++){
        pages.push(i);
    }

    const handleReset = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Do you want to restart?',
            text: "It will put all in default value",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, reset!',
            cancelButtonText: 'No, i dont'
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(getTypes());
                dispatch(getAbilities());
                dispatch(getMoves());
                dispatch(getPokemons());
                document.getElementById('order').value = 'order';
                document.getElementById('created').value = 'CREATED';
                document.getElementById('type').value = 'All';
                document.getElementById('move').value = 'All';
                document.getElementById('ability').value = 'All';
                document.getElementById('pages').value = 0;
                Swal.fire(
                'Restarted!',
                'All in on default value now',
                'success'
                )
              setTimeout(()=>{
                setCurrentPage(1);
            }, 100);
            }
          })
    };

    return (
        <div className={style.container} id='pokedex'>
            <Navbar currentPage={() => setCurrentPage(1)}/>
            <div className={style.inner}>
                <div className={style.top}>
                <button type='submit' onClick={(e) => handleReset(e)} className={style.button}>Reset</button>
                &nbsp;
                <select id='order' defaultValue='order' onChange={e => handleOrder(e)} className={style.select}>
                    <option value='order' hidden>Order</option>
                    <option value='asc'>A - Z</option>
                    <option value='desc'>Z - A</option>
                    <option value= "weightMin">Weight &uArr;</option>
                    <option value= "weightMax">Weight &dArr;</option>
                    <option value= "heightMin">Height &uArr;</option>
                    <option value= "heightMax">Height &dArr;</option>
                    <option value= "attackMin">Attack &uArr;</option>
                    <option value= "attackMax">Attack &dArr;</option>
                    <option value= "defenseMin">Defense &uArr;</option>
                    <option value= "defenseMax">Defense &dArr;</option>
                    <option value= "SpAttackMin">Special-Attack &uArr;</option>
                    <option value= "SpAttackMax">Special-Attack &dArr;</option>
                    <option value= "SpDefenseMin">Special-Defense &uArr;</option>
                    <option value= "SpDefenseMax">Special-Defense &dArr;</option>
                    <option value= "hpMin">Hp &uArr;</option>
                    <option value= "hpMax">Hp &dArr;</option>
                    <option value= "speedMin">Speed &uArr;</option>
                    <option value= "speedMax">Speed &dArr;</option>
                </select>
                &nbsp;
                <select id='created' defaultValue="CREATED" onChange={e => handleCreated(e)} className= {style.select}>
                    <option value="CREATED" hidden >Filter by</option>
                    <option value="All">All</option>
                    <option value="api">Official</option>
                    <option value="fan">Fan</option>
                </select>
                <br/>
                <select id='type' defaultValue = "All" onChange={e => handleTypes(e)} className= {style.select}>
                    <option value="All">Filter by type</option>
                        {
                            allTypes?.map(type => (
                                <option key={type.id} value={type.name} >{type.name}</option>
                            ))
                        }
                </select>
                &nbsp;
                <select id='move' defaultValue = "All" onChange={e => handleMoves(e)} className= {style.select}>
                    <option value="All">Filter by move</option>
                        {
                            allMoves?.map(move => (
                                <option key={move.id} value={move.name} >{move.name}</option>
                            ))
                        }
                </select>
                &nbsp;
                <select id='ability' defaultValue = "All" onChange={e => handleAbilities(e)} className= {style.select}>
                    <option value="All">Filter by ability</option>
                        {
                            allAbilities?.map(ability => (
                                <option key={ability.id} value={ability.name} >{ability.name}</option>
                            ))
                        }
                </select>
                <br/>
                <div className= {style.pg}>
                { currentPage > 1 ?
                    (<button onClick={()=>{ if(currentPage > 1) paginate(currentPage - 1)}}>
                    &laquo; Previous
                    </button>)
                    : (<button disabled={true} onClick={()=>{ if(currentPage > 1) paginate(currentPage - 1)}}>
                    &laquo; Previous
                    </button>)}
                    &nbsp;
                    <span className={style.span}>Page {currentPage} of {maxPage}</span>
                    { currentPage !== maxPage ?
                        (<button onClick={()=> { if(currentPage < maxPage) paginate(Number(currentPage) + 1)}}>
                        Next &raquo;
                    </button>)
                    : <button disabled={true} onClick={()=> { if(currentPage < maxPage) paginate(Number(currentPage) + 1)}}>
                    Next &raquo;
                </button>
                    }
                    &nbsp;
                    <select id='pages' defaultValue={0} className= {style.select} onChange={(e) => paginate(e.target.value)} >
                    <option value={0} hidden>Jump to page</option>
                        {pages?.map(n => 
                            <option key={n} value={n}>{n}</option> 
                        )}
                </select>
                </div>
                <div className={style.cardsContainer}>
                    {charge && currentPokemons.length === 0 ?
                    <div className={style.loading}>
                        <h1>Loading...</h1>
                        <br/> <br/> <br/>
                        <img src='https://media.baamboozle.com/uploads/images/125978/1629738053_29014_gif-url.gif' alt='loading' />
                    </div>:
                            currentPokemons?.map(pokemon => {
                                return (
                                    <div key={pokemon.id}>
                                        {
                                            <Link to={`/pokedex/${pokemon.id}`} className={style.link}>
                                                <Card key={pokemon.id}
                                                    name= {pokemon.name}
                                                    image={pokemon.img}
                                                    Types={pokemon.Types[0]?.name ? pokemon.Types.map(t => t.name) : pokemon.Types.map(t => t + (' '))}
                                                    attack= {pokemon.attack}
                                                    weight= {pokemon.weight}
                                                    id = {pokemon.id} />
                                            </Link>
                                        }
                                    </div>
                                )
                            })
                    }
                    {currentPokemons.length === 0 && !charge ? 
                    <div className={style.noFound}>
                    <h1>No Pokemons found</h1>
                    <br/> <br/> <br/>
                    <img src='https://media.giphy.com/media/UHAYP0FxJOmFBuOiC2/giphy.gif' alt='404'/>
                    </div>
                    : null}
                </div>
                <div className= {style.pg2}>
                   { currentPage > 1 ?
                    (<button onClick={()=>{ if(currentPage > 1) paginate(currentPage - 1)}}>
                    &laquo; Previous
                    </button>)
                    : (<button disabled={true} onClick={()=>{ if(currentPage > 1) paginate(currentPage - 1)}}>
                    &laquo; Previous
                    </button>)}
                    &nbsp;
                    <span className={style.span}>Page {currentPage} of {maxPage}</span>
                    { currentPage !== maxPage ?
                        (<button onClick={()=> { if(currentPage < maxPage) paginate(Number(currentPage) + 1)}}>
                        Next &raquo;
                    </button>)
                    : <button disabled={true} onClick={()=> { if(currentPage < maxPage) paginate(Number(currentPage) + 1)}}>
                    Next &raquo;
                </button>
                    }
                    &nbsp;
                    <select id='pages' defaultValue={0} className= {style.select} onChange={(e) => paginate(e.target.value)} >
                    <option value={0} hidden>Jump to page</option>
                        {pages?.map(n => 
                            <option key={n} value={n}>{n}</option> 
                        )}
                </select>
                </div>
            </div>
        </div>
        </div>
    )
};