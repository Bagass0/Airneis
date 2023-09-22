import React, { useContext, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { dataContext } from "../context/dataContext";
import { AuthContext } from "../context/authContext";
import { InfoCommandeContext } from "../context/InfoCommandeContext";
import Connexion from "./Connexion";
import { ScrollView } from "react-native-gesture-handler";
import { styles } from "../../../Styles";

const ConfirmationCommande = () => {
  const navigation = useNavigation();
  const { isLoggedIn } = useContext(AuthContext);
  const { panier, reinitialiserPanier } = useContext(dataContext);
  const { paiement, reinitialiserCommande } = useContext(InfoCommandeContext);

  useEffect(() => {
    return () => {
      reinitialiserPanier();
      reinitialiserCommande();
    };
  }, []);

  return (
    <ScrollView>
      {isLoggedIn ? (
        <>
          {panier.length === 0 ? (
            <View style={styles.containerCgu}>
              <View style={styles.priceContainer}>
                <Text style={styles.titleCgu}>Votre panier est vide ! ☹️</Text>
                <View style={styles.dividerbtn}/>
                <TouchableOpacity onPress={() => navigation.navigate("recherche")} style={styles.btn}>
                  <Text style={styles.ajouterButtonText}>Voir notre catalogue</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <>
            <View style={styles.containerCgu}>
              <View style={styles.priceContainer}>
                <Text style={styles.titleCgu}>Commande confirmée! ✅</Text>

                <Text style={styles.titleCgu2}>Merci de votre achat !</Text>
                <Text style={styles.titleCgu2}>Votre commande a bien été enregistrée sous le numéro <Text style={styles.link} onPress={() => navigation.navigate("mesCommande")}>n°{paiement.idCommande}</Text>. Vous pouvez suivre son état depuis votre espace client.</Text>

                <View style={styles.buttonGroup}>
                  <TouchableOpacity onPress={() => navigation.navigate("recherche")} style={styles.btn}>
                    <Text style={styles.ajouterButtonText}>Continuer mes achats</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            </>
          )}
        </>
      ) : (
        <Connexion />
      )}
    </ScrollView>
  );
};

export default ConfirmationCommande;
