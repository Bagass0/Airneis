import { AuthContext } from "../context/authContext";
import React, { useContext, useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Connexion from "./Connexion";
import axios from "axios";
import { styles } from '../../../Styles';

function MesParametres() {
  const { isLoggedIn, accountId, accountInfo } = useContext(AuthContext);
  const navigation = useNavigation();
  const [isEditMode, setIsEditMode] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const motDePasseRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleEditPassword = () => {
    setIsEditMode(true);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
  };

  const handleAddresses = () => {
    setIsEditMode(false);
    navigation.navigate("adresse");
  };

  const handleSubmitPassword = async () => {

    if (newPassword !== confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas");
    } else if (
      oldPassword === "" ||
      newPassword === "" ||
      confirmPassword === ""
    ) {
      setPasswordError("Veuillez remplir tous les champs");
    } else {
      try {
        const response = await axios.post(
          "http://airneis.ddns.net:3000/edit-password.php",
          {
            accountId,
            isLoggedIn: isLoggedIn,
            oldPassword,
            newPassword,
          }
        );
        if (response.data.status === "success") {
          alert("Mot de passe modifié avec succès");
          setIsEditMode(false);
          setPasswordError("");
        } else {
          setPasswordError(response.data.message);
        }
      } catch (error) {
      }
    }
  };

  const handleChangeOldPassword = (value) => {
    setOldPassword(value);
  };

  const handleChangeNewPassword = (value) => {
    setNewPassword(value);
  };

  const handleChangeConfirmPassword = (value) => {
    setConfirmPassword(value);
  };

  return (
    <ScrollView>
      <View style={styles.containerCgu}>
      {isLoggedIn ? (
        <View style={styles.sidebarParam}>
          <Text style={styles.titleCgu}>Récapitulatif de votre compte</Text>
          {isEditMode ? (
            <View style={styles.priceContainer}>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Ancien mot de passe:</Text>
                <View style={styles.passwordInput}>
                  <TextInput
                    ref={motDePasseRef}
                    secureTextEntry={!showPassword}
                    style={styles.input}
                    value={oldPassword}
                    onChangeText={handleChangeOldPassword}
                    required
                  />
                </View>
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Nouveau mot de passe:</Text>
                <View style={styles.passwordInput}>
                  <TextInput
                    secureTextEntry={!showPassword}
                    style={styles.input}
                    ref={motDePasseRef}
                    value={newPassword}
                    onChangeText={handleChangeNewPassword}
                    required
                  />
                </View>
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Répéter le nouveau mot de passe:</Text>
                <View style={styles.passwordInput}>
                  <TextInput
                    secureTextEntry={!showPassword}
                    style={styles.input}
                    ref={motDePasseRef}
                    value={confirmPassword}
                    onChangeText={handleChangeConfirmPassword}
                    required
                  />
                </View>
              </View>
              {passwordError && 
                <View style={styles.errorsuccess}>
                  <Text style={styles.errorMessage}>{passwordError}</Text>
                </View>
              }
              <View style={styles.buttonGroup}>
                <TouchableOpacity style={styles.ajouterButton} onPress={handleSubmitPassword}>
                  <Text style={styles.ajouterButtonText}>Valider ✔️</Text>
                </TouchableOpacity>
                <View style={styles.dividerbtn}/>
                <TouchableOpacity style={styles.ajouterButton} onPress={() => setIsEditMode(false)}>
                  <Text style={styles.ajouterButtonText}>Annuler ❌</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <>
            <View style={styles.priceContainer}>
              <View style={styles.formGroup}>
                <Text style={styles.titleParam}>Nom:</Text>
                <Text style={styles.formControl}>{accountInfo ? accountInfo.nom : "Nom inconnu"}</Text>
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.titleParam}>E-mail:</Text>
                <Text style={styles.formControl}>{accountInfo ? accountInfo.email : "Email inconnu"}</Text>
              </View>
              <View style={styles.button}>
                <Text style={styles.titleParam}>Mot de passe:</Text>
                <Text style={styles.formControl}>••••••••</Text>
                <View style={styles.buttonGroup}>
                  <TouchableOpacity style={styles.ajouterButton} onPress={handleEditPassword}>
                    <Text style={styles.ajouterButtonText}>Modifier le mot de passe</Text>
                  </TouchableOpacity>
                </View>
              </View>
              </View>
              <View style={styles.divider} />
              <View style={styles.buttonGroup}>
                <TouchableOpacity style={styles.ajouterButton} onPress={() => navigation.navigate('moyenDePaiement')}>
                  <Text style={styles.ajouterButtonText}>Mes moyens de paiement</Text>
                </TouchableOpacity>
                <View style={styles.dividerbtn}/>
                <TouchableOpacity style={styles.ajouterButton} onPress={handleAddresses}>
                  <Text style={styles.ajouterButtonText}>Mes adresses</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
        ) : (
          <Connexion />
        )}
      </View>
    </ScrollView>
  );
}

export default MesParametres;
