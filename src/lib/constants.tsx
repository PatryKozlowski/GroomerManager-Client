import {
  BarChart,
  Calendar,
  Users,
  PawPrint,
  Scissors,
  UserCircle,
  Tag,
} from "lucide-react";

export const ROUTES = {
  "/dashboard": "Dashboard",
  "/dashboard/clients": "Clients",
  "/pets": "Pets",
  "/appointments": "Appointments",
  "/services": "Services",
  "/staff": "Staff",
  "/inventory": "Inventory",
  "/settings": "Settings",
} as const;

export const NAV_ITEMS = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: <BarChart className="h-5 w-5" />,
  },
  {
    path: "/dashboard/appointments",
    label: "Wizyty",
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    path: "/dashboard/clients",
    label: "Klienci",
    icon: <Users className="h-5 w-5" />,
  },
  {
    path: "/dashboard/pets",
    label: "Zwierzęta",
    icon: <PawPrint className="h-5 w-5" />,
  },
  {
    path: "/dashboard/services",
    label: "Usługi",
    icon: <Scissors className="h-5 w-5" />,
  },
  {
    path: "/dashboard/staff",
    label: "Zespół",
    icon: <UserCircle className="h-5 w-5" />,
  },
  {
    path: "/dashboard/inventory",
    label: "Magazyn",
    icon: <Tag className="h-5 w-5" />,
  },
];
