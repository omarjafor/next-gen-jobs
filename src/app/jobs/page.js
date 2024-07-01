import { fetchProfileAction } from "@/actions";
import JobListing from "@/components/job-listing";
import { currentUser } from "@clerk/nextjs/server";


const Jobs = async() => {
    const user = await currentUser();
    const profile = await fetchProfileAction(user?.id);
    console.log(profile);
    return <JobListing
    user={JSON.parse(JSON.stringify(user))}
    profile={profile}
            />
};

export default Jobs;