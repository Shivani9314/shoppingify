import { MdOutlineShoppingCart } from "react-icons/md";
import {
  MdFormatListBulleted,
  MdInsertChartOutlined,
  MdReplay,
} from "react-icons/md";
import { Link } from "react-router-dom";


function SideNavbar() {
  return (
    <div className="flex w-28 bg-white shadow-lg">
      <div className="flex flex-col h-screen">
        <div className="flex flex-col flex-auto items-center">
          <img src="/logo.svg" alt="logo" className="bg-white ml-4 mt-10 w-12"></img>
        </div>

        <div className="flex-auto items-center ml-8">
          <ul className="space-y-12">
            <Link to={'/'} > <MdFormatListBulleted size={28} /></Link>
            <MdInsertChartOutlined size={28} />
            <Link to={'/shoppingHistory'} ><MdReplay className="mt-12" size={28} /></Link>
          </ul>
        </div>

        <button className="bg-accent w-12 h-12 flex items-center justify-center rounded-full ml-4 mb-10">
          <MdOutlineShoppingCart
            size={28}
            color="white"
          />
        </button>
      </div>
    </div>
  );
}

export default SideNavbar;