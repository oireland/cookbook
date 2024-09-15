import LandingPageCard from "@/app/ui/landing-page-card";
import {auth} from "@/lib/auth";
import {redirect} from "next/navigation";


export default async function Home() {
    const session = await auth()

    console.log(session)
    if (session) {
        redirect('/dashboard')
    }
  return (
          <div className="w-screen flex-col items-center justify-center">
              <LandingPageCard />
          </div>
  );
}
