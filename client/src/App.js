import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import { LandingPage } from "./Pages/LandingPage";
import Pokemon from "./components/Pokemon/Pokemon";
import { Pokedex } from "./Pages/Pokedex/Pokedex";
import { Create } from "./Pages/Create/Create";
import { Team } from "./Pages/Team/Team";


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Route exact path="/pokedex/:id" component={Pokemon}/>
      <Route exact path="/" component={LandingPage}/>
      <Route exact path="/home" component={Pokedex}/>
      <Route exact path="/create" component={Create} />
      <Route exact path="/team" component={Team} />
    </div>
    </BrowserRouter>
  );
}

export default App;