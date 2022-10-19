import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import {auth} from '../firebase'
import { useNavigation } from '@react-navigation/native'
import { TextInput } from 'react-native-paper'

const LoginScreen = () => {

    const  [email, setEmail] = useState('')
    const  [password, setPassword] = useState('')

    const [isSecureEntry,setIsSecureEntry]=useState(true)
    const [isValidEmail,setIsValidEmail]=useState(true)
    const [isValidPassword,setIsValidPassword]=useState(true)

    const navigation=useNavigation()

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user=>{
            if(user){
                navigation.replace("Home")
            }
        })

        return unsubscribe
    }, [])

    const handleSignUp = () => {
        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if(reg.test(email)===true&&password.length>5){
            setIsValidEmail(true);
            setIsValidPassword(true);
        auth
        .createUserWithEmailAndPassword(email,password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Registered with: ',user.email);
        })
        .catch(error=> alert(error.message))
        }
        else{
            if(reg.test(email)===false) setIsValidEmail(false);
            if(password.length<6) setIsValidPassword(false);
        }
    }

    const handleLogin = () => {
        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if(reg.test(email)===true&&password.length>5){
            setIsValidEmail(true);
            setIsValidPassword(true);
            auth
        .signInWithEmailAndPassword(email,password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Logged in with: ', user.email);
        })
        .catch(error=> alert(error.message))
        }
        else{
            if(reg.test(email)===false) setIsValidEmail(false);
            if(password.length<6) setIsValidPassword(false);
            if(reg.test(email)===true) setIsValidEmail(true);
            if(password.length>5) setIsValidPassword(true);
        }
        
    }


    return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
        <View style={styles.InputContainer}>
            {!isValidEmail?<Text style={{width:'70%', color:'red', fontSize:16}}>Недопустимый Email</Text>:''}
            <TextInput
                keyboardType='email-address'
                mode='outlined'
                placeholder='Email'
                value={email}
                onChangeText={text =>setEmail(text)}
                style={styles.input}
                activeOutlineColor={isValidEmail?'#0782F9':'red'}
                outlineColor={isValidEmail?'black':'red'}
                //label={!isValid?'Введите корректный Email':''}
            />
            {!isValidPassword?<Text style={{width:'100%', color:'red',paddingTop:10, fontSize:16}}>Минимальная длина пароля 6 символов</Text>:''}
            <TextInput
                keyboardType='password'
                mode='outlined'
                placeholder='Password'
                value={password}
                onChangeText={text =>setPassword(text)}
                style={styles.input}
                secureTextEntry={isSecureEntry}
                right={<TextInput.Icon style={{height:20}} name={isSecureEntry ? "eye" : "eye-off"} onPress={() => setIsSecureEntry(!isSecureEntry)} />}
                activeOutlineColor={isValidPassword?'#0782F9':'red'}
                outlineColor={isValidPassword?'black':'red'}
            />
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity
            onPress={handleLogin}
            style={styles.button}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={handleSignUp}
            style={[styles.button, styles.buttonOutline]}
            >
                <Text style={styles.buttonOutlineText}>Register</Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
InputContainer:{
    width:'75%',
},
input:{
    backgroundColor:'white',
    paddingHorizontal:15,
    paddingVertical:0,
    borderRadius: 10,
    marginTop:5,
    height:50,
},
buttonContainer:{
    width:'60%',
    justifyContent:'center',
    alignItems:'center',
    marginTop:40,
},
button:{
    backgroundColor: '#0782F9',
    width:'100%',
    padding:15,
    borderRadius: 10,
    alignItems:'center',
},
buttonOutline:{
    backgroundColor:'white',
    marginTop:5,
    borderColor:'#0782F9',
    borderWidth:2,
},
buttonText:{
    color:'white',
    fontWeight:'700',
    fontSize:16,
},
buttonOutlineText:{
    color:'#0782F9',
    fontWeight:'700',
    fontSize:16,
},
})