import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button } from 'react-native';


function ActivitiesScreen({ navigation }) {
  return (
    <View style={styles.container}>
          <Text>Activities Screen!</Text>
          <StatusBar style="auto" />

          <Button
            onPress={() => navigation.navigate('Resort - Royal Valley')}
            title="Go to Resort - Royal Valley"
          />

          <Button
            onPress={() => navigation.navigate('Mustang Mountains')}
            title="Go to Mustang Mountains"
          />

          <Button
            onPress={() => navigation.navigate('Ski - Alpine Heights')}
            title="Go to Ski - Alpine Heights"
          />

          <Button
            onPress={() => navigation.navigate('Sky Diving - Alpine Heights')}
            title="Go to Sky Diving - Alpine Heights"
          />

 
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ActivitiesScreen;