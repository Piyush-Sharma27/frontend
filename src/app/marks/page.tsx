'use client';

import { useEffect, useState } from "react";
import axios from "axios";

type StudentMarks = {
  _id: string;
  subject: string;
  marks: number;
  student: {
    _id: string;
    name: string;
    rollnumber: number;
  };
};



export default function StudentMarks() {

  const [students, setStudents] = useState<StudentMarks[]>([]);


  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("http://localhost:8002/api/subjects");
            // console.log(res.data.response); 
            setStudents(res.data.response);

      } catch (err) {
        console.error("Error fetching student marks:", err);
      }
    };
    fetchStudents();
  }, []);


  return (
    <main className="flex justify-center items-start min-h-screen p-8 bg-gray-50">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Student List</h1>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Roll Number</th>
              <th className="border border-gray-300 px-4 py-2">Subject</th>
              <th className="border border-gray-300 px-4 py-2">Marks</th>
            </tr>
          </thead>
          <tbody>

      {students.map((s)=>(
         <tr key={s._id} className="border border-gray-300 px-4 py-2" >
      <td className="border-r border-gray-300 px-4 py-2">{s.student.name }</td> 
      <td className="border-r border-gray-300 px-4 py-2">{s.student.rollnumber}</td>

        
      <td className="border-r border-gray-300 px-4 py-2">{s.subject}</td>
      <td className="border-r border-gray-300 px-4 py-2" >{s.marks}</td>
    </tr>
      ))} 
       
          </tbody>
        </table>
      </div>
    </main>
  );
}
