import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import AppRecipesProvider from './context/AppRecipesProvider';
import Comidas from './pages/Comidas';
import Perfil from './pages/Perfil';
import Explorar from './pages/Explorar';
import Bebidas from './pages/Bebidas';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ReceitaBebida from './pages/ReceitaBebida';
import ReceitaComida from './pages/ReceitaComida';
import ExplorarBebidas from './pages/ExplorarBebidas';
import ExplorarComidas from './pages/ExplorarComidas';
import ExplorarIngredientes from './pages/ExplorarIngredientesComidas';
import ExplorarOrigem from './pages/ExplorarOrigem';
import ReceitaComidaEmAndamento from './pages/ReceitaComidaEmAdamento';
import ReceitaBebidaEmAndamento from './pages/ReceitaBebidaEmAndamento';
import ExplorarIngredientesComidas from './pages/ExplorarIngredientesComidas';

function App() {
  return (
    <AppRecipesProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/bebidas/:id/in-progress" component={ ReceitaBebidaEmAndamento } />
          <Route path="/bebidas/:id" component={ ReceitaBebida } />
          <Route path="/bebidas" component={ Bebidas } />
          <Route path="/perfil" component={ Perfil } />
          <Route
            path="/explorar/bebidas/ingredientes"
            component={ ExplorarIngredientes }
          />
          <Route path="/explorar/bebidas" component={ ExplorarBebidas } />
          <Route
            path="/explorar/comidas/ingredientes"
            component={ ExplorarIngredientesComidas }
          />
          <Route
            path="/explorar/comidas/area"
            component={ ExplorarOrigem }
          />
          <Route path="/explorar/comidas" component={ ExplorarComidas } />
          <Route path="/explorar" component={ Explorar } />
          <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
          <Route path="/comidas/:id/in-progress" component={ ReceitaComidaEmAndamento } />
          <Route path="/receitas-feitas" component={ ReceitasFeitas } />
          <Route path="/comidas/:id" component={ ReceitaComida } />
          <Route path="/comidas" component={ Comidas } />
          <Route path="/" component={ Login } />
        </Switch>
      </BrowserRouter>
    </AppRecipesProvider>
  );
}

export default App;
