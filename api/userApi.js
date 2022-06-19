/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import {
    HOST
} from "./constatnts";

export const login = async ( loginData ) => fetch( `${HOST}/usr/login`, {
    method: 'POST',
    body: JSON.stringify( loginData ),
    headers: {
        'Content-Type': 'application/json',
    },
} );

export const register = async ( registerData ) => fetch( `${HOST}/usr/register`, {
    method: 'POST',
    body: JSON.stringify( registerData ),
    headers: {
        'Content-Type': 'application/json',
    },
} );