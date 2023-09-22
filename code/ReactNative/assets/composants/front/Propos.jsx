import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../../Styles';

const Propos = () => {
  const navigation = useNavigation();

  const exploreCollection = () => {
    navigation.navigate('recherche');
  };

  return (
    <ScrollView>
        <View style={styles.containerPropos}>
            <View style={styles.centerPropos}>
                <Image
                style={styles.logoPropos}
                source={require('../../../assets/icon.png')}
                />
                <Text style={styles.titrePropos}>Àirneis</Text>
            </View>

            <Text>Bienvenue sur Airneis, votre destination en ligne pour trouver les meubles parfaits pour transformer votre espace de vie. Chez Airneis, nous croyons que chaque maison mérite d'être belle, confortable et fonctionnelle, et c'est pourquoi nous nous efforçons de vous offrir une vaste sélection de meubles de qualité supérieure.</Text>
            <Text>{'\n'}Notre passion pour le design d'intérieur et notre engagement envers la satisfaction du client sont au cœur de tout ce que nous faisons. Nous comprenons que votre maison est un reflet de votre personnalité et de votre style de vie, c'est pourquoi nous mettons un point d'honneur à proposer des meubles qui allient esthétique, durabilité et fonctionnalité.</Text>
            <Text>{'\n'}Chez Airneis, nous collaborons avec des designers talentueux et des fabricants réputés pour vous offrir des meubles à la fois élégants et durables. Chaque pièce est sélectionnée avec soin, en veillant à ce qu'elle réponde aux normes les plus élevées de qualité et de finition. Nous proposons une large gamme de styles, des designs contemporains aux classiques intemporels, pour vous aider à créer l'ambiance parfaite dans votre maison.</Text>
            <Text>{'\n'}Nous comprenons également l'importance de la commodité lorsqu'il s'agit d'acheter des meubles en ligne. C'est pourquoi nous nous efforçons de rendre votre expérience d'achat aussi simple et agréable que possible. Notre site convivial vous permet de parcourir notre collection, de filtrer les produits en fonction de vos préférences et de passer commande en quelques clics seulement. Nous nous engageons à vous offrir un service client exceptionnel tout au long du processus, depuis la sélection des meubles jusqu'à la livraison à votre porte.</Text>
            <Text>{'\n'}Nous sommes fiers de notre engagement envers la durabilité et l'éthique. Nous travaillons avec des partenaires qui partagent nos valeurs, en privilégiant les matériaux respectueux de l'environnement et les pratiques de fabrication responsables. Nous nous efforçons de minimiser notre empreinte écologique et de contribuer à la préservation de notre planète pour les générations futures.</Text>
            <Text>{'\n'}Chez Airneis, nous croyons en la transformation de votre maison en un espace qui vous ressemble et où vous vous sentez vraiment chez vous. Nous espérons que notre sélection de meubles inspirants et notre engagement envers votre satisfaction vous aideront à créer un intérieur qui vous apporte joie, confort et beauté.</Text>
            <Text>{'\n'}Explorez notre collection en ligne dès aujourd'hui et laissez-vous séduire par l'univers des meubles Airneis.</Text>

            <View style={styles.centerPropos}>
                <TouchableOpacity style={styles.btnPropos} onPress={exploreCollection}>
                <Text style={styles.btnTextPropos}>Explorez notre collection</Text>
                </TouchableOpacity>
            </View>
        </View>
    </ScrollView>
  );
};

export default Propos;
