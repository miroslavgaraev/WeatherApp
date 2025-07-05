
import React, { useEffect } from 'react';

import {
  Alert,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import MainScreen from './components/MainScreen';
import { useAppDispatch } from './functions/common';
import { checkPermission } from './functions/permission';





function App(): React.JSX.Element {
  const {height} = Dimensions.get('window')
  const dispatch = useAppDispatch()
  
  
  
  useEffect(() => {
    const result = async () => {
      const coords = await checkPermission()
    }
    result()
  }, [])
  return (
    <View style={{height}}>
     <MainScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  
});

export default App;
