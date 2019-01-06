import axios from 'axios'

    const host='http://localhost:3000'

//search for (only for staff use)
export const searchFor = (user) =>{
  return axios.post(host+'/searchfor', user,{withCredentials:true})
      .then(r=>r.data)
      .catch(e=>e.response)
}
//Look for users on the database (Only for signup and loggin proccess)
export const API_lookFor = (lookingFor) =>{
    return axios.post(host+'/lookfor', lookingFor)
        .then(r=> {
            return r.data
        })
        
        .catch(e=>console.log(e))
  }

  export const API_Verifier = (code) =>{
    return axios.get(host+'/update/verify/'+code)
        .then(r=> {
            return r.data
        })
        
        .catch(e=>{
            console.log(e)})
  }

export const createStaff = (newStaff,user) =>{
    return axios.post(host+'/update/createstaff', {...newStaff,...user},{withCredentials:true})
        .then(r=>r.data)
        .catch(e=>e.response)
  }
