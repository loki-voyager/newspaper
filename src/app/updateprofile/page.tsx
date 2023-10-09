import { Auth } from "@/components/Auth";
import { UpdateProfile } from "@/components/UpdateProfile";

export default function ProfileEdit() {
  return (
    <>
      <div className="wrapper">
        <Auth />
        <UpdateProfile />
      </div>
    </>
  );
}
