import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { useAppDispatch } from '../../../store';
import { setSignIn } from '../../slice/authSlice';
import { trpc } from '@zart/react/trpc';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {LoginStackParamList} from '../RootStackPrams';

type loginScreenProp = StackNavigationProp<LoginStackParamList, 'Login'>;


export function LoginScreen() {
  const dispatch = useAppDispatch()
  const navigation = useNavigation<loginScreenProp>()

  const [ username, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const { refetch, data, isLoading } = trpc.useQuery(['credentials.login', { username, password }], {enabled: false});

  if (data?.valueOf() && !isLoading) {
    dispatch(setSignIn({
      isLoggedIn: true,
      username,
    }))
  }

  function handleLogin() {
    if ( username === '' || password === '' ) return;
    refetch()
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity onPress={()=> {navigation.navigate('ForgotPassword')}}>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=> {navigation.navigate('Signup')}}>
        <Text style={styles.forgot_button}>Sign up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn} onPress={()=>{ handleLogin() }}>
        <Text>LOGIN</Text>
      </TouchableOpacity>
    </View>
    );
  }



  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },

    image: {
      marginBottom: 40,
    },

    inputView: {
      backgroundColor: "#FFC0CB",
      borderRadius: 30,
      width: "70%",
      height: 45,
      marginBottom: 20,

      alignItems: "center",
    },

    TextInput: {
      height: 50,
      flex: 1,
      padding: 10,
      marginLeft: 20,
    },

    forgot_button: {
      height: 30,
      marginBottom: 30,
    },

    loginBtn: {
      width: "80%",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
      backgroundColor: "#FF1493",
    },
  });