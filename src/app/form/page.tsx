'use client';

import { useEffect, useState } from "react";
import axios from "axios";


type Student = {
    _id: string;
    name: string;
    rollnumber: number;
};

export default function Form() {
    const [students, setStudents] = useState<Student[]>([]);
    const [studentId, setStudentId] = useState<string>("");
    const [rollNumber, setRollNumber] = useState<number | "">("");
    const [subject, setSubject] = useState<string>("");
    const [marks, setMarks] = useState<number | "">("");

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
   
    const handleStudentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        setStudentId(selectedId);

        const student = students.find((s) => s._id === selectedId);
        setRollNumber(student ? student.rollnumber : "");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8002/api/subjects/create", {
                subject,
                marks,
                studentId
            });

            console.log(res.data);

            setStudentId("");
            setRollNumber("");
            setSubject("");
            setMarks("");
        } catch (err) {
            console.error("Error submitting data", err);
            alert("Failed to save data");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto mt-10 p-6 border-4 border-gray-300 rounded-lg shadow-lg"
        >
            <h1 className="text-2xl font-bold mb-6 text-center">Student Data Form</h1>

            <label className="block mb-2 font-semibold text-gray-700">Student Name</label>
            <select
                value={studentId}
                onChange={handleStudentChange}
                className="w-full px-4 py-2 mb-5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            >
                <option value="">Select Student</option>
                {students.map((s) => (
                    <option key={s._id} value={s._id}>{s.name}</option>
                ))}
            </select>

            <label className="block mb-2 font-semibold text-gray-700">Roll Number</label>
            <input
                type="number"
                value={rollNumber}
                readOnly
                placeholder="Roll Number"
                className="w-full px-4 py-2 mb-5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label className="block mb-2 font-semibold text-gray-700">Subject</label>
            <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2 mb-5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            >
                <option value="">Select Subject</option>
                <option value="Math">Math</option>
                <option value="Science">Science</option>
                <option value="English">English</option>
                <option value="History">History</option>
                <option value="Computer">Computer</option>
            </select>

            <label className="block mb-2 font-semibold text-gray-700">Marks</label>
            <input
                type="number"
                value={marks}
                onChange={(e) => setMarks(Number(e.target.value))}
                placeholder="Enter Marks"
                className="w-full px-4 py-2 mb-5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />

            <button
                type="submit"
                className="w-full bg-neutral-600 text-white font-semibold py-2 rounded-md hover:bg-neutral-800 transition"
            >
                Submit
            </button>
        </form>
    );
}
