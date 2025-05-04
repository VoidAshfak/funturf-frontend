import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


// const data = [
//     { id: 1, name: "Beginner", value: "BEGINNER" },
//     { id: 2, name: "Intermediate", value: "INTERMEDIATE" },
//     { id: 3, name: "Advanced", value: "ADVANCED" },
// ]


export function Options({ placeholder ,className, options }) {
    return (
        <Select>
            <SelectTrigger className={`${className}`}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {options.map((item) =>
                        <SelectItem key={item.id} value={item.value}> {item.name} </SelectItem>
                    )}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
