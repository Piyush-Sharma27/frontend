'use client';

export default function StudentMarks() {
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
          </tbody>
        </table>
      </div>
    </main>
  );
}
