import Sidebar from "@/components/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen">
      
      <Sidebar />

    
      <div className="flex-1 overflow-y-auto bg-gray-100 p-6">
        {children}
      </div>
    </div>
  );
}