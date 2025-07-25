'use client'

export default function ProjectBoardPage(){
return (
  <div className="p-6 lg:p-10">
    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Project Board</h1>
    <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">Portfolio Website</p>

   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {["To Do", "In Progress", "Review", "Done"].map((column) => (
        <div
          key={column}
          className="bg-gray-100 dark:bg-gray-800  rounded-2xl shadow-lg p-5 border border-gray-200"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-3 dark:text-white">{column}</h3>
          <div className="space-y-3">
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow text-sm text-gray-700 dark:text-gray-100">
              Sample Task
            </div>
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow text-sm text-gray-700 dark:text-gray-100">
              Another Task
            </div>
          </div>
          <div className="flex justify-end">

          <button className="bg-black text-white dark:bg-white dark:text-black p-1 rounded-lg mt-5">+ Create</button>
          </div>
        </div>
      ))} 
    </div>
  </div>
);

}