import { fetchProfileAction } from '@/actions';
import Feed from '@/components/feed';
import { currentUser } from '@clerk/nextjs/dist/types/server';
import { redirect } from 'next/navigation';
import React from 'react';

const FeedPage = async () => {
    const user = await currentUser();
    const profile = await fetchProfileAction(user?.id);
    if (!profile?._id) redirect('/sign-in')

    return (
        <Feed user={user} profile={profile}/>
    );
};

export default FeedPage;