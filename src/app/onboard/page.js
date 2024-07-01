import { fetchProfileAction } from "@/actions";
import OnBoard from "@/components/on-board";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";



const OnBoardPage = async () => {
    const user = await currentUser();
    const profile = await fetchProfileAction(user?.id);

    if (profile?._id) {
        if (profile?.role === 'recruiter' && !profile.isPremiumUser) redirect('/membership')
        else redirect('/')
    } else return <OnBoard />

};

export default OnBoardPage;