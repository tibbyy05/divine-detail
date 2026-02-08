import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        <div className="space-y-3 text-center">
          <Skeleton className="h-10 w-2/3 mx-auto" />
          <Skeleton className="h-5 w-3/4 mx-auto" />
        </div>
        <Skeleton className="h-72 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={`about-skeleton-${index}`} className="h-40 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
