import { useContext, useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { initFlowbite } from "flowbite";
import logo from "../../../public/images/campu_logo-removebg-preview.png";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Settings,
  Menu,
  X,
  Bell,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { AuthContext } from "../../provider/AuthProvider";
import { toast } from "react-toastify";

const DashboardLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
const navigate = useNavigate()
  useEffect(() => {
    initFlowbite();
  }, []);

  const handleLogout = () => {
    logout().then(
      toast.success("Logout Succesfull......"),
      navigate("/")
    )
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "My Posts",
      path: "/dashboard/posts",
      icon: <ShoppingBag size={18} />,
    },
    {
      name: "Manage Users",
      path: "/dashboard/manage-users",
      icon: <Users size={18} />,
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: <Settings size={18} />,
    },
  ];

  return (
    <div className="flex h-screen bg-[#F3F4F9] font-sans antialiased text-slate-900">
      {/* --- Sidebar Overlay for Mobile --- */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* --- Sidebar --- */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200/60 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-all duration-300 ease-in-out lg:relative lg:translate-x-0 shadow-xl lg:shadow-none`}
      >
        <div className="flex flex-col h-full">
          {/* Brand Logo Area */}
          <div className="h-20 flex items-center px-6 border-b border-slate-50">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-slate-900 p-1.5 rounded-xl transition-transform group-hover:scale-105">
                <img
                  src={logo}
                  alt="Logo"
                  className="h-7 w-auto object-contain"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-bold tracking-tight text-slate-800">
                  CampusMart
                </span>
                <span className="text-[10px] font-bold text-[#524ffc] uppercase tracking-widest">
                  {user?.role} Mode
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
            <p className="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4">
              Main Menu
            </p>
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end
                className={({ isActive }) =>
                  `flex items-center justify-between group px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-[#524ffc] text-white shadow-lg shadow-[#524ffc]/30 translate-x-1"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <span className="transition-colors group-hover:animate-pulse">
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </div>
                <ChevronRight
                  size={14}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </NavLink>
            ))}
          </nav>

          {/* User Section at Bottom */}
          <div className="p-4 mt-auto border-t border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3 p-2 mb-2 rounded-lg">
              <img
                src={user?.photoURL}
                className="w-9 h-9 rounded-full ring-2 ring-white shadow-sm"
                alt=""
              />
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-bold truncate text-slate-700">
                  {user?.displayName}
                </span>
                <span className="text-[10px] text-slate-400 truncate">
                  {user?.email}
                </span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all active:scale-95"
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* --- Main Content Area --- */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header / Navbar */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/50 flex items-center justify-between px-6 md:px-10 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={22} />
            </button>
            <div className="hidden md:block">
              <h2 className="text-xl font-bold text-slate-800">
                Welcome back, {user?.displayName?.split(" ")[0]}! 👋
              </h2>
              <p className="text-xs text-slate-400 font-medium">
                Manage your campus activities here.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            {/* Search or extra buttons could go here */}
            <button className="p-2.5 text-slate-500 hover:bg-slate-50 hover:text-[#524ffc] transition-all rounded-full relative group">
              <Bell
                size={20}
                className="group-hover:rotate-12 transition-transform"
              />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="h-8 w-[1px] bg-slate-200 mx-1 hidden sm:block"></div>

            <div className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-slate-50 transition-colors cursor-pointer group">
              <div className="relative">
                <img
                  src={user?.photoURL}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm group-hover:border-[#524ffc]/30 transition-all"
                  alt="Profile"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="text-sm font-bold text-slate-700">
                  {user?.displayName}
                </span>
                <span className="text-[11px] font-semibold text-[#524ffc] capitalize">
                  {user?.role}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area with Fade-in effect */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
