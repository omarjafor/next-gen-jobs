import { Skeleton } from "@/components/ui/skeleton";


const Loading = () => {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-60 w-full rounded-xl bg-zinc-500 mt-5" />
            <div className="space-y-2">
                <Skeleton className="h-40 w-full bg-zinc-500 mt-5" />
                <Skeleton className="h-40 w-full bg-zinc-500 mt-5" />
            </div>
        </div>
    );
};

export default Loading;