const initialState = {
Pokemons: [],
Types: [],
Moves: [],
Abilities: [],
allPokemons: [],
Details: [],
CreatedPokemons: [],
Team: [],
};

function rootReducer(state = initialState, action){
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        Pokemons: action.payload,
        allPokemons: action.payload,
        CreatedPokemons: action.payload,
      };
    case "GET_TYPES":
        return {
          ...state,
          Types: action.payload,
        };
    case "GET_MOVES":
          return {
            ...state,
            Moves: action.payload,
          };
    case "GET_ABILITIES":
            return {
              ...state,
              Abilities: action.payload,
            };
    case "FILTER_POKEMON_BY_TYPE":
      let filterPokemons = state.CreatedPokemons
      let filteredPokemons = filterPokemons?.filter(pokemon => pokemon.Types.map(e => e.name)?.includes(action.payload) || pokemon.Types.includes(action.payload))
      if(action.payload === 'All') filteredPokemons = filterPokemons
      return {
        ...state,
        Pokemons: filteredPokemons,
      };
      case "FILTER_POKEMON_BY_MOVE":
        let filterByMoves = state.CreatedPokemons
        let filteredByMoves = filterByMoves?.filter(pokemon => pokemon.Moves.map(e => e.name)?.includes(action.payload) || pokemon.Moves.includes(action.payload))
        if(action.payload === 'All') filteredByMoves = filterByMoves
        return {
          ...state,
          Pokemons: filteredByMoves,
        };
        case "FILTER_POKEMON_BY_ABILITY":
          let filterByAbility = state.CreatedPokemons
          let filteredByAbility = filterByAbility?.filter(pokemon => pokemon.Abilities.map(e => e.name)?.includes(action.payload) || pokemon.Abilities.includes(action.payload))
          if(action.payload === 'All') filteredByAbility = filterByAbility
          return {
            ...state,
            Pokemons: filteredByAbility,
          };
    case "FILTER_POKEMON_BY_OFFICIAL":
      let filterPokemonsByOfficial = state.allPokemons;
      let filter = action.payload === 'api' ? filterPokemonsByOfficial.filter(p => p.oficial) : filterPokemonsByOfficial.filter(p => !p.oficial)
      if(action.payload === 'All') filter = filterPokemonsByOfficial
      return {
        ...state,
        Pokemons: filter,
        CreatedPokemons: filter
      };
    case "FILTER_POKEMON_BY_NAME":
      const filterPokemonByName = state.Pokemons;
      let filterName = action.payload === 'asc' ? filterPokemonByName.sort((a, b) =>{
          if(a.name > b.name) return 1
          if(a.name < b.name) return -1
          return 0
      }) : filterPokemonByName.sort((a, b) => {
          if(a.name < b.name) return 1
          if(a.name > b.name) return -1
          return 0
      })
      return {
          ...state,
          Pokemons: filterName
      };
      case "SORT_POKEMON_BY_HP":
        const sortPokemonByHp =  state.Pokemons;
        let filterHp = action.payload === "hpMin" ? sortPokemonByHp.sort((a, b) => {
            if(parseInt(a.hp) > parseInt(b.hp)) return 1
            if(parseInt(a.hp) < parseInt(b.hp)) return -1
            return 0
        }) : sortPokemonByHp.sort((a, b) => {
            if(parseInt(a.hp) < parseInt(b.hp)) return 1
            if(parseInt(a.hp) > parseInt(b.hp)) return -1
            return 0
        })
        return {
            ...state,
            Pokemons: filterHp
    };
    case "SORT_POKEMON_BY_SPEED":
      const sortPokemonBySpeed =  state.Pokemons;
      let filterSpeed = action.payload === "speedMin" ? sortPokemonBySpeed.sort((a, b) => {
          if(parseInt(a.speed) > parseInt(b.speed)) return 1
          if(parseInt(a.speed) < parseInt(b.speed)) return -1
          return 0
      }) : sortPokemonBySpeed.sort((a, b) => {
          if(parseInt(a.speed) < parseInt(b.speed)) return 1
          if(parseInt(a.speed) > parseInt(b.speed)) return -1
          return 0
      })
      return {
          ...state,
          Pokemons: filterSpeed
  };
    case "SORT_POKEMON_BY_ATTACK":
            const sortPokemonByAttack =  state.Pokemons;
            let filterAttack = action.payload === "attackMin" ? sortPokemonByAttack.sort((a, b) => {
                if(parseInt(a.attack) > parseInt(b.attack)) return 1
                if(parseInt(a.attack) < parseInt(b.attack)) return -1
                return 0
            }) : sortPokemonByAttack.sort((a, b) => {
                if(parseInt(a.attack) < parseInt(b.attack)) return 1
                if(parseInt(a.attack) > parseInt(b.attack)) return -1
                return 0
            })
            return {
                ...state,
                Pokemons: filterAttack
        };
        case "SORT_POKEMON_BY_DEFENSE":
          const sortPokemonByDefense =  state.Pokemons;
          let filterDefense = action.payload === "defenseMin" ? sortPokemonByDefense.sort((a, b) => {
              if(parseInt(a.defense) > parseInt(b.defense)) return 1
              if(parseInt(a.defense) < parseInt(b.defense)) return -1
              return 0
          }) : sortPokemonByDefense.sort((a, b) => {
              if(parseInt(a.defense) < parseInt(b.defense)) return 1
              if(parseInt(a.defense) > parseInt(b.defense)) return -1
              return 0
          })
          return {
              ...state,
              Pokemons: filterDefense
      };
      case "SORT_POKEMON_BY_SPATTACK":
        const sortPokemonBySpAttack =  state.Pokemons;
        let filterSpAttack = action.payload === "SpAttackMin" ? sortPokemonBySpAttack.sort((a, b) => {
            if(parseInt(a.spAtk) > parseInt(b.spAtk)) return 1
            if(parseInt(a.spAtk) < parseInt(b.spAtk)) return -1
            return 0
        }) : sortPokemonBySpAttack.sort((a, b) => {
            if(parseInt(a.spAtk) < parseInt(b.spAtk)) return 1
            if(parseInt(a.spAtk) > parseInt(b.spAtk)) return -1
            return 0
        })
        return {
            ...state,
            Pokemons: filterSpAttack
    };
    case "SORT_POKEMON_BY_SPDEFENSE":
      const sortPokemonBySpDefense =  state.Pokemons;
      let filterSpDefense = action.payload === "SpDefenseMin" ? sortPokemonBySpDefense.sort((a, b) => {
          if(parseInt(a.spDef) > parseInt(b.spDef)) return 1
          if(parseInt(a.spDef) < parseInt(b.spDef)) return -1
          return 0
      }) : sortPokemonBySpDefense.sort((a, b) => {
          if(parseInt(a.spDef) < parseInt(b.spDef)) return 1
          if(parseInt(a.spDef) > parseInt(b.spDef)) return -1
          return 0
      })
      return {
          ...state,
          Pokemons: filterSpDefense
  };
    case "SORT_POKEMON_BY_WEIGHT":
            const filterPokemonsByWeight =  state.Pokemons;
            let filterWeight = action.payload === "weightMin" ? filterPokemonsByWeight.sort((a, b) => {
                if(parseInt(a.weight) > parseInt(b.weight)) return 1
                if(parseInt(a.weight) < parseInt(b.weight)) return -1
                return 0
            }) : filterPokemonsByWeight.sort((a, b) => {
                if(parseInt(a.weight) < parseInt(b.weight)) return 1
                if(parseInt(a.weight) > parseInt(b.weight)) return -1
                return 0
            })
            return {
                ...state,
                Pokemons: filterWeight
        };
      case "SORT_POKEMON_BY_HEIGHT":
          const filterPokemonsByHeight =  state.Pokemons;
          let filterHeight = action.payload === "heightMin" ? filterPokemonsByHeight.sort((a, b) => {
              if(parseInt(a.height) > parseInt(b.height)) return 1
              if(parseInt(a.height) < parseInt(b.height)) return -1
              return 0
          }) : filterPokemonsByHeight.sort((a, b) => {
              if(parseInt(a.height) < parseInt(b.height)) return 1
              if(parseInt(a.height) > parseInt(b.height)) return -1
              return 0
          })
          return {
              ...state,
              Pokemons: filterHeight
      };
    case "ADD":
      if(state.Team.length >= 6) alert('Your team cannot have more than six Pokemons');
      return {
        ...state,
        Team: [...state.Team, action.payload]
      };
    case "GET_NAME":
        return {
          ...state,
          Pokemons: action.payload,
        };
    case 'REMOVE_POKEMON':
        return {
          ...state,
        };
    case "GET_DETAIL":
          return {
              ...state,
              Details: action.payload
      };
    case "CLEAR_DETAIL":
          return {
              ...state,
              Details: []
      };
    default:
      return state;
  };
};

export default rootReducer;