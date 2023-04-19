import React, { useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text,Image, View,TextInput , TouchableOpacity,value,KeyboardAvoidingView} from 'react-native';
import  Mapbox from '@rnmapbox/maps';
import * as Location from 'expo-location';

Mapbox.setAccessToken('sk.eyJ1IjoibXVzdGFmYTA0IiwiYSI6ImNsZ2twNXppYjFpMHYzaHQxanYzZDl5cDcifQ.CLJU8SfheuofR4Qzos-zHA');

export default function App() {

  const [getLocation, setLocation] = useState([]); 
  const [latitude,setLatitude]=useState(33)
  const [longitude,setLongitude]=useState(73)
  const [centerLat,setCenterLat]=useState(30)
  const [centerLong,setCenterLong]=useState(73)
  const [zoomLevel,setzoomLevel]=useState(16)

  const zoomIn = () => {
    setzoomLevel(zoomLevel+1)
  }
  const zoomOut = () => {
    setzoomLevel(zoomLevel-1)
  }

  const updateLatLong = () => {
    if(latitude!=null && longitude!=null){
      setzoomLevel(16)
      if((longitude<= 180) && (longitude>= -180) && (latitude<= 90) && (latitude>= -90)) {
        console.log('updating center lat '+ latitude)
        console.log('updating center long '+ longitude)
        updateCenter()
      }
      else {
        if(latitude>90 || latitude < -90){
          alert('invalid latitude')
        }
        if(longitude>180 || latitude<-180){
          alert('invalid longitude')
        }
      }
    }
    else {
      alert('enter values')
    }
  }

  const updateCenter = () => {
    setCenterLat(latitude)
    setCenterLong(longitude)
  }

  const resetCenter = ([a,b]) => {
    setCenterLat(a)
    setCenterLong(b)
    setLatitude(a)
    setLongitude(b)
  }
  
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
      setLocation([location.coords.latitude, location.coords.longitude]);
      setCenterLat(location.coords.latitude)
      setCenterLong(location.coords.longitude)
      setLatitude(location.coords.latitude)
      setLongitude(location.coords.longitude)
      console.log(getLocation)

    })();
  }, []);

  return (
    <KeyboardAvoidingView style={styles.page}>
      <StatusBar style={false}/>
      <View style={{width: '90%', position: 'absolute', top: 50,}}>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            
            <View style={{borderRadius: 12, backgroundColor: 'white', borderBottomColor: 'red', width: '25%'}}>
              <TextInput
                style={{paddingLeft: 10,height: 50, color: 'black'}}
                placeholder='latitude' placeholderTextColor='gray'
                onChangeText={text => {
                  const value = parseFloat(text);
                  if (!isNaN(value)) {
                    setLatitude(value);
                  }
                }}
              >
              <Text>{latitude}</Text>
              </TextInput>
            </View>

            <View style={{borderRadius: 12, backgroundColor: 'white', borderBottomColor: 'red', width: '25%',marginLeft: 10,}}>
              <TextInput 
                style={{paddingLeft: 10, height: 50,borderRadius: 12, backgroundColor: 'white', borderBottomColor: 'red', color: 'black'}}
                placeholder='longitude' placeholderTextColor='gray'
                onChangeText={text => {
                  const value = parseFloat(text);
                  if (!isNaN(value)) {
                    setLongitude(value);
                  }
                }}
              >
                <Text>{longitude}</Text>
              </TextInput>
            </View>
            
            <TouchableOpacity 
              style={{
                backgroundColor: '#1b1c1e',
                borderRadius: 10,
                marginLeft: 10,
                padding: 8,
                alignItems: 'center',
                borderColor: 'green',
                borderWidth: 4 }}
              onPress={() => updateLatLong(longitude,latitude)}
            >
              <Text style={{color: 'white',fontSize: 15}}>
                Search
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={{
                backgroundColor: '#1b1c1e',
                borderRadius: 10,
                marginLeft: 10,
                padding: 8,
                alignItems: 'center',
                borderColor: 'green',
                borderWidth: 4 }}
                onPress={() => resetCenter(getLocation)}
            >
              <Text style={{color: 'white',fontSize: 15}}>
                Reset
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: 'white'}}> latitude</Text>
            <Text style={{color: 'white', marginLeft: 40}}>  longitude</Text>
            <TouchableOpacity 
              style={{
                backgroundColor: '#1b1c1e',
                borderRadius: 10,
                marginLeft: 35,
                padding: 8,
                alignItems: 'center',
                borderColor: 'green',
                borderWidth: 4 }}
              onPress={zoomIn}
            >
              <Text style={{color: 'white',fontSize: 20}}>
                +
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={{
                backgroundColor: '#1b1c1e',
                borderRadius: 10,
                marginLeft: 10,
                padding: 8,
                alignItems: 'center',
                borderColor: 'green',
                borderWidth: 4 }}
              onPress={zoomOut}
            >
              <Text style={{color: 'white',fontSize: 20}}>
                -
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={{
                backgroundColor: '#1b1c1e',
                borderRadius: 10,
                marginLeft: 10,
                padding: 8,
                alignItems: 'center',
                borderColor: 'green',
                borderWidth: 4 }}
              onPress={()=>setzoomLevel(0)}
            >
              <Text style={{color: 'white',fontSize: 15}}>
                world
              </Text>
            </TouchableOpacity>

          </View>
      </View>

      <View style={styles.mapcontainer}>
        <Mapbox.MapView 
          style={styles.map}
          styleURL={'mapbox://styles/mustafa04/clgkgr94r008901qtcri1e6m3'}>
          <Mapbox.Camera 
            zoomLevel={zoomLevel}
            centerCoordinate={[centerLong,centerLat]}  />
          <Mapbox.PointAnnotation coordinate={[centerLong,centerLat]} />

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
    flex: 1,
    bottom: 0,
    height: '80%',
    width: '100%',
  },
  map: {
    flex: 1,
  }
});
