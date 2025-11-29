import Skeleton from './Skeleton';

export default function SkeletonUserCard() {
  return (
    <div>
      <Skeleton className="relative mb-m h-[320px] w-full  items-center rounded-m bg-white px-xl py-l">
        <div className="absolute bottom-[-70px] right-[30px] grid h-[150px] w-[150px] rounded-full border-[6px] border-secondary-100 bg-secondary-100">
          <Skeleton className="animate-pulse rounded-full bg-secondary-200" />
        </div>
      </Skeleton>
      <Skeleton className="h-[46px] w-4/12 rounded-s bg-secondary-200" />
    </div>
  );
}
