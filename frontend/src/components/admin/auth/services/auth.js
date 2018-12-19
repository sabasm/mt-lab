import axios from 'axios'

    const host='http://localhost:3000/auth'

//production host = 'https://teamus-sabasmendivil.firebaseapp.com/auth
//staff signup
export const signup = (user) => {
    return axios.post(host+'/e/signup', user)
        .then(r=>r.data)
        .catch(e=>e.response)
}

//login
export const login = (user) =>{
    return axios.post(host+'/e/login', user,{withCredentials:true})
        .then(r=>r.data)
        .catch(e=>e.response)
}

//logout
export const logout =() =>{
    return axios.get(host+'/e/logout', {withCredentials:true})
    .then(r=>r.data)
    .catch(e=>e.response)

}

//profile

export const getProfile = () =>{
    return axios.get(host+'/e/profile',{withCredentials:true})
        .then(r=>r.data)
        .catch(e=>{
            console.log(e)
            return e.response
            
        })
} 