'use client';
import { useState, useEffect } from "react";

import axios from "axios";
import ModalPopup from "../components/modal";

type Student = {

    _id: string;
    name: string;
    rollnumber: number;
}

export default function StudentPage() {
 const [students, setStudents] = useState<Student[]>([]);
 const [open,setOpen] = useState(false);
   const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    const fetchStudents = async () => {
        try {
            const res = await axios.get("http://localhost:8002/api/students");
            // console.log("api response data:", res.data.data[0]);
            // console.log(res.data.response.data.students);
            //    console.log( res.data.response[0]);
        setStudents(res.data.response);

        }
        catch (err) {
            console.error("Error Fetching students", err);
        }
    };

    useEffect(() => {


        fetchStudents();
    }, []);



    const deleteStudent = async (id: string) => {
        try {
            await axios.put(`http://localhost:8002/api/students/${id}`);
            fetchStudents();
        }
        catch (err) {
            console.error("Failed to delete student", err);
        }
    }



    const updateStudent = async (id: string,name:string,rollnumber:number) => {
        try {

            await axios.put(`http://localhost:8002/api/students/update/${id}`, {
                name,
                rollnumber,
            });

            fetchStudents();
        } catch (error) {
            console.error("Error while updating student", error);
        }
    };

  const handleOpenModal = (student: Student) => {
    setSelectedStudent(student);
    setOpen(true);
  };

    const handleCloseModal = ()=>{
        
        setOpen(false);
        setSelectedStudent(null);
    };


    return (
    <main className="flex justify-center items-start min-h-screen p-8 bg-gray-50">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Student List</h1>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Roll Number</th>
              <th className="border border-gray-300 ">Operation</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td className="border border-gray-300 px-4 py-2">
                  {student.name}
                </td>
                <td className="border border-gray-300 px-6 py-2">
                  {student.rollnumber}
                </td>
                <td className="border border-gray-300 px-6 py-2 text-center">
                  <button
                    onClick={() => deleteStudent(student._id)}
                    type="button"
                    className="m-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm rounded"
                  >
                    Delete
                  </button>
                 
                 
                    <button
                   type="button"
                      onClick={() => handleOpenModal(student)} 
                    className="ml-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 text-sm rounded  ">
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <ModalPopup
        open={open}
        handleClose={handleCloseModal}
        student={selectedStudent}
        onUpdate={updateStudent}
        />
      </div>
    </main>

  );
}