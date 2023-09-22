import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, FlatList, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { dataContext } from '../context/dataContext';
import { styles } from '../../../Styles';

const Recherche = () => {
  const navigation = useNavigation();
  const [recherche, setRecherche] = useState('');
  const [donnees, setDonnees] = useState([]);
  const [resultats, setResultats] = useState([]);
  const [aucunResultat, setAucunResultat] = useState(false);
  const { ajouter } = useContext(dataContext);

  const handleChange = (value) => {
    setRecherche(value);
  };

  const handleSubmit = () => {
    console.log(`Recherche : ${recherche}`);
    const filtre = recherche.trim().toLowerCase();
    const resultatsFiltres = donnees.filter(
      (donnee) =>
        donnee.nom.toLowerCase().includes(filtre) || donnee.description.toLowerCase().includes(filtre)
    );

    setResultats(resultatsFiltres);
    setAucunResultat(resultatsFiltres.length === 0);
  };

  useEffect(() => {
    axios
      .get('http://airneis.ddns.net:3000/recherche.php')
      .then((response) => {
        setDonnees(response.data);
        setResultats(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const renderProduit = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => navigation.navigate('produit', { id: item.id })}>
        <Image
          style={styles.cardImage}
          source={{ uri: `http://airneis.ddns.net:3000/img_produit/${item.id}` }}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <View style={styles.produitInfo}>
        <Text style={styles.produitTitre}>{item.nom}</Text>
        <Text style={styles.produitPrix}>{item.prix}€</Text>
        {item.stock > 0 ? (
          <TouchableOpacity
            onPress={() => ajouter(item)}
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
    </View>
  );

  return (
    <>
      <View style={styles.containerRecherche}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.inputRecherche}
            placeholder="Rechercher des produits"
            value={recherche}
            onChangeText={handleChange}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSubmit}>
            <Text style={styles.searchButtonText}>Rechercher</Text>
          </TouchableOpacity>
        </View>
      </View>
      {aucunResultat && (
        <View style={styles.alertContainer}>
          <Text style={styles.alertText}>Aucun résultat trouvé pour votre recherche.</Text>
        </View>
      )}
      <FlatList
        data={resultats}
        renderItem={renderProduit}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
    </>
  );
};

export default Recherche;
