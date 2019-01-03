import axios from 'axios'

    const host='http://localhost:3000'

//search for
export const searchFor = (user) =>{
  return axios.post(host+'/searchfor', user,{withCredentials:true})
      .then(r=>r.data)
      .catch(e=>e.response)
}

export const createStaff = (newStaff,user) =>{
    return axios.post(host+'/update/createstaff', {...newStaff,...user},{withCredentials:true})
        .then(r=>r.data)
        .catch(e=>e.response)
  }
