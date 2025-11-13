import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Login(){
  const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const nav = useNavigate();
  const submit = async (e:any)=>{ e.preventDefault(); try{ const res = await axios.post(import.meta.env.VITE_API_URL + '/auth/login',{ email, password }, { withCredentials: true }); localStorage.setItem('access', res.data.access); alert('Logged in'); nav('/jobs'); }catch(e:any){ alert(e.response?.data?.error || e.message); } };
  return (<form onSubmit={submit} className="max-w-md"><h2 className="text-xl font-semibold mb-4">Login</h2><input className="w-full p-2 mb-2" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email"/><input className="w-full p-2 mb-2" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password"/><button className="bg-blue-600 text-white px-4 py-2 rounded">Login</button></form>);
}
