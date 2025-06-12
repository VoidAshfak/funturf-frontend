'use client'

import { fetchTurfmates, sendTurfmateRequest } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

const Turfmates = () => {
    // const queryClient = useQueryClient();

    const { data, isPending, isError } = useQuery({
        queryKey: ["turfmates"],
        queryFn: fetchTurfmates
    })

    if (isPending) return <p>Loading...</p>;
    if (isError) return <p>Error loading turfmates</p>;

    return (
        <div>
            <h1>Your Turfmates</h1>
            <p>
                {JSON.stringify(data.data)}
            </p>
        </div>
    );
}

export default Turfmates