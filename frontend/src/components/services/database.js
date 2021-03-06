import axios from 'axios'

    const host='https://mt-lab-backend.herokuapp.com'
//UPDATOR 3.0
export const API_Update = (updates) =>{
    return axios.post(host+'/update/changes',updates ,{withCredentials:true})
        .then(r=>{
            return r.data
        })
        .catch(e=>e.response)
  }

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
    return axios.get(host+`/update/verify/aSDAha4jfasddda`)
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
//fixed match