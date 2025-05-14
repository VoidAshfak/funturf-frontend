"use client";


const logout = async (prevState, formData) => {
    await fetch("http://localhost:8080/api/v1/users/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
    }) 
};

export {
    logout
}