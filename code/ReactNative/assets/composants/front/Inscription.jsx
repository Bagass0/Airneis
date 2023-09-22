import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { styles } from '../../../Styles';

const Inscription = () => {
  const navigation = useNavigation();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    const formType = {
      nom: nom,
      email: email,
      password: password,
      password2: confirmPassword,
    };

    try {
      const response = await axios.post(
        'http://airneis.ddns.net:3000/inscription.php',
        formType,
      );

      if (response.data.status === 'success') {
        const message = response.data.message;
        setMessage(message);
        setTimeout(() => {
          navigation.navigate('connexion'); 
        }, 3000);
      } else if (response.data.status === 'error') {
        const error = response.data.error;
        setError(error);
      }
  } catch (error) {
      console.log(error);
    }
  };

  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View style={styles.containerCgu}>
      <View style={styles.priceContainer}>
        <View>
          <View style={styles.log}>
            <Text style={styles.loginTitre}>Inscription</Text>
          </View>
        </View>
        <View>
          <View>
            {message && 
              <View style={styles.errorsuccess}>
                <Text style={styles.stockEpuiseButtonText}>{message}</Text>
              </View>
            }
          
            {error &&
            <View style={styles.disabledButton}>
              <Text style={styles.stockEpuiseButtonText}>{error}</Text>
            </View>
            }
          </View>
        </View>
        <View style={styles.formGroup}>
          <Text>Nom:</Text>
          <TextInput
            style={styles.input}
            value={nom}
            id='nom'
            onChangeText={setNom}
            placeholder="Nom"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View style={styles.formGroup}>
          <Text>Email:</Text>
          <TextInput
            style={styles.input}
            value={email}
            id='email'
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View style={styles.formGroup}>
          <Text>Mot de passe:</Text>
          <TextInput
            style={styles.input}
            value={password}
            id='password'
            onChangeText={setPassword}
            placeholder="Mot de passe"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View style={styles.formGroup}>
          <Text>Confirmer mot de passe:</Text>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            id='confirmPassword'
            onChangeText={setConfirmPassword}
            placeholder="Confirmer mot de passe"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View style={styles.formGroup}>
          <TouchableOpacity style={styles.ajouterButton} onPress={handleSubmit}>
            <Text style={styles.ajouterButtonText}>S'inscrire</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.dividerbtn}/>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('connexion')}>
            <Text style={styles.compteNav}>Vous avez déjà un compte ?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Inscription;
