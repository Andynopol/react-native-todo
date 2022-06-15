/* eslint-disable prettier/prettier */
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import Section from './components/Section';

const App = () => {

  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <View
          style={{
            backgroundColor: Colors.white,
          }}>
          <Section title="Cacat">
            Ceva
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
