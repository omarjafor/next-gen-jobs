'use client'
import React, { Fragment, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { Label } from '@radix-ui/react-label';
import { CirclePlus, Heart } from 'lucide-react';
import { Input } from '../ui/input';
import { supabaseClient } from '@/utils/supabase';
import { DialogTitle } from '@radix-ui/react-dialog';
import { createFeedPostAction, deleteFeedPostAction, updateFeedPostAction } from '@/actions';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';

const Feed = ({ user, profile, allFeedPost }) => {
    const [showDialog, setShowDialog] = useState(false);
    const [formData, setFormData] = useState({ message: '', imageURL: '' });
    const [imageData, setImageData] = useState(null);

    function handleFileChange(e) {
        e.preventDefault();
        const file = e.target.files[0];
        setImageData(file);
    }
    function handleFetchImageUrl(getData) {
        const { data } = supabaseClient.storage.from('NextGen-Jobs').getPublicUrl(getData.path);
        if (data) setFormData({ ...formData, imageURL: data.publicUrl });
    }
    async function handleImageUpload() {
        const { data, error } = await supabaseClient.storage.from('NextGen-Jobs').upload(`/public/${imageData?.name}`, imageData, {
            cacheControl: '3600',
            upsert: false,
        });
        if (data) handleFetchImageUrl(data);
    }
    useEffect(() => {
        if (imageData) handleImageUpload()
    }, [imageData])
    async function handleSaveFeedPost() {
        await createFeedPostAction({
            userId: user?.id,
            userName: profile?.candidateInfo?.name || profile?.recruiterInfo?.name,
            message: formData?.message,
            image: formData?.imageURL,
            likes: [],
        }, '/feed');
        setShowDialog(false);
        setFormData({ message: '', imageURL: '' })
    }

    async function handleUpdateFeedPostLikes(post) {
        let cpyLikes = [...post.likes];
        const index = cpyLikes.findIndex(item => item.reactorUserId === user?.id);
        if (index === -1) {
            cpyLikes.push({
                reactorUserId: user?.id, reactorUserName: profile?.candidateInfo?.name || profile?.recruiterInfo?.name,
            });
        } else cpyLikes.splice(index, 1);
        const updatedPost = { ...post, likes: cpyLikes };
        await updateFeedPostAction(updatedPost, '/feed');
    }

    async function handleDeleteFeedPost(post) {
        const imagePath = post.image.split('/storage/v1/object/public/NextGen-Jobs/')[1];
        const { error } = await supabaseClient.storage.from('NextGen-Jobs').remove([imagePath]);
        if (error) {
            console.error('Error deleting image:', error);
            return;
        }
        await deleteFeedPostAction(post._id, '/feed');
    }

    return (
        <Fragment>
            <div className='mx-auto max-w-7xl'>
                <div className='flex items-baseline justify-between border-b pb-6 pt-24'>
                    <h1 className='text-4xl font-bold tracking-tight text-gray-900'>
                        Explore Feed
                    </h1>
                    <div className='flex items-center'>
                        <Button onClick={() => setShowDialog(true)}
                            className='flex h-11 items-center justify-center px-5'>
                            Add New Post
                        </Button>
                    </div>
                </div>
                <div className="py-12">
                    <div className="container m-auto p-0 flex flex-col gap-5 text-gray-700">
                        {allFeedPost && allFeedPost.length > 0 ? (
                            allFeedPost.map((feedPostItem) => (
                                <div
                                    key={feedPostItem._id}
                                    className="group relative -mx-4 p-6 rounded-3xl bg-gray-100 hover:bg-white hover:shadow-2xl cursor-auto shadow-2xl shadow-transparent gap-8 flex"
                                >
                                    <div className="sm:w-2/6 rounded-3xl overflow-hidden transition-all duration-500 group-hover:rounded-xl">
                                        <img
                                            src={feedPostItem?.image}
                                            alt="Post"
                                            className="h-80 w-full object-cover object-top transition duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="sm:p-2 sm:pl-0 sm:w-4/6">
                                        <span className="mt-4 mb-2 inline-block font-medium text-gray-500 sm:mt-0">
                                            {feedPostItem?.userName}
                                        </span>
                                        <h3 className="mb-6 text-4xl font-bold text-gray-900">
                                            {feedPostItem?.message}
                                        </h3>
                                        <div className="flex gap-5">
                                            <Heart
                                                size={25}
                                                fill={
                                                    feedPostItem?.likes?.length > 0
                                                        ? "#000000"
                                                        : "#ffffff"
                                                }
                                                className="cursor-pointer"
                                                onClick={() => handleUpdateFeedPostLikes(feedPostItem)}
                                            />
                                            <span className="font-semibold text-xl">
                                                {feedPostItem?.likes?.length}
                                            </span>
                                        </div>
                                        
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button
                                                    disabled={feedPostItem?.userId !== user?.id}
                                                    className='absolute right-10 bottom-10 disabled:opacity-0'
                                                    variant="destructive">
                                                    Delete Post
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone. This will permanently delete your post.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleDeleteFeedPost(feedPostItem)}>Delete</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <h1>No posts found!</h1>
                        )}
                    </div>
                </div>
            </div>
            <Dialog open={showDialog} onOpenChange={() => {
                setShowDialog(false);
                setFormData({ message: '', imageURL: '' });
            }}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add NextGen Jobs Feed Post</DialogTitle>
                    </DialogHeader>
                    <Textarea name="message"
                        value={formData?.message}
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                message: event.target.value,
                            })
                        }
                        placeholder="What do you want to talk about?"
                        className="border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 h-[200px] text-[28px]"
                    />
                    <div className='flex gap-5 items-center justify-between'>
                        <Label htmlFor='imageURL'>
                            <CirclePlus />
                            <Input onChange={handleFileChange} className='hidden' id='imageURL' type='file' />
                        </Label>
                        <Button
                            className='flex w-40 h-11 items-center justify-center px-5 disabled:opacity-65'
                            onClick={handleSaveFeedPost}
                            disabled={formData?.message === '' && formData?.imageURL === ''}>
                            Post
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
};

export default Feed;