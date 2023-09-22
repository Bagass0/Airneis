import React, { useContext, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { dataContext } from "./context/dataContext";
import MenuNavigation from "./front/MenuNavigation";

const Menu = () => {
  const { nombreProduits } = useContext(dataContext);
  const navigation = useNavigation();
  const [statusBarHeight, setStatusBarHeight] = useState(0);

  useEffect(() => {
    setStatusBarHeight(StatusBar.currentHeight);
  }, []);

  return (
    <View style={{ backgroundColor: '#4e4d4d'}}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 5,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("accueil")}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Image
            source={require('../../assets/icon.png')}
            style={{ width: 40, height: 40, marginLeft: 20, marginRight: 16, marginBottom:5, marginTop:5 }}
          />
          <Text style={{ fontFamily: 'marck', color: "white", fontSize: 25 }}> Àirneis</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("recherche")}
            style={{ marginRight: 10 }}
          >
            <Image
              source={{ uri: "http://airneis.ddns.net:3000/img/icon_recherche.png" }}
              style={{ marginTop: 10, width: 30, height: 30 }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("panier")}
            style={{ position: "relative" }}
          >
            <Image
              source={{ uri: "http://airneis.ddns.net:3000/img/icon_panier.png" }}
              style={{ marginTop: 10, width: 30, height: 30 }}
            />
            {nombreProduits > 0 && (
              <View
                style={{
                  position: "absolute",
                  right: -8,
                  backgroundColor: "red",
                  borderRadius: 10,
                  width: 20,
                  height: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: 12 }}>{nombreProduits}</Text>
              </View>
            )}
          </TouchableOpacity>
          <View>
                
                <MenuNavigation/>

          </View>
        </View>
      </View>
    </View>
  );
};

export default Menu;
