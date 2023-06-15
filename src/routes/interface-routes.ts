/**
 * IMPORTS
 */

import { CarDTO } from "src/dtos/car";

 type RootStackParamList = {
  Home: undefined;
  CarDetails: { car: CarDTO };
  Scheduling: { car: CarDTO };
  SchedulingDetails: { car: CarDTO; dates: string[] };
  SchedulingComplet: undefined;
  MyCars: undefined;
  SpalshScreen: undefined;
  SignIn: undefined;
};


/**
 * EXPORTS
 */
export type {RootStackParamList}; 