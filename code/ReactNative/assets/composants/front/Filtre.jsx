import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';

const Filtre = ({ setDonnees, setResultats }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [prixMin, setPrixMin] = useState('');
  const [prixMax, setPrixMax] = useState('');
  const [stockDisponible, setStockDisponible] = useState(false);
  const [materiaux, setMateriaux] = useState({
    bois: false,
    acier: false,
    plastique: false,
    verre: false,
    aluminium: false,
  });

  const handleChangePrixMin = (value) => {
    setPrixMin(value);
  };

  const handleChangePrixMax = (value) => {
    setPrixMax(value);
  };

  const handleChangeStockDisponible = (value) => {
    setStockDisponible(value);
  };

  const handleChangeMateriaux = (name, value) => {
    setMateriaux({ ...materiaux, [name]: value });
  };

  const handleApplyFilter = () => {
    setIsOpen(false);
    const selectedMaterials = Object.keys(materiaux).filter((material) => materiaux[material]);
    axios
      .get('http://airneis.ddns.net:3000/recherche.php', {
        params: {
          min_price: prixMin,
          max_price: prixMax,
          materiaux: selectedMaterials.join(','),
          stock_disponible: stockDisponible ? 1 : 0,
        },
      })
      .then((response) => {
        setDonnees(response.data);
        setResultats(response.data);
      });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <View style={{ marginVertical: 16 }}>
      <View style={{ marginVertical: 8 }}>
        <Text>Prix minimum</Text>
        <TextInput
          style={{ borderWidth: 1, padding: 8, borderRadius: 8 }}
          value={prixMin}
          onChangeText={handleChangePrixMin}
          keyboardType="numeric"
        />
      </View>
      <View style={{ marginVertical: 8 }}>
        <Text>Prix maximum</Text>
        <TextInput
          style={{ borderWidth: 1, padding: 8, borderRadius: 8 }}
          value={prixMax}
          onChangeText={handleChangePrixMax}
          keyboardType="numeric"
        />
      </View>
      <View style={{ marginVertical: 8 }}>
        <Text>Materiaux</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={{
              backgroundColor: materiaux.bois ? 'green' : 'grey',
              padding: 8,
              borderRadius: 8,
              margin: 4,
            }}
            onPress={() => handleChangeMateriaux('bois', !materiaux.bois)}
          >
            <Text style={{ color: 'white' }}>Bois</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: materiaux.acier ? 'green' : 'grey',
              padding: 8,
              borderRadius: 8,
              margin: 4,
            }}
            onPress={() => handleChangeMateriaux('acier', !materiaux.acier)}
          >
            <Text style={{ color: 'white' }}>Acier</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: materiaux.plastique ? 'green' : 'grey',
              padding: 8,
              borderRadius: 8,
              margin: 4,
            }}
            onPress={() => handleChangeMateriaux('plastique', !materiaux.plastique)}
          >
            <Text style={{ color: 'white' }}>Plastique</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: materiaux.verre ? 'green' : 'grey',
              padding: 8,
              borderRadius: 8,
              margin: 4,
            }}
            onPress={() => handleChangeMateriaux('verre', !materiaux.verre)}
          >
            <Text style={{ color: 'white' }}>Verre</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: materiaux.aluminium ? 'green' : 'grey',
              padding: 8,
              borderRadius: 8,
              margin: 4,
            }}
            onPress={() => handleChangeMateriaux('aluminium', !materiaux.aluminium)}
          >
            <Text style={{ color: 'white' }}>Aluminium</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
        <TouchableOpacity
          style={{
            backgroundColor: stockDisponible ? 'green' : 'grey',
            padding: 8,
            borderRadius: 8,
            margin: 4,
          }}
          onPress={() => handleChangeStockDisponible(!stockDisponible)}
        >
          <Text style={{ color: 'white' }}>Stock disponible uniquement</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginVertical: 8 }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#007bff',
            padding: 8,
            borderRadius: 8,
          }}
          onPress={handleApplyFilter}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>Appliquer les filtres</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Filtre;
