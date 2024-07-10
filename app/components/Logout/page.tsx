import React from "react";
import { useRouter } from "next/navigation";

const Logout: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    window.localStorage.clear();
    router.push("/"); 
  };

  return (
    <button
      className="w-28 h-8 flex border-none items-center justify-center bg-emerald-950 text-white rounded-full m-5"
      onClick={handleLogout}
    >
      LOGOUT
    </button>
  );
};

export default Logout;

