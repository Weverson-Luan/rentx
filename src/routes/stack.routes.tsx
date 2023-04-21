import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/home';
import { CarDetails } from '../screens/card-details';
import { Scheduling } from '../screens/scheduling';
import { SchedulingDetails } from '../screens/scheduling-details';
import { SchedulingComplet } from '../screens/scheduling-complete';
import { MyCars } from '../screens/my-cars';
import { CarDTO } from '../dtos/car';
import { SpalshScreen } from '../screens/splash-screen';

export type RootStackParamList = {
  Home: undefined;
  CarDetails: { car: CarDTO };
  Scheduling: { car: CarDTO };
  SchedulingDetails: { car: CarDTO; dates: string[] };
  SchedulingComplet: undefined;
  MyCars: undefined;
  SpalshScreen: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export function StackRoutes() {
  return (
    <Navigator
      initialRouteName="SpalshScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
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
