import {
  HomeIcon,
  BellIcon,
  PlusIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export function HomeNav() {
  const navigation = useNavigate();
  return (
    <ul className="flex items-center justify-between  bg-white p-5 w-full rounded-full ">
      <li>
        <button onClick={() => navigation("/")}>
          <HomeIcon className="w-10 h-10"></HomeIcon>
        </button>
      </li>
      <li>
        <button>
          <MagnifyingGlassIcon className="h-10 w-10"></MagnifyingGlassIcon>
        </button>
      </li>
      <li>
        <button>
          <BellIcon className="h-10 w-10"></BellIcon>
        </button>
      </li>
    </ul>
  );
}
