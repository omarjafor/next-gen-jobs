import React, { Fragment, useState } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { Label } from '@radix-ui/react-label';
import { CirclePlus } from 'lucide-react';
import { Input } from '../ui/input';

const supabaseClient = createClient('https://ldqlmidmuhvnmivwqgew.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkcWxtaWRtdWh2bm1pdndxZ2V3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk4NTcxMTEsImV4cCI6MjAzNTQzMzExMX0.7kS6R_nHBVPNKYXJxXs0dgmvmBeP8klW25Z220cMM2A');

const Feed = () => {
    const [showDialog, setShowDialog] = useState(false);
    const [formData, setFormData] = useState({message: '', imageURL: ''});
    const [imageData, setImageData] = useState(null);
    return (
        <Fragment>
            <div className='mx-auto max-w-7xl'>
                <div className='flex items-baseline justify-between border-b pb-6 pt-24'>
                    <h1 className='text-4xl font-bold tracking-tight text-gray-900'>
                        Explore Feed
                    </h1>
                    <div className='flex items-center'>
                        <Button className='flex h-11 items-center justify-center px-5'>
                            Add New Post
                        </Button>
                    </div>
                </div>
            </div>
            <Dialog open={} onOpenChange={}>
                <DialogContent>
                    <Textarea />
                    <div className='flex gap-5 items-center justify-between'>
                        <Label for='imageURL'>
                            <CirclePlus />
                            <Input onChange={} className='hidden' id='imageURL' type='file'/>
                        </Label>
                        <Button 
                        className='flex w-40 h-11 items-center justify-center px-5 disabled:opacity-65'
                        onClick={} 
                        disabled={}
                        >
                            Post
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
};

export default Feed;