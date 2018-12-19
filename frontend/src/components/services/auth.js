import axios from 'axios'

    const host='http://localhost:3000/auth'

//production host = 'https://teamus-sabasmendivil.firebaseapp.com/auth

//signup
export const signup = (user) => {
    return axios.post(host+'/signup', user)
        .then(r=>r.data)
        .catch(e=>e.response)
}

//login
export const login = (user) =>{
    return axios.post(host+'/login', user,{withCredentials:true})
        .then(r=>r.data)
        .catch(e=>e.response)
}

//logout
export const logout =() =>{
    return axios.get(host+'/logout', {withCredentials:true})
    .then(r=>r.data)
    .catch(e=>e.response)

}

//profile

export const getProfile = () =>{
    return axios.get(host+'/profile',{withCredentials:true})
        .then(r=>r.data)
        .catch(e=>{
            console.log(e)
            return e.response
            
        })
} 


//staff signup
export const esignup = (user) => {
    return axios.post(host+'/esignup', user)
        .then(r=>r.data)
        .catch(e=>e.response)
}

//login
export const elogin = (user) =>{
    return axios.post(host+'/elogin', user,{withCredentials:true})
        .then(r=>r.data)
        .catch(e=>e.response)
}

//logout
export const elogout =() =>{
    return axios.get(host+'/elogout', {withCredentials:true})
    .then(r=>r.data)
    .catch(e=>e.response)

}

//profile

export const getEProfile = () =>{
    return axios.get(host+'/eprofile',{withCredentials:true})
        .then(r=>r.data)
        .catch(e=>{
            console.log(e)
            return e.response
            
        })
} 