import axios from 'axios'

    const host='https://mt-lab-backend.herokuapp.com/auth'
   // const { match: { params } } = this.props;${params.code}`
//signup
export const signup = (user) => {
    return axios.post(host+'/signup', user)
        .then(r=>r.data)
        .catch(e=>e.response)
}

export const API_ResetPass = (user) => {
    return axios.post(host+'/resetpass', user)
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
    localStorage.clear();
    return axios.get(host+'/logout', {withCredentials:true})
    .then(r=>r.data)
    .catch(e=>e.response)

}
export const API_ResetAccess =(email) =>{
    return axios.post(host+'/resetaccess',email)
    .then(r=>r.data)
    .catch(e=>e.response)
}

//profile

export const getProfile = () =>{
    return axios.get(host+'/profile',{withCredentials:true})
        .then(r=>{
            return r.data
        })
        
        .catch(e=>{
            console.log(e)
            return e.response
            
        })
} 

//update profile edit
export const update = (user) =>{
    return axios.post(host+'/profile/edit',user,{withCredentials:true})
        .then(r=>r)
        .catch(e=>e.response)
}
//staff login
export const staffLogin = (user) =>{
    return axios.post(host+'/stafflogin', user,{withCredentials:true})
        .then(r=>r.data)
        .catch(e=>e.response)
}
