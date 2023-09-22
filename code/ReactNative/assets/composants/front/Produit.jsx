import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Carousel from 'react-native-snap-carousel';
import { dataContext } from '../context/dataContext';
import { styles } from '../../../Styles';

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function Produit() {
  const navigation = useNavigation();

  const { params } = useRoute();
  const { id } = params;

  const [produit, setProduct] = useState(null);
  const [produits, setProducts] = useState([]);
  const { ajouter } = useContext(dataContext);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    axios
      .get(`http://airneis.ddns.net:3000/produit.php?id=${id}`)
      .then((response) => response.data)
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => console.error(error));
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://airneis.ddns.net:3000/categorie/categorie.php?categorie=${produit?.categorie}`)
      .then((response) => {
        const shuffledProducts = shuffleArray(response.data);
        const filteredProducts = shuffledProducts.filter((p) => p.id !== produit.id);
        setProducts(filteredProducts.slice(0, 6));
      })
      .catch((error) => console.error(error));
  }, [produit]);

  const handleInteraction = () => {
    setAutoplay(false);
  };

  if (!produit) {
    return <Text>Chargement...</Text>;
  }

  return (
    <ScrollView style={styles.background}>
      <View>
        <>
          <View style={styles.catContainer}>
            <View style={{ alignItems: 'center' }}>
              <Carousel
                data={[
                  { id: 1, source: `http://airneis.ddns.net:3000/img_produit/${produit.id}.jpg` },
                  { id: 2, source: `http://airneis.ddns.net:3000/img_produit/${produit.id}-2.jpg` },
                  { id: 3, source: `http://airneis.ddns.net:3000/img_produit/${produit.id}-3.jpg` },
                ]}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={handleInteraction}>
                    <Image source={{ uri: item.source }} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').width }} />
                  </TouchableOpacity>
                )}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={Dimensions.get('window').width}
                autoplay={autoplay}
                autoplayInterval={5000}
                loop
                enableSnap
                activeSlideAlignment="start"
              />
            </View>

            <View style={styles.descriptionContainer}>
              <View style={styles.titreProduit}>
                <Text style={styles.titre}>{produit.nom}</Text>
                <Text style={styles.prix}>{produit.prix}€</Text>
              </View>

              <View>
                {produit.stock > 1 ? (
                  <Text style={{ color: 'green' }}>En stock</Text>
                ) : null}

                {produit.stock == 1 ? (
                  <Text style={{ color: 'red' }}>Plus que 1 produit en stock !</Text>
                ) : null}

                {produit.stock == 0 ? (
                  <Text style={{ color: 'red' }}>Stock épuisé</Text>
                ) : null}
              </View>
              
              <Text style={styles.descriptionProduit}>Matériau: {produit.materiau}</Text>

              <Text style={styles.descriptionProduit}>{produit.description}</Text>

              <View style={styles.buttonContainer}>
                {produit.stock > 0 ? (
                  <TouchableOpacity style={styles.ajouterButton} onPress={() => ajouter(produit)}>
                    <Text style={styles.ajouterButtonText}>Ajouter au panier</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.disabledButton} disabled>
                    <Text style={styles.stockEpuiseButtonText}>Stock épuisé</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>

          <Text style={styles.produitsSimilaires}>Produits similaires</Text>

          <View style={styles.container}>
            <View style={styles.row}>
              {produits.map((produit) => (
                <View style={styles.produitContainer} key={produit.id}>
                  <TouchableOpacity onPress={() => navigation.navigate('produit', { id: produit.id })}>
                    <Image
                      source={{ uri: `http://airneis.ddns.net:3000/img_produit/${produit.id}` }}
                      style={styles.produitImage}
                      alt={produit.titre}
                    />
                  </TouchableOpacity>

                  <View style={styles.produitInfo}>
                    <Text style={styles.produitTitre}>{produit.nom}</Text>
                    <Text style={styles.produitPrix}>{produit.prix}€</Text>

                    {produit.stock > 0 ? (
                      <TouchableOpacity style={styles.ajouterButton} onPress={() => ajouter(produit)}>
                        <Text style={styles.ajouterButtonText}>Ajouter au panier</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity style={styles.disabledButton} disabled>
                        <Text style={styles.stockEpuiseButtonText}>Stock épuisé</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              ))}
            </View>
          </View>
        </>
      </View>
    </ScrollView>
  );
}

export default Produit;
