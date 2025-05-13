"use client";

const login = async (prevState, formData) => {
    // console.log(formData.get("email"), formData.get("password"));
    const res = await fetch("http://localhost:8080/api/v1/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            email: formData.get("email"),
            password: formData.get("password")
        })
    })
    const data = await res.json()    
    return data
};

export {
    login
}