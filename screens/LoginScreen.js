import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  SafeAreaView,
  Image,
  Alert,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import firebase from 'firebase';
import db from '../config'

export default class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      emailId: '',
      password: '',
    };
  }

  login = async (email, password) => {
    console.log(this.state)
    if (email && password) {
      try {
        console.log(email)
        const response = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
          console.log("Home")
          this.props.navigation.navigate('Home');
        
      } catch (error) {
        switch (error.code) {
          case 'auth/user-not-found':
            alert("user dosen't exists");
            console.log("doesn't exist");
            break;
          case 'auth/invalid-email':
            alert('incorrect email or password');
            console.log('invaild');
            break;
        }
      }
    } else {
      alert('enter email and password');
    }
  };
  

  render() {
    return (
      <View style={{ backgroundColor: '#003366', flex: 1 }}>
        <KeyboardAvoidingView style={{ alignItems: 'center', marginTop: 20 }}>
          <View style={{ marginTop: 35 }}>
            <Image
              source={require('../assets/logo.jpg')}
              style={{ width: 200, height: 200 }}
            />
          </View>

          <View style={{ marginTop: 35 }}>
            <TextInput
              style={styles.loginBox}
              placeholder="abc@example.com"
              keyboardType="email-address"
              onChangeText={(text) => {
                this.setState({
                  emailId: text,
                });
              }}
            />

            <TextInput
              style={styles.loginBox}
              placeholder="Enter password"
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({
                  password: text,
                });
              }}
            />
          </View>

          <View>
          <TouchableOpacity
          style={{height:30,
          width:90,
          borderWidth:1,
          marginTop:20,
          paddingTop:5,
          borderRadius:40,
          backgroundColor:"#FFBE8C"}}

          onPress={()=>{
            this.login(this.state.emailId,this.state.password)
          }}
          >
          <Text style={{textAlign:"center"}}>Login</Text>
          </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginBox: {
    width: 220,
    height: 40,
    borderWidth: 2,
    fontSize: 15,
    margin: 10,
    borderRadius: 20,
    paddingLeft: 10,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center',
  },
});
