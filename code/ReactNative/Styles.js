import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  titreContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  titreText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  containerCategorie: {
    flex: 1,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  produitContainer: {
    width: '48%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  produitImage: {
    width: '100%',
    height: 200,
  },
  produitInfo: {
    padding: 10,
    backgroundColor: 'white',
  },
  produitTitre: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  produitPrix: {
    fontSize: 14,
    marginBottom: 5,
  },
  ajouterButtonContainer: {
    marginTop: 10,

  },
  ajouterButton: {
    backgroundColor: '#FBB769',
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  ajouterButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  stockEpuiseButton: {
    backgroundColor: 'red',
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  stockEpuiseButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  containerCgu: {
    flex: 1,
    padding: 20,
  },
  titleCgu: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  titleCgu2: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 30,
  },

  titleParam: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },

  buttonGroup: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 40,
    marginRight: 40,
  },

  divider: {
    marginTop: 80,
  },

  dividerbtn: {
    marginTop: 20,
  },

  headingContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
  },
  heading: {
    marginBottom: 16,
    textAlign: 'center',
  },

  containerRecherche: {
    padding: 16,
    backgroundColor: '#FFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    paddingHorizontal: 8,
  },
  inputRecherche: {
    flex: 1,
    height: 40,
  },
  searchButton: {
    marginLeft: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#007BFF',
    borderRadius: 4,
  },
  searchButtonText: {
    color: '#FFF',
  },
  alertContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  alertText: {
    color: 'red',
  },
  listContainer: {
    paddingBottom: 16,
  },
  card: {
    flex: 0.5,
    marginTop: 16,
    marginRight: 8,
    marginLeft: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 200,
  },
  cardBody: {
    padding: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardPrice: {
    fontSize: 14,
    color: 'blue',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  addButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#007BFF',
    borderRadius: 4,
  },
  disabledButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#D9534F',
    borderRadius: 4,
  },

  errorsuccess: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'green',
    borderRadius: 4,
  },

  buttonTextRecherche: {
    color: '#FFF',
  },

  headingPanier: {
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
    backgroundColor: 'white',
    fontSize: 20,
  },
  containerPanier: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  articleContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  articleHeading: {
    textAlign: 'center',
    marginBottom: 5,
  },
  emptyCartContainer: {
    alignItems: 'center',
  },
  catalogueButton: {
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  catalogueButtonText: {
    color: '#fff',
  },
  table: {
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  productDetails: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButton: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#B3896D',
    borderRadius: 10,
  },
  quantityText: {
    marginHorizontal: 10,
  },
  stockErrorText: {
    color: 'red',
  },
  productPrice: {
    flex: 1,
    textAlign: 'center',
  },
  deleteButton: {
    padding: 5,
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'red',
  },
  priceContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f8f9fa',
  },
  priceHeading: {
    textAlign: 'center',
    marginBottom: 10,
  },
  totalPrice: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  totalPriceText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  orderButton: {
    marginTop: 10,
    paddingVertical: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  orderButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  Contact: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  contactTitre: {
    marginTop: 20,
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },
  catContact: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20,
  },
  contactLog: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17,
    marginBottom: 10,
  },
  iconContact: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  contactCard: {
    flex: 1,
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20,
  },
  cardHeader: {
    backgroundColor: '#eaeaea',
    padding: 10,
  },
  formGroup: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
  },
  textarea: {
    height: 100,
  },
  buttonText: {
    textAlign: 'center',
    backgroundColor: 'blue',
    color: '#fff',
    padding: 10,
  },
  reponseFormulaire: {
    textAlign: 'center',
    marginTop: 10,
  },
  descriptionContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  titreProduit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titre: {
    flex: 1,
    textAlign: 'left',
    fontSize: 25,
    fontWeight: 'bold',
  },
  prix: {
    flex: 0,
    textAlign: 'right',
    fontSize: 25,
    fontWeight: 'bold',
  },
  descriptionProduit: {
    marginTop: 20,
    fontWeight: 'bold',
  },

  buttonContainer: {
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20,
    fontWeight: 'bold',
  },

  produitsSimilaires: {
    marginTop: 40,
    marginBottom: 20,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },


  background: {
    backgroundColor: 'white',
  },

  loginCard: {
    marginLeft: 20,
    marginRight: 20,
  },

  loginTitre: {
    marginTop: 20,
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },

  compteNav: {
    color: 'blue',
    textAlign: 'center',
    marginBottom: 10,
  },

  textCenter: {
    marginTop: 50,
  },

  boutonConnexion: {
    backgroundColor: 'blue',
    marginTop: 20,
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },



  menuNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    padding: 10,
  },
  menuIcon: {
    width: 30,
    height: 30,
  },
  menu: {
    position: 'absolute',
    top: 50,
    right: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 10,
    zIndex: 1,
  },
  openMenu: {
    display: 'flex',
    backgroundColor: '#2e2b2b',
  },
  menuItem: {
    marginBottom: 10,
  },
  menuLink: {
    fontSize: 22,
    color: 'white',
  },
  link: {
    color: 'blue',
  },
  containerPropos: {
    flex: 1,
    padding: 16,
  },
  centerPropos: {
    alignItems: 'center',
  },
  logoPropos: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  titrePropos: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  btnPropos: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  btnTextPropos: {
    color: 'white',
    fontWeight: 'bold',
  },

  selectContainer: {
    height: 40,
    width: 400,
    marginBottom: 200,
  },
  select: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },

  pageTitle: { 
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },

  subtitle: {
    marginLeft: 100,
    fontSize: 30,
    fontWeight: 'bold',
  },

  catalogButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },

  catalogButtonText: {
    color: 'white',
    fontSize: 16,
  },

  commandeItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#F5F5F5',
  },

  commandeSelected: {
    backgroundColor: 'lightblue',
  },

  boutonCommandes: {
    padding: 10,
  },

  enCours: {
    backgroundColor: 'orange',
  },

  expediee: {
    backgroundColor: 'green',
  },

  annulee: {
    backgroundColor: 'red',
  },

  annulerCommande: {
    backgroundColor: 'red',
    alignItems: 'center',
    padding: 5,
    borderRadius: 3,
    marginTop: 5,
    marginLeft: 40,
    marginRight: 40,
  },

  greenText: {
    color: 'green',
  },

  orangeText: {
    color: 'orange',
  },

  redText: {
    color: 'red',
  },

  commandeDetails: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#FFFFFF',
  },

  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  separator: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 10,
  },

  productImage: {
    width: 75,
    height: 75,
  },

  boldText: {
    fontWeight: 'bold',
  },

  containerBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  btn: {
    backgroundColor: '#B3896D',
    paddingVertical: 8,
    borderRadius: 5,
    padding: 30,
    alignItems: 'center',
  },

  btnRetour: {
    backgroundColor: '#E2C9AF',
    paddingVertical: 8,
    borderRadius: 5,
    padding: 30,
    alignItems: 'center',
  },
});
