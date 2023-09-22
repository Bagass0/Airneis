import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Gallery from '../Slider';

const Accueil = () => {
  const navigation = useNavigation();

  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://airneis.ddns.net:3000/accueil.php')
      .then(response => setImages(response.data.slice(0, 3)))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    axios.get('http://airneis.ddns.net:3000/categorie/categorie_acceuil.php')
      .then(response => setCategories(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View>
        <Gallery />
      </View>
      <View style={{ marginTop: 20, alignItems: 'center' }}>
        <Text style={{ fontSize: 20 }}>VENANT DES HAUTES TERRES D'ÉCOSSE</Text>
        <Text style={{ fontSize: 20 }}>NOS MEUBLES SONT IMMORTELS</Text>
      </View>

      <View style={{ marginTop: 20, alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          {categories.map((categorie, index) => (
            <TouchableOpacity
              style={{ marginBottom: 10, marginLeft: 10, marginRight: 10, marginTop: 10, alignItems: 'center', flex: 1 }}
              onPress={() => navigation.navigate('categorie', { categorie: categorie.id_categorie })}
              key={categorie.nom}
            >
              <Image
                style={{ width: 100, height: 100 }}
                source={{ uri: `http://airneis.ddns.net:3000/img_categorie/${categorie.id_categorie}icon.jpg` }}
                alt={`image-${categorie.nom}`}
              />
              <Text style={{ textAlign: 'center' }}>{categorie.nom}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>



      <View style={{ marginTop: 50, alignItems: 'center' }}>
        <Text style={{ fontSize: 20 }}>Les Highlanders du moment 🔥</Text>
      </View>

      <View style={{ marginTop: 20, marginLeft: 10, marginRight: 10, alignItems: 'center' }}>
        {images.map((image, index) => (
          <TouchableOpacity
            style={{ marginBottom: 10, marginTop: 10 }}
            onPress={() => navigation.navigate('produit', { id: image.id })}
            key={index}
          >
            <Image
              style={{ width: Dimensions.get('window').width-100, height: Dimensions.get('window').width-100 }}
              source={{ uri: `http://airneis.ddns.net:3000/img_produit/${image.id}` }}
            />
            <Text style={{ textAlign: 'center' }}>{image.nom}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

export default Accueil;
