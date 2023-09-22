import * as Font from 'expo-font';

export async function loadFonts() {
    await Font.loadAsync({
        'marck': require('./assets/fonts/MarckScript-Regular.ttf'),
      });
  }