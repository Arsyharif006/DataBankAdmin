import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaChevronDown } from 'react-icons/fa';
import { MdOutlineDashboard, MdOutlineSchool, MdOutlineInsertChart } from "react-icons/md";
import { RiSchoolLine } from "react-icons/ri";
import { HiOutlineUserGroup, HiOutlineLogout } from "react-icons/hi";
import { LuUserCog } from "react-icons/lu";
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';
import Api from '../api/Index'; 

const menus = [
  {
    title: "Dashboard",
    icon: <MdOutlineDashboard />,
    link: "/dashboard-admin",
    margin: true,
  },
  { title: "Akun", icon: <LuUserCog />, link: "/akun-admin" },
  {
    title: "Manajemen Personal",
    icon: <HiOutlineUserGroup />,
    items: [
      { name: "Data Guru", link: "/dataguru-admin" },
      { name: "Data Siswa", link: "/datasiswa-admin" },
    ],
  },
  {
    title: "Manajemen Sekolah",
    icon: <RiSchoolLine />,
    items: [
      { name: "Data Extrakulikuler", link: "/extrakulikuler" },
      { name: "Data Mata Pelajaran", link: "/matapelajaran" },
      { name: "Data Ruangan", link: "/ruangan" },
      { name: "Data Jurusan", link: "/jurusan" },
      { name: "Data Kelas", link: "/kelas" },
    ],
  },
  { title: "Report", icon: <MdOutlineInsertChart />, link: "/report" },
  { title: "Log Out", icon: <HiOutlineLogout />, link: "/logout" },
];

export function Sidebar() {
  const [open, setOpen] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    menus.forEach((menu, index) => {
      if (menu.items) {
        menu.items.forEach((item) => {
          if (location.pathname.includes(item.link)) {
            setOpen(index + 1);
          }
        });
      }
    });
  }, [location.pathname]);

  const handleOpen = (value) => {
    setOpen(open === value ? null : value);
  };

  const isActive = (link) => location.pathname === link;

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await Api.post("/api/logout");

      Cookies.remove("user");
      Cookies.remove("token");
      Cookies.remove("permissions");

      toast.success("Berhasil Logout!", {
        position: "top-center",
        duration: 5000,
      });

      navigate("/"); // Mengarahkan pengguna ke halaman utama
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Gagal Logout, coba lagi!", {
        position: "top-center",
        duration: 5000,
      });
    }
  };

  return (
    <div className="min-h-screen max-w-[45vh] w-[45vh] p-2 shadow-xl flex-grow bg-gray-800">
      <div className="mb-4 flex items-center gap-2 p-4">
        <img
          src="https://media.licdn.com/dms/image/C510BAQH8vzaLQwV33w/company-logo_200_200/0/1630622969900?e=2147483647&v=beta&t=jVEs1Z2BR7ZXPGvc52TVxrD3IZ96NH_aMnrkZz39Zec"
          alt="brand"
          className="h-10 w-10"
        />
        <div className="text-md ml-2 font-medium text-gray-200">
          <p>Data Bank</p>
          <p>Smkn 1 Ciomas</p>
        </div>
      </div>
      <ul className="flex flex-col text-gray-200 space-y-2">
        {menus.map((menu, index) => (
          <li key={index} className={`mb-1 ${menu.margin ? 'mb-3' : ''}`}>
            {menu.items ? (
              <div>
                <button
                  onClick={() => handleOpen(index + 1)}
                  className="flex items-center justify-between w-full p-2 text-left rounded-lg hover:bg-gray-700 transition duration-300"
                >
                  <span className="flex items-center">
                    <span className="text-[20px] pr-2">{menu.icon}</span>
                    {menu.title}
                  </span>
                  <FaChevronDown
                    className={`h-4 w-4 transition-transform ${open === index + 1 ? "rotate-180" : ""}`}
                  />
                </button>
                {open === index + 1 && (
                  <ul className="pl-8 pt-1 space-y-2">
                    {menu.items.map((item, idx) => (
                      <li key={idx}>
                        <Link to={item.link}>
                          <button
                            className={`w-full text-left py-2 px-3 rounded-lg hover:bg-gray-700 transition duration-300 ${
                              isActive(item.link) ? 'bg-gray-700 text-gray-200' : ''
                            }`}
                          >
                            {item.name}
                          </button>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : menu.title === "Log Out" ? (
              <button
                onClick={handleLogout}
                className="flex items-center w-full p-2 text-left rounded-lg hover:bg-gray-700 transition duration-300"
              >
                <span className="text-[20px] pr-2">{menu.icon}</span>
                {menu.title}
              </button>
            ) : (
              <Link to={menu.link}>
                <button
                  className={`flex items-center w-full p-2 text-left rounded-lg hover:bg-gray-700 transition duration-300 ${
                    isActive(menu.link) ? 'bg-gray-700 text-gray-200' : ''
                  }`}
                >
                  <span className="text-[20px] pr-2">{menu.icon}</span>
                  {menu.title}
                </button>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
