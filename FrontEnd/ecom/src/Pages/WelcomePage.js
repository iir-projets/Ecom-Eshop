

import { getUserData } from "../util/auth";


function WelcomePage(){

    const userData = getUserData();
    return(
        <>
        <h1>Welcome: {userData.id}</h1>
        </>
    )
}

export default WelcomePage;