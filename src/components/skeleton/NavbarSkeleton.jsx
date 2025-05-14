import { Skeleton } from "@/components/ui/skeleton"

const NavbarSkeleton = () => {
    return (
        <div className="flex items-center justify-between flex-1 px-10">
            <Skeleton className="h-12 w-12 rounded-full bg-gray-200" />
            <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-20 bg-gray-200" />
                <Skeleton className="h-12 w-20 bg-gray-200" />
            </div>
            <Skeleton className="h-12 w-12 rounded-full bg-gray-200" />
        </div>
    )
}

export default NavbarSkeleton