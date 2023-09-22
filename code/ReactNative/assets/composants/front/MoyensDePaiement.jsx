import React, { useState, useContext, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, Alert } from "react-native";
import { AuthContext } from "../context/authContext";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Connexion from "./Connexion";
import { styles } from "../../../Styles";

const MoyenDePaiement = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const { accountId, isLoggedIn } = useContext(AuthContext);
  const [accountPaiement, setAccountPaiement] = useState([]);
  const [successMessagePaiement, setSuccessMessagePaiement] = useState(null);
  const [selectedPaiementId, setSelectedPaiementId] = useState("");
  const [editModePaiement, setEditModePaiement] = useState(false);

  const nomPaiementRef = useRef();
  const numeroPaiementRef = useRef();
  const datePaiementRef = useRef();
  const cvvPaiementRef = useRef();

  const handleChangePaiement = (value) => {
    setSelectedPaiementId(value);
  };

  const [formDataPaiement, setFormDataPaiement] = useState({
    nom: "",
    numero: "",
    date: "",
    cvv: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountRes = await axios.get(
          `http://airneis.ddns.net:3000/info_paiement.php?accountId=${accountId}`
        );
        if (accountRes.data.status === "success") {
          setAccountPaiement(accountRes.data.accountPaiement);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, [accountId, accountPaiement]);
  

  const handleInputChangePaiement = (name, value) => {
    setFormDataPaiement({ ...formDataPaiement, [name]: value });
  };

  const handleEditPaiement = (paiement) => {
    setEditModePaiement(true);
    setSelectedPaiementId(paiement.id);
  
    setFormDataPaiement({
      nom: paiement.nom,
      numero: paiement.numero,
      date: paiement.date,
      cvv: paiement.cvv,
    });
  };
  

  const handleAjoutPaiement = () => {
    setEditModePaiement(true);
    setSelectedPaiementId(null);

    setFormDataPaiement({
      nom: "",
      numero: "",
      date: "",
      cvv: "",
    });
  };

  const handleCancelPaiement = () => {
    setEditModePaiement(false);
  };

  const handleSubmitPaiement = async () => {
    try {
      const response = await axios.post(
        "http://airneis.ddns.net:3000/update_info_paiement.php",
        {
          accountId,
          id: selectedPaiementId ?? null,
          nom: formDataPaiement.nom,
          numero: formDataPaiement.numero,
          date: formDataPaiement.date,
          cvv: formDataPaiement.cvv,
        }
      );
      if (response.data.status === "success") {
        setEditModePaiement(false);
        const updatedAccountPaiement = accountPaiement.map((paiement) => {
          if (paiement.id === selectedPaiementId) {
            return {
              ...paiement,
              nom: formDataPaiement.nom,
              numero: formDataPaiement.numero,
              date: formDataPaiement.date,
              cvv: formDataPaiement.cvv,
            };
          }
          return paiement;
        });
        setAccountPaiement(updatedAccountPaiement);
        setSuccessMessagePaiement(
          "Les informations de paiement ont été mises à jour avec succès."
        );
        setTimeout(() => {
          setSuccessMessagePaiement(null);
        }, 2000);
        navigation.navigate("moyenDePaiement");
      } else {
      }
    } catch (error) {}
  };

  const handleConfirmDeletePaiement = (paiement) => {
    Alert.alert(
      "Confirmation",
      "Êtes-vous sûr de vouloir supprimer ce moyen de paiement ?",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Confirmer",
          onPress: () => handleDeletePaiement(paiement),
        },
      ],
      { cancelable: true }
    );
  };

  const handleDeletePaiement = async (paiement) => {
  try {
    await axios.delete(
      `http://airneis.ddns.net:3000/delete_info_paiement.php?id=${paiement.id}`
    );
    const updatedAccountPaiement = accountPaiement.filter(
      (item) => item.id !== paiement.id
    );
    setAccountPaiement(updatedAccountPaiement);
    setSelectedPaiementId("");
  } catch (error) {}
};


  if (loading) {
    return (
      <View>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <>
    <ScrollView>
      {isLoggedIn ? (
        <>
          <View style={styles.containerCgu}>
            <View style={styles.sidebarParam}>
              <Text style={styles.titleCgu}>
                Récapitulatif de votre compte
              </Text>
              <View>
                <Text style={styles.titleCgu2}>Moyen de Paiement</Text>
                {successMessagePaiement && (
                  <View style={styles.errorsuccess}>
                    <Text style={styles.stockEpuiseButtonText}>{successMessagePaiement}</Text>
                  </View>
                )}
                <View style={styles.dividerbtn}/>


                {editModePaiement && (
                  <View style={styles.priceContainer}>
                    <View style={styles.formGroup}>
                      <Text style={styles.label}>Nom sur la carte: </Text>
                      <TextInput
                        ref={nomPaiementRef}
                        style={styles.input}
                        placeholder="Nom sur la carte"
                        value={formDataPaiement.nom}
                        onChangeText={(value) =>
                          handleInputChangePaiement("nom", value)
                        }
                        required
                      />
                    </View>
                    <View style={styles.formGroup}>
                      <Text style={styles.label}>Numéro carte</Text>
                      <TextInput
                        ref={numeroPaiementRef}
                        style={styles.input}
                        placeholder="Numéro de carte"
                        value={formDataPaiement.numero}
                        onChangeText={(value) =>
                          handleInputChangePaiement("numero", value)
                        }
                        required
                      />
                    </View>
                    <View style={styles.formGroup}>
                      <Text style={styles.label}>Date d'expiration: </Text>
                      <TextInput
                        ref={datePaiementRef}
                        style={styles.input}
                        placeholder="Date d'expiration (MM/YY)"
                        value={formDataPaiement.date}
                        onChangeText={(value) =>
                          handleInputChangePaiement("date", value)
                        }
                        required
                      />
                    </View>
                    <View style={styles.formGroup}>
                      <Text style={styles.label}>CVV: </Text>
                      <TextInput
                        ref={cvvPaiementRef}
                        style={styles.input}
                        placeholder="CVV"
                        value={formDataPaiement.cvv}
                        onChangeText={(value) =>
                          handleInputChangePaiement("cvv", value)
                        }
                        required
                      />
                    </View>
                    <View style={styles.buttonGroup}>
                      <TouchableOpacity
                        onPress={handleSubmitPaiement}
                        style={styles.ajouterButton}
                      >
                        <Text style={styles.ajouterButtonText}>Enregistrer 💾</Text>
                      </TouchableOpacity>
                      <View style={styles.dividerbtn}/>
                      <TouchableOpacity
                        onPress={handleCancelPaiement}
                        style={styles.ajouterButton}
                      >
                        <Text style={styles.ajouterButtonText}>Annuler ❌</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}

                {!editModePaiement && (
                  <View>
                    <View>
                    {accountPaiement.length > 0 ? (
                      <FlatList
                        data={accountPaiement}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                          <View key={item.id}>
                            <View>
                              <View style={styles.priceContainer}>
                              <Text style={styles.titleParam}>
                                Nom sur la carte:{" "}
                                <Text>{item.nom}</Text>
                              </Text>
                              <Text style={styles.titleParam}>
                                Numéro de carte:{" "}
                                <Text>{"**** **** **** " + item.numero.slice(-4)}</Text>
                              </Text>
                              <Text style={styles.titleParam}>
                                Date d'expiration:{" "}
                                <Text>{item.date}</Text>
                              </Text>
                              <Text style={styles.titleParam}>
                                CVV:{" "}
                                <Text>{"***"}</Text>
                              </Text>
                              <View style={styles.buttonGroup}>
                                <TouchableOpacity
                                  onPress={() => handleEditPaiement(item)}
                                  style={styles.ajouterButton}
                                >
                                  <Text style={styles.ajouterButtonText}>
                                    Modifier ⚙️
                                  </Text>
                                </TouchableOpacity>
                                <View style={styles.dividerbtn}/>
                                <TouchableOpacity
                                  onPress={() => handleConfirmDeletePaiement(item)}
                                  style={styles.ajouterButton}
                                >
                                  <Text style={styles.ajouterButtonText}>
                                    Supprimer ❌
                                  </Text>
                                </TouchableOpacity>
                                </View>
                              </View>
                              <View style={styles.buttonGroup}/>
                            </View>
                          </View>
                        )}
                      />
                    ) : (
                      <View>
                        <Text>Aucun moyen de paiement enregistré</Text>
                      </View>
                    )}

                    </View>
                    <TouchableOpacity
                      onPress={handleAjoutPaiement}
                      style={styles.btn}
                    >
                      <Text style={styles.ajouterButtonText}>
                        Ajouter un moyen de paiement ➕
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                <View style={styles.buttonGroup} />
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={styles.btnRetour}
                >
                  <Text style={styles.ajouterButtonText}>Retour</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </>
      ) : (
        <Connexion />
      )}
      </ScrollView>
    </>
  );
};

export default MoyenDePaiement;
