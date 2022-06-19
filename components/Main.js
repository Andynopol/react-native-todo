/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView, Platform, AsyncStorage } from 'react-native';
import { getTodos, remove, store } from '../api/todosApi';
import Loader from './Loader';
import Task from './Task';

const Main = () => {
    const [ task, setTask ] = useState();
    const [ taskItems, setTaskItems ] = useState( [] );
    const [ loading, setLoading ] = useState( false );

    const handleAddTask = async () => {
        Keyboard.dismiss();
        try
        {
            setLoading( true );
            const { user } = JSON.parse( await AsyncStorage.getItem( 'auth' ) );
            const response = await ( await store( { _id: user._id, content: task } ) ).json();
            const { todos } = response;
            if ( !todos )
            {
                throw new Error( response.message );
            }
            setTaskItems( [ ...todos ] );
            setTask( null );
        } catch ( err )
        {
            alert( err.message );
            setLoading( false );
        }
        finally
        {
            setLoading( false );
        }

    };

    const completeTask = async ( todoId ) => {
        try
        {
            setLoading( true );
            const { user } = JSON.parse( await AsyncStorage.getItem( 'auth' ) );
            const response = await ( await remove( { _id: user._id, todoId } ) ).json();
            const { todos } = response;
            if ( !todos ) throw new Error( "Delete task fail" );
            setTaskItems( [ ...todos ] );

        } catch ( err )
        {
            alert( err.message );
        }
        finally
        {
            setLoading( false );
        }
    };

    const loadSavedTasks = async () => {
        const auth = JSON.parse( await AsyncStorage.getItem( 'auth' ) );
        const { user } = auth;
        try
        {
            const response = await ( await getTodos( user._id ) ).json();
            const { todos } = response;
            if ( !todos ) throw new Error( response.message );
            user.todos = todos;
            setTaskItems( [ ...user.todos ] );
            AsyncStorage.setItem( 'auth', auth );
        } catch ( err )
        {
            alert( err.message );
        }
    };

    const updateAuth = async () => {
        const auth = JSON.parse( await AsyncStorage.getItem( 'auth' ) );
        auth.user.todos = [ ...taskItems ];
        await AsyncStorage.setItem( 'auth', JSON.parse( { ...auth } ) );
    };

    useEffect( () => {
        loadSavedTasks();
    }, [] );

    useEffect( () => {
        updateAuth();
    }, [ taskItems ] );

    return (
        <View style={styles.container}>
            <Loader loading={loading} />
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                }}
                keyboardShouldPersistTaps="handled"
            >

                {/* Today's Tasks */}
                <View style={styles.tasksWrapper}>
                    <Text style={styles.sectionTitle}>Tasks</Text>
                    <View style={styles.items}>
                        {/* This is where the tasks will go! */}
                        {
                            taskItems.map( ( item, index ) => {
                                return (
                                    <TouchableOpacity key={item.todoId} onPress={() => completeTask( item.todoId )}>
                                        <Task text={item.content} />
                                    </TouchableOpacity>
                                );
                            } )
                        }
                    </View>
                </View>

            </ScrollView>

            {/* Write a task */}
            {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.writeTaskWrapper}
            >
                <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask( text )} />
                <TouchableOpacity onPress={() => handleAddTask()}>
                    <View style={styles.addWrapper}>
                        <Text style={styles.addText}>+</Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>

        </View>
    );
};

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
    },
    tasksWrapper: {
        paddingTop: 80,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    items: {
        marginTop: 30,
    },
    writeTaskWrapper: {
        position: 'absolute',
        bottom: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        width: 250,
    },
    addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,
    },
    addText: {},
} );

export default Main;
