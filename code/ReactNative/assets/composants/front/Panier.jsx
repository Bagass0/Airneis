import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/authContext';
import { dataContext } from '../context/dataContext';
import { styles } from '../../../Styles';

const Panier = () => {
  const { ajouter, panier, retirer, supprimer, nombreProduits, getTotalProduit, getTotalPanier } =
    useContext(dataContext);
  const { isLoggedIn } = useContext(AuthContext);
  const navigation = useNavigation();

  const handlePayer = () => {
    if (!isLoggedIn) {
      alert('Veuillez vous connecter !');
    } else {
      navigation.navigate('livraison');
    }
  };

  return (
    <>
    <ScrollView style={styles.background}>
      <Text style={styles.headingPanier}>Récapitulatif de mon Panier</Text>
      <View style={styles.containerPanier}>
        <View style={styles.articleContainer}>
          {panier.length === 0 ? (
            <View style={styles.emptyCartContainer}>
              <Text>Votre panier est vide. ☹️</Text>
              <View style={styles.dividerbtn}/>
              <TouchableOpacity
                style={styles.ajouterButton}
                onPress={() => navigation.navigate('recherche')}
              >
                <Text style={styles.ajouterButtonText}>   Voir notre catalogue   </Text>
              </TouchableOpacity>
            </View>
          ) : null}

          <View style={styles.table}>
            {panier.map((produit) => (
                
              <View key={produit.id} style={styles.tableRow}>
                <Image
                  style={styles.productImage}
                  source={{ uri: `http://airneis.ddns.net:3000/img_produit/${produit.id}` }}
                />

                <View style={styles.productDetails}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    disabled={produit.quantite === 1}
                    onPress={() => retirer(produit)}
                  >
                    <Text>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{produit.quantite}</Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    disabled={produit.quantite >= produit.stock}
                    onPress={() => ajouter(produit)}
                  >
                    <Text>+</Text>
                  </TouchableOpacity>
                  {produit.quantite >= produit.stock && (
                    <Text style={styles.stockErrorText}>Quantité en stock insuffisante</Text>
                  )}
                </View>

                <Text style={styles.productPrice}>
                  {new Intl.NumberFormat('fr-FR', {
                    style: 'currency',
                    currency: 'EUR',
                  }).format(getTotalProduit(produit))}
                </Text>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => supprimer(produit)}
                >
                  <Text style={styles.deleteButtonText}>Supprimer</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

          {panier.length > 0 ? (
            <View style={styles.priceContainer}>
              <Text style={styles.priceHeading}>Total à payer</Text>
              <Text>
                Tarif {nombreProduits > 1 && `pour (${nombreProduits} articles)`}:&nbsp;
                {new Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: 'EUR',
                }).format(getTotalPanier())}
              </Text>
              <Text>Livraison: 10€</Text>
              <View style={styles.totalPrice}>
                <Text style={styles.totalPriceText}>
                  Total:{' '}
                  {new Intl.NumberFormat('fr-FR', {
                    style: 'currency',
                    currency: 'EUR',
                  }).format(getTotalPanier() + 10)}
                </Text>
              </View>
              <View style={styles.buttonGroup}></View>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={handlePayer}
                  disabled={panier.length <= 0}
                >
                  <Text style={styles.orderButtonText}>Passer la commande</Text>
                </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </>
  );
};

export default Panier;
