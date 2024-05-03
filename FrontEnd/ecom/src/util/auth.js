import { redirect } from "react-router-dom";

export function getAuthToken(){
    const token = localStorage.getItem('token');
    return token;
}

export function getUserRole(){
    const userRole = localStorage.getItem('userRole');
    
     console.log("User Role:" + userRole);
    return userRole;
}

export function getUserId(){
    const userID = localStorage.getItem('userId');
    
    console.log("userId: "+userID);

    return userID;
}

export function getUserData(){
    const userData = localStorage.getItem('userData');

    const uData = JSON.parse(userData)

    return uData;
}

export function tokenLoder(){
    return getAuthToken();
}

export function checkAuthLoader(){

    const token = getAuthToken();

    if(!token){
        return redirect('/login');
    }

    return null;

}