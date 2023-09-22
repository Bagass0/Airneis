import React, { useState, useRef, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, TouchableWithoutFeedback, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/authContext';
import { styles } from '../../../Styles';

const MenuNavigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigation = useNavigation();
  const { isLoggedIn, logout } = useContext(AuthContext);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleMenuItemPress = (menuItem) => {
    setMenuOpen(false);
    if (menuItem === 'Connexion') {
      navigation.navigate('connexion');
    }
    if (menuItem === 'Inscription') {
      navigation.navigate('inscription');
    }
    if (menuItem === 'CGU') {
      navigation.navigate('cgu');
    }
    if (menuItem === 'MentionLegale') {
      navigation.navigate('mentionlegale');
    }
    if (menuItem === 'Contact') {
      navigation.navigate('contact');
    }
    if (menuItem === 'Propos') {
      navigation.navigate('propos');
    }
    if (menuItem === 'MesParam') {
      navigation.navigate('mesParam');
    }
    if (menuItem === 'MesCommande') {
      navigation.navigate('mesCommande');
    }
  };

  useEffect(() => {
    const subscription = navigation.addListener('blur', () => {
      setMenuOpen(false);
    });

    return () => {
      subscription();
    };
  }, [menuOpen]);

  return (
    <TouchableWithoutFeedback>
      <View style={styles.menuNavigation}>
        <TouchableOpacity style={styles.iconContainer} onPress={toggleMenu}>
          <Image
            style={styles.menuIcon}
            source={{ uri: 'http://airneis.ddns.net:3000/img/icon_menu.png' }}
          />
        </TouchableOpacity>
        {menuOpen && (
          <View style={[styles.menu, menuOpen ? styles.openMenu : null]} ref={menuRef}>
            {isLoggedIn ? (
              <>
                <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuItemPress('MesParam')}>
                  <Text style={styles.menuLink}>Mes paramètres</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuItemPress('MesCommande')}>
                  <Text style={styles.menuLink}>Mes commandes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={logout}>
                  <Text style={styles.menuLink}>Déconnexion</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuItemPress('Connexion')}>
                  <Text style={styles.menuLink}>Se connecter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuItemPress('Inscription')}>
                  <Text style={styles.menuLink}>S'inscrire</Text>
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuItemPress('CGU')}>
              <Text style={styles.menuLink}>CGU</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuItemPress('MentionLegale')}>
              <Text style={styles.menuLink}>Mentions légales</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuItemPress('Contact')}>
              <Text style={styles.menuLink}>Contact</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuItemPress('Propos')}>
              <Text style={styles.menuLink}>À Propos d'Àirneis</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MenuNavigation;
