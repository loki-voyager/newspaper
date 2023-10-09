import { Auth } from "@/components/Auth";
import { Profile } from "@/components/Profile";

export default async function Home() {
  return (
    <>
      <div className="wrapper">
        <div>
          <h1>Home page</h1>
        </div>
        <Auth />
        <Profile />
      </div>
    </>
  );
}
