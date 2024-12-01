import { fetchAllPostsAction, fetchProfileAction } from '@/actions';
import Feed from '@/components/feed';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

const FeedPage = async () => {
    const user = await currentUser();
    const profile = await fetchProfileAction(user?.id);
    if (!profile?._id) redirect('/sign-in')

    const allFeedPost = await fetchAllPostsAction();
    return (
        <Feed user={JSON.parse(JSON.stringify(user))} profile={profile} allFeedPost={allFeedPost} />
    );
};

export default FeedPage;