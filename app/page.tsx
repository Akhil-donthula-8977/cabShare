import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "./api/auth/[...nextauth]/options";
async function Home() {
    const session=await getServerSession(options);
    if(session)return redirect("/Home")
    else return redirect("/auth/signin");
}

export default Home;
