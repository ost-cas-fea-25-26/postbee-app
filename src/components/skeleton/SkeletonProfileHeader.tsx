import Skeleton from './Skeleton';

export default function SkeletonProfileHeader() {
  return (
    <div>
      <Skeleton className="relative mb-md h-80 w-full  items-center rounded-m bg-white px-xl py-lg">
        <div className="absolute bottom-[-70px] right-[30px] grid h-[150px] w-[150px] rounded-full border-[6px] border-secondary-100 bg-secondary-100">
          <Skeleton className="animate-pulse rounded-full bg-secondary-200" />
        </div>
      </Skeleton>
      <Skeleton className="h-[46px] w-4/12 rounded-sm bg-secondary-200" />
    </div>
  );
}
