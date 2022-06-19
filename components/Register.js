/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */
import React, { useState } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    Keyboard,
    TouchableOpacity,
    ScrollView,
    AsyncStorage,
} from 'react-native';

import Loader from './Loader';
import { register } from '../api/userApi';

const RegisterScreen = ( props ) => {
    const [ firstName, setFirstName ] = useState( '' );
    const [ lastName, setLastName ] = useState( '' );
    const [ email, setEmail ] = useState( '' );
    const [ password, setPassword ] = useState( '' );
    const [ confirmPassword, setConfirmPassword ] = useState( '' );
    const [ loading, setLoading ] = useState( false );
    const [ errortext, setErrortext ] = useState( '' );

    const handleSubmitButton = async () => {
        setErrortext( '' );
        if ( !firstName )
        {
            alert( 'Please fill your First Name' );
            return;
        }
        if ( !lastName )
        {
            alert( 'Please fill your Last Name' );
            return;
        }
        if ( !email )
        {
            alert( 'Please fill your email' );
            return;
        }
        if ( !password )
        {
            alert( 'Please fill your Password' );
            return;
        }
        if ( confirmPassword !== password )
        {
            alert( 'Passwords don \'t match' );
            return;
        }
        //Show Loader
        setLoading( true );

        try
        {
            const response = await ( await register( { firstName, lastName, email, password, confirmPassword } ) ).json();
            const { status } = response;
            if ( !status || status !== "OK" ) throw new Error( response.message );
            AsyncStorage.removeItem( 'auth' );
            AsyncStorage.setItem( 'email', email );
            AsyncStorage.setItem( 'password', password );
            props.navigation.navigate( 'Splash' );
        } catch ( err )
        {
            // alert( err.message );
        } finally
        {
            setLoading( false );
        }
    };
    return (
        <View style={{ flex: 1, backgroundColor: '#307ecc' }}>
            <Loader loading={loading} />
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={require( '../assets/Logo.png' )}
                        style={{
                            width: '50%',
                            height: 100,
                            resizeMode: 'contain',
                            margin: 30,
                        }}
                    />
                </View>
                <KeyboardAvoidingView enabled>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={( value ) => setFirstName( value )}
                            underlineColorAndroid="#f000"
                            placeholder="First Name"
                            placeholderTextColor="#8b9cb5"
                            autoCapitalize="sentences"
                            returnKeyType="next"
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={( value ) => setLastName( value )}
                            underlineColorAndroid="#f000"
                            placeholder="Last Name"
                            placeholderTextColor="#8b9cb5"
                            keyboardType="sentences"
                            returnKeyType="next"
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={( value ) => setEmail( value )}
                            underlineColorAndroid="#f000"
                            placeholder="Email"
                            placeholderTextColor="#8b9cb5"
                            keyboardType="email-address"
                            returnKeyType="next"
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={( value ) =>
                                setPassword( value )
                            }
                            underlineColorAndroid="#f000"
                            placeholder="Password"
                            placeholderTextColor="#8b9cb5"
                            autoCapitalize="sentences"
                            secureTextEntry={true}
                            returnKeyType="next"
                            onSubmitEditing={Keyboard.dismiss}
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={( value ) =>
                                setConfirmPassword( value )
                            }
                            underlineColorAndroid="#f000"
                            placeholder="Confirm Password"
                            placeholderTextColor="#8b9cb5"
                            returnKeyType="next"
                            secureTextEntry={true}
                            blurOnSubmit={false}
                        />
                    </View>
                    {errortext != '' ? (
                        <Text style={styles.errorTextStyle}>
                            {errortext}
                        </Text>
                    ) : null}
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={handleSubmitButton}>
                        <Text style={styles.buttonTextStyle}>REGISTER</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
};
export default RegisterScreen;

const styles = StyleSheet.create( {
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    buttonStyle: {
        backgroundColor: '#7DE24E',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 20,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        color: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dadae8',
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    successTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },
} );