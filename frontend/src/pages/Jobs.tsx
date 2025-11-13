import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function Jobs(){
  const [jobs, setJobs] = useState<any[]>([]);
  useEffect(()=>{ axios.get(import.meta.env.VITE_API_URL + '/jobs').then(r => setJobs(r.data.data || [])).catch(()=>{}); },[]);
  return (<div><h2 className='text-2xl font-semibold mb-4'>Jobs</h2><div className='grid grid-cols-1 gap-4'>{jobs.map((j:any)=> <div key={j._id} className='p-4 bg-white rounded shadow'><Link to={'/jobs/'+j._id} className='font-medium'>{j.title}</Link><div className='text-sm text-gray-600'>{j.company}</div></div>)}</div></div>);
}
