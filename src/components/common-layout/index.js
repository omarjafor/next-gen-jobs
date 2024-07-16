import { currentUser } from "@clerk/nextjs/server";
import Header from "../header";
import { fetchProfileAction } from "@/actions";


export default async function CommonLayout({ children }) {
    const user = await currentUser();
    const profile = await fetchProfileAction(user?.id)
    return (
        <div className="mx-auto max-w-7xl p-6 lg:px-8">
            <Header profile={profile} user={JSON.parse(JSON.stringify(user))}/>
            <main>{children}</main>
        </div>
    )
}