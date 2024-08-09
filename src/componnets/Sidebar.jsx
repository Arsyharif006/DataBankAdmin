import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { FaChevronDown} from 'react-icons/fa';
import { MdOutlineDashboard,MdOutlineSchool,MdOutlineInsertChart } from "react-icons/md";
import { RiSchoolLine } from "react-icons/ri";
import { HiOutlineUserGroup,HiOutlineLogout } from "react-icons/hi";
import { LuUserCog } from "react-icons/lu";





const menus = [
  {
    title: "Dashboard",
    icon: <MdOutlineDashboard />,
    link: "/dashboard",
    margin:true
  },
  { title: "Akun", icon: <LuUserCog />, link: "/akun" },
  {
    title: "Manajemen Personal",
    icon: <HiOutlineUserGroup />,
    items: [
      { name: "Data Guru", link: "/dataguru" },
      { name: "Data Siswa", link: "/datasiswa" },
    ],
  },
  {
    title: "Manajemen Sekolah ",
    icon: <RiSchoolLine />
    ,
    items: [
      { name: "Data Extrakulikuler", link: "/extrakulikuler" },
      { name: "Data Mata Pelajaran", link: "/matapelajaran" },
      { name: "Data Jurusan", link: "/jurusan" },
      { name: "Data Ruangan", link: "/ruangan" },
    ],
  },
  {
    title: "Manajemen Siswa ",
    icon: <MdOutlineSchool  />,
    items: [
      { name: "Data Administrasi", link: "/administrasi" },
      { name: "Data Kehadiran", link: "/kehadiran" },
      { name: "Data Nilai", link: "/nilai" },
    ],
  },
  { title: "Report", icon: <MdOutlineInsertChart />, link: "/report" },
  { title: "Log Out", icon: <HiOutlineLogout />, link: "/logout" },
];

export function Sidebar() {
  const [open, setOpen] = React.useState(0);
  const location = useLocation();

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const isActive = (link) => location.pathname === link;

  return (
    <Card className="max-w-[17rem] p-1 shadow-xl h-screen">
      <div className="mb-2 flex items-center gap-4 p-4">
        <img src="https://docs.material-tailwind.com/img/logo-ct-dark.png" alt="brand" className="h-8 w-8" />
        <Typography variant="h5" color="blue-gray">
          Data Bank <br />Smkn 1 Ciomas
        </Typography>
      </div>
      <List>
        {menus.map((menu, index) => (
          menu.items ? (
            <Accordion
              key={index}
              open={open === index + 1}
              icon={
                <FaChevronDown
                  className={`ml-5 h-4 w-4 transition-transform ${open === index + 1 ? "rotate-180" : ""}`}
                />
              }
            >
              <ListItem className='p-0' selected={open === index + 1}>
                <AccordionHeader onClick={() => handleOpen(index + 1)} className="border-b-0 p-3 mr-3">
                  <ListItemPrefix className="text-[20px] pr-2">
                    {menu.icon}
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    {menu.title}
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0 ">
                  {menu.items.map((item, idx) => (
                    <Link to={item.link} key={idx}>
                      <ListItem className={`pl-10 hover:bg-gray-500 hover:text-white transition duration-300 mb-1 ${isActive(item.link) ? 'bg-gray-600 rounded-lg text-white' : ''}`}>
                        <ListItemPrefix />
                        {item.name}
                      </ListItem>
                    </Link>
                  ))}
                </List>
              </AccordionBody>
            </Accordion>
          ) : (
            <Link to={menu.link} key={index}>
              <ListItem className={`hover:bg-gray-500 hover:text-white transition duration-300 mb-1 ${isActive(menu.link) ? 'bg-gray-600 rounded-lg text-white' : ''} ${menu.margin ? 'mb-3' : ''}`}>
                <ListItemPrefix className="text-[20px] pr-2">
                  {menu.icon}
                </ListItemPrefix>
                {menu.title}
                {menu.suffix && <ListItemSuffix>{menu.suffix}</ListItemSuffix>}
              </ListItem>
            </Link>
          )
        ))}
      </List>
    </Card>
  );
}

export default Sidebar;
