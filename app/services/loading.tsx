import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        <div className="space-y-3 text-center">
          <Skeleton className="h-10 w-1/2 mx-auto" />
          <Skeleton className="h-5 w-2/3 mx-auto" />
        </div>
        <div className="space-y-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={`service-skeleton-${index}`} className="h-40 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
