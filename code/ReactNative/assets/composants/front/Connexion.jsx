import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import { styles } from '../../../Styles';

const Connexion = () => {
  const navigation = useNavigation();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const authContext = useContext(AuthContext);


  const handleForgotPassword = () => {
    const url = 'http://airneis.fr/forgot-password';
  
    Linking.openURL(url).catch((err) => console.error('Erreur lors de l\'ouverture de l\'URL :', err));
  };

  const handleSubmit = async () => {
    const formType = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        'http://airneis.ddns.net:3000/connexion.php',
        formType
      );

      if (response.data.status === 'success') {
        const message = response.data.message;
        setMessage(message);
        setTimeout(() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          } else {
            navigation.navigate('accueil');
          }
        }, 1000);
        const { accountId, accountInfo } = response.data;
        authContext.login(accountId, accountInfo);

      } else if (response.data.status === 'error') {
        const error = response.data.error;
        setError(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.containerCgu}>
      <View style={styles.priceContainer}>
        <View>
          <View style={styles.log}>
            <Text style={styles.loginTitre}>Connexion</Text>
          </View>
        </View>
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
        <View style={styles.formGroup}>
          <Text>Email:</Text>
          <TextInput
            style={styles.input}
            value={email}
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
            onChangeText={setPassword}
            placeholder="Mot de passe"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View style={styles.formGroup}>
          <TouchableOpacity onPress={handleSubmit} style={styles.ajouterButton}>
            <Text style={styles.ajouterButtonText}>Se connecter</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.dividerbtn}/>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('inscription')}
            style={styles.compteNav}
          >
            <Text style={styles.compteNav}>Créer un compte ?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleForgotPassword} style={styles.compteNav}>
            <Text style={styles.compteNav}>Mot de passe oublié ?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Connexion;
