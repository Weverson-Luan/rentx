import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/home';
import { CarDetails } from '../screens/card-details';
import { Scheduling } from '../screens/scheduling';
import { SchedulingDetails } from '../screens/scheduling-details';
import { SchedulingComplet } from '../screens/scheduling-complete';
import { MyCars } from '../screens/my-cars';
import { SpalshScreen } from '../screens/splash-screen';

// typings
import { RootStackParamList } from './interface-routes';
import { SignIn } from '../screens/signin';

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export function StackRoutes() {
  return (
    <Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SpalshScreen" component={SpalshScreen} />
      <Screen name="Home" component={Home} />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="SchedulingComplet" component={SchedulingComplet} />
      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  );
}
