import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="space-y-3 text-center">
          <Skeleton className="h-10 w-1/2 mx-auto" />
          <Skeleton className="h-5 w-2/3 mx-auto" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Skeleton className="h-80 w-full" />
          <Skeleton className="h-80 w-full lg:col-span-2" />
        </div>
      </div>
    </div>
  );
}
