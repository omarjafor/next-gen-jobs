import { fetchProfileAction } from "@/actions";
import MembershipPage from "@/components/membership";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


const MemberShip = async() => {

    const user = await currentUser();
    const profile = await fetchProfileAction(user?.id);
    if (user && !profile?._id) redirect('/onboard')

    return (
        <MembershipPage profile={profile} />
    );
};

export default MemberShip;