import axiosSecure from "./url";


// save user database
export const saveUser=async user=>{
  const currentUser={
    userName:user?.displayName,
    email: user?.email,
    role: 'user',
    status: 'verified'
  }
  const {data}=await axiosSecure.put(`/users/${user?.email}`, currentUser)
return data;
}

// get token 
export const getToken=async email=>{
    const {data}=await axiosSecure.post(`/jwt`, email)
    console.log('token receive form server --------------->' ,data)
    return data;
}

// clear token
export const clearToken=async ()=>{
  const {data}=await axiosSecure.get('/logout')
  return data;
}