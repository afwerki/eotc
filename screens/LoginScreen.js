import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,Image, TouchableOpacity, Dimensions } from 'react-native';
import Svg,{ Circle } from 'react-native-svg';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {width, height} = Dimensions.get('window');

  const handleLogin = () => {
    // Implement login logic here
    navigation.replace('Main');
  };

  return (
    <View style={styles.container}>
      <Svg height={height * 0.3} width={width} style = {styles.svg}>
      <Circle cx={width * 0.3} cy={-height * 0.1} r={height * 0.3} fill="#82d7f7"/>
      <Circle cx={width * 0.5} cy={height * 0.05} r={height*0.2}  fill="#82d7f7" opacity="0.5"/>
      </Svg>


      <View style ={styles.content}>
        
      <Text style={styles.welcomeText}>Welcome back</Text>
       <View style={styles.imagePlaceholder}>
     {/*<Image source = {require("../assets/eotc.jpeg")}/>*/}
       </View>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor='#999'
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor='#999'
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Frogot paswrod</Text>
      </TouchableOpacity>


      <Button title="Login" onPress={handleLogin} style={styles.signinButton}/>
      <TouchableOpacity onPress={() => navigation.navigate('Registration')} style={styles.signuplink}>
        <Text style={styles.signinText}>Don't have an account? Register here</Text>
      </TouchableOpacity>
    </View>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  svg:{
    position:'absolute',
    top:0,
    left:0,
  },
  content:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal:20,

  },
  welcomeText:{
    fontSize:24,
    fontWeight:'bold',
    marginBottom:20,
    color:'#333'

  },
  imagePlaceholder:{
    width:100,
    height:100,
    backgroundColor:'#e0e0e0',
    borderRadius:50,
    marginBottom:20,
  },
  forgotPassword:{
    color:'#82d7f7',
    marginBottom:30,
  },
  signinButton:{
    width:'100%',
    height:50,
    backgroundColor:'#82d7f7',
    borderRadius:25,
    justifyContent:'center',
    alignItems:'center',
    marginBottom:20,

  },
  signinText:{
    color:'#fff',
    fontSize:18,
  },
  signuplink:{
    color:'#000',
    fontWeight:'bold'

  },
  input: {
    width: '100%',
    height:50,
    backgroundColor:'#fff',
    borderRadius:25,
    paddingHorizontal:20,
    marginBottom:15,
    borderWidth:1,
    borderColor:'#ddd'
  },
});

export default LoginScreen;
