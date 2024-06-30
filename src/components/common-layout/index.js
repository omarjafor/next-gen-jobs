import { currentUser } from "@clerk/nextjs/server";
import Header from "../header";


export default async function CommonLayout({ children }) {
    const user = await currentUser();
    console.log(user);
    return (
        <div className="mx-auto p-6 lg:px-8">
            <Header user={JSON.parse(JSON.stringify(user))}/>
            <main>{children}</main>
        </div>
    )
}