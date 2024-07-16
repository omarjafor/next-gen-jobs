import { fetchProfileAction } from "@/actions";
import AccountInfo from "@/components/account-info";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


const Account = async() => {
    const user = await currentUser();
    const profile = await fetchProfileAction(user?.id);
    if (!profile?._id) redirect('/sign-in')

    return (
        <AccountInfo profile={profile} />
    );
};

export default Account;