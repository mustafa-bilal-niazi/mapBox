import React, { useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput , value,KeyboardAvoidingView} from 'react-native';
import  Mapbox from '@rnmapbox/maps';
import * as Location from 'expo-location';

Mapbox.setAccessToken('sk.eyJ1IjoibXVzdGFmYTA0IiwiYSI6ImNsZ2twNXppYjFpMHYzaHQxanYzZDl5cDcifQ.CLJU8SfheuofR4Qzos-zHA');

export default function App() {

  const [getLocation, setLocation] = useState([]); 
  const [latitude,setLatitude]=useState(73)
  const [longitude,setLongitude]=useState(33)
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        console.log('Permission to access location was granted');
      }  else {
        console.log('Permission to access location was denied');
      }
  
      let location = await Location.getCurrentPositionAsync({});
      console.log('getting the location')
      setLatitude(location.coords.latitude)
      setLongitude(location.coords.longitude)

      setLocation(location);
      console.log(location)

    })();
  }, []);

  return (
    
    <KeyboardAvoidingView style={styles.page}>
      <StatusBar style={false}/>
      <View style={{width: '80%', position: 'absolute', top: 50,}}>

          <TextInput 
          style={{paddingLeft: 10,height: 50,borderRadius: 12, backgroundColor: 'white', borderBottomColor: 'red', color: 'black'}}
          placeholder='Search' placeholderTextColor='gray'
          />
        </View>

      <View style={styles.mapcontainer}>

          <Mapbox.MapView 
            style={styles.map}
            styleURL={'mapbox://styles/mustafa04/clgkgr94r008901qtcri1e6m3'}>
            <Mapbox.Camera zoomLevel={17}  centerCoordinate={[longitude,latitude]}  />
            </Mapbox.MapView>

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapcontainer: {
    position: 'absolute',
    flex: 0.8,
    bottom: 0,
    height: '85%',
    width: '100%',
  },
  map: {
    flex: 1
  }
});
