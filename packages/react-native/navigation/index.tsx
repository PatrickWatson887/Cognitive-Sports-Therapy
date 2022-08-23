/* eslint-disable react/display-name */
import React from 'react';
import { LifestyleScreen } from './screens/lifestyle';
import { PhysicalScreen } from './screens/physical';
import { MentalScreen } from './screens/mind';
import { BreathScreen } from './screens/breath';
import { ExploreScreen } from './screens/explore';
import { ProgrammesScreen } from './screens/programmes';
import { ProfileScreen } from './screens/profile';
import { LoginScreen } from './screens/login';
import { SignupScreen } from './screens/signup';
import { ForgotPasswordScreen } from './screens/forgotPassword';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import {
  selectIsLoggedIn,
  selectUserName,
  selectUserUuid,
  setRole,
} from '@zart/react-native/navigation/slice/authSlice';
import { DiariesDetails } from './screens/lifestyle/details';
import { BreathDetails } from './screens/breath/details';
import { BodyDetails } from './screens/physical/details';
import { MindDetails } from './screens/mind/details';
import { ProgrammeDetails } from './screens/programmes/details';
import { useAppSelector, useAppDispatch } from '../store';
import { trpc } from '@zart/react/trpc';

function LifestyleStackScreen() {
  const LifestyleStack = createStackNavigator();

  return (
    <LifestyleStack.Navigator>
      <LifestyleStack.Screen name="Lifestyle" component={LifestyleScreen} />
      <LifestyleStack.Screen name="DiariesDetails" component={DiariesDetails} />
    </LifestyleStack.Navigator>
  );
}

function MindStackScreen() {
  const MindStack = createStackNavigator();

  return (
    <MindStack.Navigator>
      <MindStack.Screen name="Mind" component={MentalScreen} />
      <MindStack.Screen name="MindDetails" component={MindDetails} />
    </MindStack.Navigator>
  );
}

function BodyStackScreen() {
  const BodyStack = createStackNavigator();

  return (
    <BodyStack.Navigator>
      <BodyStack.Screen name="Body" component={PhysicalScreen} />
      <BodyStack.Screen name="BodyDetails" component={BodyDetails} />
    </BodyStack.Navigator>
  );
}

function BreathStackScreen() {
  const BreathStack = createStackNavigator();

  return (
    <BreathStack.Navigator>
      <BreathStack.Screen name="Breath" component={BreathScreen} />
      <BreathStack.Screen name="BreathDetails" component={BreathDetails} />
    </BreathStack.Navigator>
  );
}

function ProgrammeStackScreen() {
  const ProgrammesStack = createStackNavigator();

  return (
    <ProgrammesStack.Navigator>
      <ProgrammesStack.Screen name="Programmes" component={ProgrammesScreen} />
      <ProgrammesStack.Screen
        name="ProgrammeDetails"
        component={ProgrammeDetails}
      />
    </ProgrammesStack.Navigator>
  );
}

export function AppWithNavigation() {
  const Tab = createBottomTabNavigator();
  const dispatch = useAppDispatch();

  const user = trpc.useQuery(['users.byUuid', useAppSelector(selectUserUuid)]);

  const LoginStack = createStackNavigator();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const username = useAppSelector(selectUserName);

  if (user.data) {
    dispatch(setRole(user.data.role.title));
  }
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarItemStyle: {
              display:
                route.name === 'Explore' || route.name === 'Profile'
                  ? 'none'
                  : 'flex',
            },
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Lifestyle') {
                iconName = focused ? 'heart' : 'heart-outline';
              } else if (route.name === 'Programmes') {
                iconName = focused ? 'clipboard' : 'clipboard-outline';
              } else if (route.name === 'Body') {
                iconName = focused ? 'body' : 'body-outline';
              } else if (route.name === 'Mind') {
                iconName = focused ? 'book' : 'book-outline';
              } else if (route.name === 'Breath') {
                iconName = focused ? 'headset' : 'headset-outline';
              } else if (route.name === 'Sleep') {
                iconName = focused ? 'bed' : 'bed-outline';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen
            name="Lifestyle"
            component={LifestyleStackScreen}
            options={({ navigation }) => ({
              headerTitle: username + "'s Lifestyle",
              headerRight: () => (
                <Ionicons
                  onPress={() => navigation.navigate('Explore')}
                  name="search-outline"
                  color="gray"
                  size={32}
                  style={{ paddingRight: 16 }}
                />
              ),
              headerLeft: () => (
                <Ionicons
                  onPress={() => navigation.navigate('Profile')}
                  name="person-outline"
                  color="gray"
                  size={32}
                  style={{ paddingLeft: 16 }}
                />
              ),
            })}
          />
          <Tab.Screen
            name="Mind"
            component={MindStackScreen}
            options={({ navigation }) => ({
              headerTitle: username + "'s Mind",

              headerRight: () => (
                <Ionicons
                  onPress={() => navigation.navigate('Explore')}
                  name="search-outline"
                  color="gray"
                  size={32}
                  style={{ paddingRight: 16 }}
                />
              ),
              headerLeft: () => (
                <Ionicons
                  onPress={() => navigation.navigate('Profile')}
                  name="person-outline"
                  color="gray"
                  size={32}
                  style={{ paddingLeft: 16 }}
                />
              ),
            })}
          />
          <Tab.Screen
            name="Body"
            component={BodyStackScreen}
            options={({ navigation }) => ({
              headerTitle: username + "'s Body",

              headerRight: () => (
                <Ionicons
                  onPress={() => navigation.navigate('Explore')}
                  name="search-outline"
                  color="gray"
                  size={32}
                  style={{ paddingRight: 16 }}
                />
              ),
              headerLeft: () => (
                <Ionicons
                  onPress={() => navigation.navigate('Profile')}
                  name="person-outline"
                  color="gray"
                  size={32}
                  style={{ paddingLeft: 16 }}
                />
              ),
            })}
          />
          <Tab.Screen
            name="Breath"
            component={BreathStackScreen}
            options={({ navigation }) => ({
              headerTitle: username + "'s Breath",
              headerRight: () => (
                <Ionicons
                  onPress={() => navigation.navigate('Explore')}
                  name="search-outline"
                  color="gray"
                  size={32}
                  style={{ paddingRight: 16 }}
                />
              ),
              headerLeft: () => (
                <Ionicons
                  onPress={() => navigation.navigate('Profile')}
                  name="person-outline"
                  color="gray"
                  size={32}
                  style={{ paddingLeft: 16 }}
                />
              ),
            })}
          />
          {user.data?.role.title === 'premium' ? (
            <Tab.Screen
              name="Programmes"
              component={ProgrammeStackScreen}
              options={({ navigation }) => ({
                headerRight: () => (
                  <Ionicons
                    onPress={() => navigation.navigate('Explore')}
                    name="search-outline"
                    color="gray"
                    size={32}
                    style={{ paddingRight: 16 }}
                  />
                ),
                headerLeft: () => (
                  <Ionicons
                    onPress={() => navigation.navigate('Profile')}
                    name="person-outline"
                    color="gray"
                    size={32}
                    style={{ paddingLeft: 16 }}
                  />
                ),
              })}
            />
          ) : null}
          <Tab.Screen
            name="Explore"
            component={ExploreScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <Ionicons
                  onPress={() => navigation.navigate('Explore')}
                  name="search-outline"
                  color="tomato"
                  size={32}
                  style={{ paddingRight: 16 }}
                />
              ),
              headerLeft: () => (
                <Ionicons
                  onPress={() => navigation.navigate('Profile')}
                  name="person-outline"
                  color="gray"
                  size={32}
                  style={{ paddingLeft: 16 }}
                />
              ),
            })}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <Ionicons
                  onPress={() => navigation.navigate('Explore')}
                  name="search-outline"
                  color="gray"
                  size={32}
                  style={{ paddingRight: 16 }}
                />
              ),
              headerLeft: () => (
                <Ionicons
                  onPress={() => navigation.navigate('Profile')}
                  name="person-outline"
                  color="tomato"
                  size={32}
                  style={{ paddingLeft: 16 }}
                />
              ),
            })}
          />
        </Tab.Navigator>
      ) : (
        <LoginStack.Navigator>
          <LoginStack.Screen name="Login" component={LoginScreen} />
          <LoginStack.Screen name="Signup" component={SignupScreen} />
          <LoginStack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
        </LoginStack.Navigator>
      )}
    </NavigationContainer>
  );
}
