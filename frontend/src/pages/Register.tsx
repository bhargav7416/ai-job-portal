import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Register(){
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const nav = useNavigate();
  const submit = async (e:any)=>{ e.preventDefault(); try{ const res = await axios.post(import.meta.env.VITE_API_URL + '/auth/register',{ name, email, password }); alert('Registered'); nav('/login'); }catch(e:any){ alert(e.response?.data?.error || e.message); } };
  return (<form onSubmit={submit} className="max-w-md"><h2 className="text-xl font-semibold mb-4">Register</h2><input className="w-full p-2 mb-2" value={name} onChange={e=>setName(e.target.value)} placeholder="Name"/><input className="w-full p-2 mb-2" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email"/><input className="w-full p-2 mb-2" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password"/><button className="bg-green-600 text-white px-4 py-2 rounded">Register</button></form>);
}
