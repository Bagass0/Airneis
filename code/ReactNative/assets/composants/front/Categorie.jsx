import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { dataContext } from '../context/dataContext';
import { styles } from '../../../Styles';

const Categorie = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { categorie } = params;
  const [produits, setProduits] = useState([]);
  const [categories, setCategories] = useState([]);
  const { ajouter } = useContext(dataContext);
  const [categorieNom, setCategorieNom] = useState('');

  useEffect(() => {
    axios
      .get(`http://airneis.ddns.net:3000/categorie/affichage_categorie.php?categorie=${categorie}`)
      .then(response => {
        setCategories(response.data);
        if (response.data.length > 0) {
          setCategorieNom(response.data[0].nom);
        }
      })
      .catch(error => console.log(error));
  }, [categorie]);

  useEffect(() => {
    fetch(`http://airneis.ddns.net:3000/categorie/categorie.php?categorie=${categorie}`)
      .then(response => response.json())
      .then(data => {
        setProduits(data);
      })
      .catch(error => console.error(error));
  }, [categorie]);

  if (produits.length === 0) {
    return <Text>Chargement...</Text>;
  }

  return (
    <ScrollView>
      {categories.map(categorie => (
        <View key={categorie.nom}>
          <Image
            source={{ uri: `http://airneis.ddns.net:3000/img_categorie/${categorie.id_categorie}banniere.jpg` }}
            style={{ width: Dimensions.get('window').width, height: 100 }}
            resizeMode="cover"
          />
          <View style={styles.titreContainer}>
            <Text style={styles.titreText}>{categorie.nom}</Text>
          </View>
        </View>
      ))}

      <View style={styles.containerCategorie}>
        <View style={styles.row}>
          {produits.map(produit => (
            <TouchableOpacity
              key={produit.id}
              onPress={() => navigation.navigate('produit', { id: produit.id })}
              style={styles.produitContainer}
            >
              <Image
                source={{ uri: `http://airneis.ddns.net:3000/img_produit/${produit.id}` }}
                style={styles.produitImage}
                resizeMode="cover"
              />
              <View style={styles.produitInfo}>
                <Text style={styles.produitTitre}>{produit.nom}</Text>
                <Text style={styles.produitPrix}>{produit.prix}€</Text>
                {produit.stock > 0 ? (
                  <TouchableOpacity
                    onPress={() => ajouter(produit)}
                    style={styles.ajouterButton}
                  >
                    <Text style={styles.ajouterButtonText}>Ajouter au panier</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.disabledButton} disabled>
                    <Text style={styles.stockEpuiseButtonText}>Stock épuisé</Text>
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Categorie;
