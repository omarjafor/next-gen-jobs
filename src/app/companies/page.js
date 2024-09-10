import { fetchAllJobsAction, fetchProfileAction } from '@/actions';
import Companies from '@/components/companies';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const CompanyPage = async() => {
    const user = await currentUser();
    const profile = await fetchProfileAction(user?.id);

    if (!profile) redirect("/onboard");
    const jobsList = await fetchAllJobsAction({});
    return (
        <Companies jobsList={jobsList} />
    );
};

export default CompanyPage;