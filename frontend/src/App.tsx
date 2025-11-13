import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import Login from './pages/Login';
import Register from './pages/Register';
export default function App(){ return (<div className='min-h-screen bg-gray-50 text-gray-900'><header className='bg-white shadow p-4'><div className='container mx-auto flex justify-between'><Link to='/' className='font-bold'>AI Job Portal</Link><nav><Link to='/jobs' className='mr-4'>Jobs</Link><Link to='/login' className='mr-4'>Login</Link><Link to='/register'>Register</Link></nav></div></header><main className='container mx-auto p-6'><Routes><Route path='/' element={<Home/>}/><Route path='/jobs' element={<Jobs/>}/><Route path='/jobs/:id' element={<JobDetail/>}/><Route path='/login' element={<Login/>}/><Route path='/register' element={<Register/>}/></Routes></main></div>); }
