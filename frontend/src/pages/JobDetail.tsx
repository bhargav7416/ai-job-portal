import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
export default function JobDetail(){
  const { id } = useParams();
  const [job, setJob] = useState<any>(null);
  useEffect(()=>{ if(!id) return; axios.get(import.meta.env.VITE_API_URL + '/jobs/' + id).then(r => setJob(r.data)).catch(()=>{}); },[id]);
  if(!job) return <div>Loading...</div>;
  return (<div><h2 className='text-2xl font-bold'>{job.title}</h2><p className='mt-2'>{job.description}</p><p className='mt-2 text-sm text-gray-600'>Company: {job.company}</p></div>);
}
