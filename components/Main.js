/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView, Platform, AsyncStorage } from 'react-native';
import { store } from '../api/todosApi';
import Loader from './Loader';
import Task from './Task';

const Main = () => {
    const [ task, setTask ] = useState();
    const [ taskItems, setTaskItems ] = useState( [] );
    const [ loader, setLoader ] = useState( false );

    const handleAddTask = async () => {
        Keyboard.dismiss();
        try
        {
            setLoader( true );
            const { user } = JSON.parse( await AsyncStorage.getItem( 'auth' ) );
            const response = await ( await store( { _id: user._id, content: task } ) ).json();
            setTaskItems( [ ...taskItems, task ] );
            setTask( null );
        } catch ( err )
        {
            console.log( err );
            setLoader( false );
        }
        finally
        {
            setLoader( false );
        }

    };

    const completeTask = ( index ) => {
        let itemsCopy = [ ...taskItems ];
        itemsCopy.splice( index, 1 );
        setTaskItems( itemsCopy );
    };

    const loadSavedTasks = async () => {
        const auth = JSON.parse( await AsyncStorage.getItem( 'auth' ) );
        const { user } = auth;
        setTaskItems( [ ...user.todos ] );
    };

    useEffect( () => {
        loadSavedTasks();
    }, [] );

    return (
        <View style={styles.container}>
            <Loader loading={loader} />
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
                                    <TouchableOpacity key={item.todoId} onPress={() => completeTask( index )}>
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
