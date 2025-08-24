'use client';

import { useEffect, useState } from "react";
import axios from "axios";

export default function form() {

    const [students, setStudents] = useState([]);



    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await axios.get("http://localhost:8002/api/students");
                setStudents(res.data.response);
            }

            catch (err) {
                console.error("Error Fetching students", err);
            }
        };
        fetchStudents();
    }, []);



    return (
        <>
            <form className="max-w-md mx-auto mt-10 p-6 border-4 border-gray-300 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">Student Data Form All details</h1>

                <label className="block mb-2 font-semibold text-gray-700">Student Name</label>
                <select
                    className="w-full px-4 py-2 mb-5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                >
                    <option value="">Select Student</option>
                    <option value="">Vasu</option>
                    <option value="Math">Gaurav</option>
                    <option value="Science">Amol</option>
                    <option value="English">Ankit</option>
                    <option value="History">Dixit</option>
                </select>

                <label className="block mb-2 font-semibold text-gray-700">Roll Number</label>
                <input
                    type="number"
                    placeholder="Enter Roll Number"
                    className="w-full px-4 py-2 mb-5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <label className="block mb-2 font-semibold text-gray-700">Subject</label>
                <select
                    className="w-full px-4 py-2 mb-5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                >
                    <option value="">Select Subject</option>
                    <option value="Math">Math</option>
                    <option value="Science">Science</option>
                    <option value="English">English</option>
                    <option value="History">History</option>
                </select>


                <label className="block mb-2 font-semibold text-gray-700">Marks</label>
                <input
                    type="number"
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

        </>
    );
}