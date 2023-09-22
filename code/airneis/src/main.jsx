import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';

import Acceuil from './composants/front/Accueil';
import Panier from './composants/front/Panier';
import Recherche from './composants/front/Recherche';
import NotFound from './composants/front/NotFound';
import Connexion from './composants/front/Connexion';
import Inscription from './composants/front/Inscription';
import MentionLegale from './composants/front/MentionLegale';
import CGU from './composants/front/CGU';
import Contact from './composants/front/Contact';
import A_propos from './composants/front/A_propos';
import MenuNavigation from './composants/front/MenuNavigation';
import Produit from './composants/front/Produit';
import Categorie from './composants/front/Categorie';
import Livraison from './composants/front/Livraison';
import Paiement from './composants/front/Paiement';
import ConfirmationCommande from './composants/front/ConfirmationCommande';
import MesParametres from './composants/front/MesParametres';
import UserAdresses from './composants/front/UserAdresses';
import MoyenDePaiement from './composants/front/MoyensDePaiement';
import MesCommandes from './composants/front/MesCommandes';
import PasswordResetPage from './composants/front/ResetPasswordPage';
import ForgotPassword from './composants/front/ForgotPassword';



ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
      <Route index element={<Acceuil />} />
      <Route path='panier' element={<Panier />} />
      <Route path='recherche' element={<Recherche />} />
      <Route path='connexion' element={<Connexion />} />
      <Route path='inscription' element={<Inscription />} />
      <Route path='mention-legale' element={<MentionLegale/>} />
      <Route path='CGU' element={<CGU/>} />
      <Route path='contact' element={<Contact/>} />
      <Route path='propos' element={<A_propos/>} />
      <Route path='menu-navigation' element={<MenuNavigation/>} />
      <Route path='produit/:id' element={<Produit/>} />
      <Route path='categorie/:categorie' element={<Categorie/>} />
      <Route path='livraison' element={<Livraison/>} />
      <Route path='Paiement' element={<Paiement/>} />
      <Route path='ConfirmationCommande' element={<ConfirmationCommande/>} />
      <Route path='mesParametres' element={<MesParametres/>} />
      <Route path='userAdresses' element={<UserAdresses/>} />
      <Route path='moyen-de-paiement' element={<MoyenDePaiement/>} />
      <Route path="*" element={<NotFound />} />
      <Route path='mesCommandes' element={<MesCommandes/>} />
      <Route path='reset-password/:id' element={<PasswordResetPage/>} />
      <Route path='forgot-password' element={<ForgotPassword/>} />


      </Route>
    </Routes>
  </BrowserRouter>
)
