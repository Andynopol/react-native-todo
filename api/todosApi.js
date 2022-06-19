/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import {
    HOST,
} from "./constatnts";

export const store = async ( data ) => {
    return await fetch( `${HOST}/todos/store`, {
        method: 'POST',
        body: JSON.stringify(
            data
        ),
        headers: {
            'Content-Type': 'application/json',
        },
    } );
};

export const remove = async ( data ) => await fetch( `${HOST}/todos/remove`, {
    method: 'DELETE',
    body: JSON.stringify( data ),
    headers: {
        'Content-Type': 'application/json',
    },
} );