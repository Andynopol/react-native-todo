/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable curly */
import React, { useState, useEffect } from 'react';
import {
    ActivityIndicator,
    View,
    StyleSheet,
    Image,
    AsyncStorage,
} from 'react-native';

import decode from 'jwt-decode';

const SplashScreen = ( { navigation } ) => {
    //State for ActivityIndicator animation
    const [ animating, setAnimating ] = useState( true );

    useEffect( () => {
        setTimeout( () => {
            setAnimating( false );
            AsyncStorage.getItem( 'auth' ).then( async ( value ) => {
                try
                {
                    const auth = JSON.parse( value );
                    if ( !auth ) return navigation.replace( 'Auth' );
                    const { user, token } = auth;
                    if ( !token || !user ) return navigation.replace( 'Auth' );
                    const decodedToken = decode( token );
                    if ( decodedToken.exp * 1000 > new Date().getTime() )
                    {
                        return navigation.replace( 'Home' );

                    }
                    AsyncStorage.removeItem( 'auth' );
                    return navigation.replace( 'Auth' );
                } catch ( err )
                {
                    console.log( err );
                }

            }
            );
        }, 3000 );
    }, [] );

    return (
        <View style={styles.container}>
            <Image
                source={require( '../assets/Logo.png' )}
                style={{ width: '90%', resizeMode: 'contain', margin: 30 }}
            />
            <ActivityIndicator
                animating={animating}
                color="#FFFFFF"
                size="large"
                style={styles.activityIndicator}
            />
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#307ecc',
    },
    activityIndicator: {
        alignItems: 'center',
        height: 80,
    },
} );