
'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
// import type { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'My  user form',
// }

import axios from "axios";



export default function Home() {

  const [studentName, setStudentName] = useState('');
  const [rollNumber, setRollNuber] = useState('');
  const router = useRouter();
  const [message, setMessage] = useState<string>("");
  

  
  async function handleUserCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // console.log("in")

    try {
      await axios.post('http://localhost:8002/api/students/create', {
        name: studentName,
        rollnumber: Number(rollNumber),
      });


      setStudentName('');
      setRollNuber('');

      setMessage("Student saved successfully")
      setTimeout(() => setMessage(""), 3000);
      router.push('/student');
    } catch (error) {

      console.error("Error while creating student", error)
    }
  }



  return (
    <>
      < form

        onSubmit={handleUserCreate}
        className="max-w-md mx-auto mt-30 p-6 border-4 border-gray-300 rounded-lg shadow-lg box-border">
        <h1 className="text-2xl font-bold mb-6 text-center">Student  Form</h1>

        <label htmlFor="userName" className="block mb-2 font-semibold text-gray-700">
          Student Name
        </label>
        <input
          type="text"
          id="studentname"
          name="studentname"
          placeholder="Enter Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="w-full px-4 py-2 mb-5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label htmlFor="rollNumber" className="block mb-2 font-semibold text-gray-700">
          Roll Number
        </label>
        <input
          type="number"
          id="rollNumber"
          name="rollnumber"
          placeholder="Enter roll number"
          value={rollNumber}
          onChange={(e) => setRollNuber(e.target.value)}
          className="w-full px-4 py-2 mb-5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        < button
          type="submit"
          className="w-full bg-neutral-600 text-white font-semibold py-2 rounded-md hover:bg-neutral-800 transition"
        >
          Submit
        </button>
        {message && (
          <p className="mt-4 text-center text-green-600 font-medium">
            {message}
          </p>
        )}
      </form>
    </>
  );
}


