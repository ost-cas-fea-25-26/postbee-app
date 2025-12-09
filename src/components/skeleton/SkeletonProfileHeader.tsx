import Skeleton from './Skeleton';
import SkeletonAvatar from './SkeletonAvatar';

export default function SkeletonProfileHeader() {
  return (
    <div>
      <Skeleton className="relative mb-md h-80 w-full  items-center rounded-m bg-white px-xl py-lg rounded-lg">
        <SkeletonAvatar size="xl" className="absolute -bottom-16 right-6" />
      </Skeleton>
      <Skeleton className="h-[46px] w-4/12 rounded-sm bg-secondary-200" />
    </div>
  );
}
