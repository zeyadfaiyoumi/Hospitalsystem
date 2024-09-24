import React, { useState, useEffect } from "react";
import {
  Home,
  Users,
  Settings,
  HelpCircle,
  Menu,
  BriefcaseMedical,
  Contact,
  LogOut,
  ShoppingBag,
  CalendarCog,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom"; // استيراد useLocation من react-router-dom
import useFetchAdmin from "../../../hooks/useFetchAdmin";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const toggleSidebar = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  const { admins, isLoading, adminStatus } = useFetchAdmin(); // استخدام الهوك

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (adminStatus === "failed") {
    return <div>Error loading admin data</div>;
  }
  const menuItems = [
    { icon: Home, text: "Home", path: "/Dashboard" },
    { icon: Users, text: "Users", path: "/Dashboard/users" },
    { icon: BriefcaseMedical, text: "Doctors", path: "/Dashboard/Doctors" },
    {
      icon: CalendarCog,
      text: "Appointments",
      path: "/Dashboard/Appointments",
    },
    { icon: Contact, text: "Contact Us", path: "/Dashboard/ContactUS" },
  ];
  
    const handleLogout = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/admin/LogOutAdmin', {}, {
          withCredentials: true 
        });
  
        if (response.status === 200) {
          navigate('/login');
        }
      } catch (error) {
        console.error('خطأ في تسجيل الخروج', error);
      }
    };
 
  return (
    <>
      <button
        className="md:hidden fixed top-1 left-1 z-20 bg-[#1f7b6f] text-white p-2 rounded"
        onClick={toggleSidebar}
      >
        <Menu />
      </button>
      <div
        className={`bg-[#232323] text-white h-screen w-64 fixed left-0 top-0 p-4 flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 z-10`}
      >
        <div>
          <h2
            className={`text-2xl font-bold mb-6 md:mt-0 ${
              isOpen ? "mt-7" : ""
            }`}
          >
            Dashboard
          </h2>
          <nav>
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`flex items-center p-2 rounded transition-colors duration-200 ${
                      location.pathname === item.path
                        ? "bg-[#1f7b6f] text-white"
                        : "hover:bg-[#1f7b6f] text-gray-300"
                    }`}
                  >
                    <item.icon className="mr-2" /> {item.text}
                  </Link>
                </li>
              ))}
              <Link
                onClick={handleLogout}
                className={`flex items-center p-2 rounded transition-colors duration-200 hover:bg-[#ff0000] text-gray-300`}
              >
                <LogOut className="mr-2" />
                Log Out
              </Link>
            </ul>
          </nav>
        </div>

        <div className="pt-6 border-t border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="flex-shrink-0 w-10 h-10">
              <img
                className="w-full h-full rounded-full"
                src={`https://ui-avatars.com/api/?name=${admins.user.name}&background=random`}
                alt=""
              />
            </div>

            <span className="font-semibold">{admins.user.name}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
