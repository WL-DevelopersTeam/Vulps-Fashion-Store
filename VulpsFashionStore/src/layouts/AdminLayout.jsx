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

import Sidebar from "../component/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}


