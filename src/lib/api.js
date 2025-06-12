/* 
http://localhost:8080/api/v1/turfmates/turfmate-request
http://localhost:8080/api/v1/turfmates/get-pending-requests
http://localhost:8080/api/v1/turfmates/accept-turfmate-request
http://localhost:8080/api/v1/turfmates/get-turfmates
http://localhost:8080/api/v1/turfmates/get-mutual-turfmates
*/

export const fetchTurfmates = async () => {
    const res = await fetch('http://localhost:8080/api/v1/turfmates/get-turfmates', {
        method: 'GET',
        credentials: 'include'
    });
    if (!res.ok) throw new Error("Failed to fetch turfmates");
    return res.json();
}

export const sendTurfmateRequest = async (receiverId) => {
    const res = await fetch('', {
        method: 'POST',
        // credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({receiverId})
    })
    if (!res.ok) throw new Error("Failed to send request");
    return res.json();
}