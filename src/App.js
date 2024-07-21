import React from 'react';
import '../src/App.css'
import { BrowserRouter ,Routes,Route} from 'react-router-dom';
import Acceuil from './pages/Acceuil';
import Connexion from './pages/Connexion';
import Inscription from './pages/Inscription';
import Annonce from './pages/Annonce';
import Ajouter_Annonce from './pages/Ajouter_Annonce';
import Mes_annonces from './pages/Mes_annonces';
import Estimateur from './pages/Estimateur';
import Favoris from './pages/Favoris';
import Profil from './pages/Profil';
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Acceuil/>} />
        <Route path='/connexion' element={<Connexion/>}/>
        <Route path='/inscription' element={<Inscription/>}/>
        <Route path='/ajouter_annonce' element={<Ajouter_Annonce/>}/>
        <Route path='/annonces/annonce/:id' element={<Annonce/>}/>
        <Route path='/mes_annonces/utilisateur/:userId' element={<Mes_annonces/>}/>
        {/* <Route path='/mes_annonces/modifier_annonce/:annonceId' element={<Modifier_annonce/>}/> */}
        <Route path='/utilisateur/mon_profil/:userId' element={<Profil/>}/>
        {/* <Route path='*' element={<Erreur/>}/> */}
        <Route path='/estimation_des_prix_appartements' element={<Estimateur/>}/>
        <Route path='/mes_favoris/utilisateur/:userId' element={<Favoris/>}/>
        </Routes>
      </BrowserRouter>
  );
};

export default App;
