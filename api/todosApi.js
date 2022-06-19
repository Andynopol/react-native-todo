/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import {
    HOST,
} from "./constatnts";

export const store = async ( data ) => fetch( `${ HOST }/todos/store`, {
    method: 'POST',
    body: JSON.stringify(
        data
    ),
    headers: {
        'Content-Type': 'application/json',
    },
} );

export const remove = async ( data ) => fetch( `${ HOST }/todos/remove`, {
    method: 'DELETE',
    body: JSON.stringify( data ),
    headers: {
        'Content-Type': 'application/json',
    },
} );


export const getTodos = async ( _id ) => fetch( `${ HOST }/todos/${ _id }` );