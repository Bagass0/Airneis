import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import { View, Text, TouchableOpacity, ScrollView, Image, Alert  } from "react-native";
import Connexion from "./Connexion";
import { styles } from '../../../Styles';

function MesCommandes() {
  const { accountId, isLoggedIn } = useContext(AuthContext);
  const navigation = useNavigation();
  const [commandes, setCommandes] = useState([]);
  const [commandeSelectionnee, setCommandeSelectionnee] = useState(null);

  useEffect(() => {
    axios.get(`http://airneis.ddns.net:3000/page-mes-commandes.php?accountId=${accountId}`)
      .then(response => {
        const commandesTrie = response.data.sort((a, b) => b.id - a.id);
        setCommandes(commandesTrie);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des commandes", error);
      });
  }, [accountId]);

  const handleClick = (commande) => {
    if (commandeSelectionnee === commande) {
      setCommandeSelectionnee(null);
    } else {
      setCommandeSelectionnee(commande);
    }
  };

  const handleAnnulerCommande = (commande) => {
    Alert.alert(
      "Confirmation",
      "Êtes-vous sûr de vouloir annuler cette commande ?",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Confirmer",
          onPress: () => annulerCommande(commande),
        },
      ],
      { cancelable: true }
    );
  };

  const handleConfirmAnnulerCommande = (commande) => {
    Alert.alert(
      "Confirmation",
      "Êtes-vous sûr de vouloir annuler cette commande ?",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Confirmer",
          onPress: () => annulerCommande(commande),
        },
      ],
      { cancelable: true }
    );
  };

  const annulerCommande = (commande) => {
      axios.post(`http://airneis.ddns.net:3000/annuler-commande.php`, { id: commande.id })
        .then(response => {
          const updatedCommandes = commandes.map(c => {
            if (c.id === commande.id) {
              return { ...c, etat: 'Annulé' };
            }
            return c;
          });
          setCommandes(updatedCommandes);
        })
        .catch(error => {
          console.error("Erreur lors de l'annulation de la commande", error);
        });
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          {commandes.length === 0 ? (
            <View style={{ alignItems: 'center' }}>
              <Text>Aucune commande passée pour le moment ☹️</Text>
              <TouchableOpacity style={styles.catalogButton}>
                <Text style={styles.catalogButtonText}>Voir notre catalogue</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Text style={styles.pageTitle}>Mes commandes</Text>
              <Text style={styles.subtitle}>
                Année : {new Date().getFullYear()}
              </Text>
              <ScrollView style={styles.commandesContainer}>
                {commandes.map((commande) => {
                  const prixTotalAvecLivraison = parseFloat(commande.total_panier) + 10;

                  return (
                    <TouchableOpacity key={commande.id} style={[styles.commandeItem, commandeSelectionnee === commande ? styles.commandeSelected : null]} onPress={() => handleClick(commande)}>
                      <View style={[styles.boutonCommandes, styles[commande.etat.toLowerCase()]]}>
                        {commande.etat === 'En cours de préparation' && (
                          <>
                            <Text>Commande n° {commande.id} - État : <Text style={styles.orangeText}>{commande.etat}</Text></Text>
                            <View style={styles.buttonGroup}>
                            <TouchableOpacity style={styles.disabledButton} onPress={() => handleConfirmAnnulerCommande(commande)}>
                              <Text style={styles.stockEpuiseButtonText}>Annuler la commande</Text>
                            </TouchableOpacity>
                            </View>
                          </>
                        )}
                        {commande.etat === 'Expédiée' && (
                          <Text>Commande n° {commande.id} - État : <Text style={styles.greenText}>{commande.etat}</Text></Text>
                        )}
                        {commande.etat === 'Annulé' && (
                          <Text>Commande n° {commande.id} - État : <Text style={styles.redText}>{commande.etat}</Text></Text>
                        )}
                      </View>
                      {commandeSelectionnee === commande && (
                        <View style={styles.commandeDetails}>
                          <View>
                            <Text style={styles.detailsTitle}>Détails de la commande</Text>
                            <Text>État : {commande.etat}</Text>
                            <Text>Commandé le : {commande.date}</Text>
                            <Text>Nombre d'articles : {commande.total_produit}</Text>
                            <Text>Prix total (avec livraison) : {prixTotalAvecLivraison}€</Text>
                            <View style={styles.separator} />
                            <Text>Articles :</Text>
                            <ScrollView>
                              {commande.produits.map((produit) => (
                                <View key={produit.id}>
                                  <TouchableOpacity
                                    key={commande.id}
                                    onPress={() => navigation.navigate('produit', { id: produit.id_produit })}
            >
                                    <Image
                                      style={styles.productImage}
                                      source={{uri: `http://airneis.ddns.net:3000/img_produit/${produit.id_produit}`}}
                                    />
                                  </TouchableOpacity>
                                  <Text>{produit.nom_produit} - Prix : {produit.prix_produit}€ - Quantité : {produit.quantite_produit}</Text>
                                </View>
                              ))}
                            </ScrollView>
                            <View style={styles.separator} />
                            <Text style={styles.detailsTitle}>Adresse de livraison</Text>
                            <Text>{commande.nom_adresse_livraison}</Text>
                            <Text>Nom: <Text style={styles.boldText}>{commande.nom_livraison}</Text></Text>
                            <Text>Prénom: <Text style={styles.boldText}>{commande.prenom_livraison}</Text></Text>
                            <Text>Adresse: <Text style={styles.boldText}>{commande.adresse_livraison}</Text></Text>
                            <Text>Adresse 2 (Optionnel): <Text style={styles.boldText}>{commande.adresse_livraison2}</Text></Text>
                            <Text>Code postal: <Text style={styles.boldText}>{commande.code_postal_livraison}</Text></Text>
                            <Text>Ville: <Text style={styles.boldText}>{commande.ville_livraison}</Text></Text>
                            <Text>Pays: <Text style={styles.boldText}>{commande.pays_livraison}</Text></Text>

                            <View style={styles.separator} />

                            <Text style={styles.detailsTitle}>Adresse de facturation</Text>
                            <Text>Nom: <Text style={styles.boldText}>{commande.nom_facturation}</Text></Text>
                            <Text>Prénom: <Text style={styles.boldText}>{commande.prenom_facturation}</Text></Text>
                            <Text>Adresse: <Text style={styles.boldText}>{commande.adresse_facturation}</Text></Text>
                            <Text>Code postal: <Text style={styles.boldText}>{commande.code_postal_facturation}</Text></Text>
                            <Text>Ville: <Text style={styles.boldText}>{commande.ville_facturation}</Text></Text>
                            <Text>Pays: <Text style={styles.boldText}>{commande.pays_facturation}</Text></Text>

                            <View style={styles.separator} />

                            <Text style={styles.detailsTitle}>Moyen de paiement</Text>
                            <Text>Nom sur la carte: <Text style={styles.boldText}>{commande.nom_paiement}</Text></Text>
                            <Text>Numéro de carte: <Text style={styles.boldText}><Text>{'**** **** **** ' + commande.numero_paiement.slice(-4)}</Text></Text></Text>
                            <Text>Date d'expiration: <Text style={styles.boldText}>{commande.date_paiement}</Text></Text>
                            <Text>CVV: <Text style={styles.boldText}>***</Text></Text>
                          </View>
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </>
          )}
        </>
      ) : (
        <Connexion/>
      )}
    </>
  );
}

export default MesCommandes;
