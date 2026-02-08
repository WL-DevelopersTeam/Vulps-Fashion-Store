// import Sidebar from "../component/Sidebar";

// export default function AdminLayout({ children }) {
//     return (
//         <div style={{ display: "flex", minHeight: "100vh" }}>
//             <Sidebar />
//             <div style={{ flex: 1, background: "#f5f5f5", padding: "20px" }}>
//                 {children}
//             </div>
//         </div>
//     );
// }
import React, { useState } from 'react';
import Sidebar from '../component/Sidebar';
export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    /* Use 'flex' to ensure the sidebar stays on the left and content on the right */
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between bg-black text-white p-4 sticky top-0 z-50">
        {/* <h2 className="text-lg font-bold tracking-widest">CLOVRA</h2> */}
        {/* <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 border border-gray-700 rounded-md"
        >
          {isSidebarOpen ? "✕" : "☰"}
        </button> */}
      </div>

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main content area */}
      <main className="flex-1 p-4 md:p-8 w-full overflow-x-hidden transition-all duration-300">
        {children}
      </main>

      {/* Overlay for mobile toggle */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

