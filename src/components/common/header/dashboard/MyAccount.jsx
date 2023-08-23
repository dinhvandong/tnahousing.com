import Link from "next/link";
import { useRouter } from "next/router";
import { isSinglePageActive } from "../../../../utils/daynamicNavigation";
import Image from "next/image";
import { useSelector } from "react-redux";
import { persistor } from "../../../../app/store";
import { logout } from "../../../../app/slice/userSlice";

const MyAccount = () => {
const router = useRouter()
  const persistedState = useSelector((state) => state.persistedReducer.user);
  const logout = () => {
    persistor.purge().then(()=>{
      router.push("/")
      window.location.reload()
    }); 
  }

  const profileMenuItems = [
    { id: 1, name: "My Profile", ruterPath: "/my-profile" },
    // { id: 2, name: " My Message", ruterPath: "/my-message" },
    // { id: 3, name: " My Favourite", ruterPath: "/my-favourites" },
    // { id: 4, name: " My Package", ruterPath: "/my-package" },
    { id: 5, name: " Log out", ruterPath: "/", onClick: ()=>logout() },
  ];
  const route = useRouter();
  return (
    <>
      <div className="user_set_header">
        <Image
          width={40}
          height={40}
          className="float-start"
          src={persistedState.currentUser?.avatar===null ? "https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-user-vector-avatar-png-image_1541962.jpg": persistedState.currentUser?.avatar}
          alt="e1.png"
        />
        <p>
          {persistedState.currentUser?.fullName} <br />
          <span className="address">{persistedState.currentUser?.email}</span>
        </p>
      </div>
      {/* End user_set_header */}

      <div className="user_setting_content">
        {profileMenuItems.map((item) => (
          <Link
            href={item.ruterPath}
            key={item.id}
            onClick={item.onClick}
            className="dropdown-item"
            style={
              isSinglePageActive(`${item.ruterPath}`, route.pathname)
                ? { color: "#ff5a5f" }
                : { color: "black" }
            }
          >
            {item.name}
            
          </Link>
        ))}
      </div>
    </>
  );
};

export default MyAccount;
