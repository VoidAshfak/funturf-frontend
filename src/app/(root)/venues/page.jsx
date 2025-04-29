"use client"

import { useState, useMemo } from "react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export default function Component() {
    const [selectedFilters, setSelectedFilters] = useState({
        category: [],
        priceRange: { min: 0, max: 0 },
        sortBy: "featured",
    })

    const items = [
        {
            id: 1,
            name: "Cozy Blanket",
            description: "Warm and Soft for Chilly Nights",
            price: 29.99,
        },
        {
            id: 2,
            name: "Autumn Mug",
            description: "Enjoy Your Hot Beverages in Style",
            price: 12.99,
        },
        {
            id: 3,
            name: "Fall Fragrance Candle",
            description: "Fill Your Space with a Cozy Scent",
            price: 16.99,
        },
        {
            id: 4,
            name: "Autumn Leaves Wall Art",
            description: "Decorate Your Space with Nature's Beauty",
            price: 39.99,
        },
        {
            id: 5,
            name: "Fall Harvest Wreath",
            description: "Welcome the Season with a Beautiful Wreath",
            price: 49.99,
        },
        {
            id: 6,
            name: "Spiced Apple Cider Syrup",
            description: "Enhance Your Drinks with Delicious Syrup",
            price: 12.99,
        },
        {
            id: 7,
            name: "Fall Foliage Table Runner",
            description: "Decorate Your Table with Autumn Leaves",
            price: 19.99,
        },
        {
            id: 8,
            name: "Fall Fashion Hat",
            description: "Complete Your Autumn Outfit with a Stylish Hat",
            price: 24.99,
        },
    ]


    const filteredItems = useMemo(() => {
        return items
            .filter((item) => {
                if (selectedFilters.category.length > 0) {
                    return selectedFilters.category.includes(item.name.toLowerCase().replace(/\s/g, ""))
                }
                return true
            })
            .filter((item) => {
                if (selectedFilters.priceRange.min > 0 || selectedFilters.priceRange.max > 0) {
                    return item.price >= selectedFilters.priceRange.min && item.price <= selectedFilters.priceRange.max
                }
                return true
            })
            .sort((a, b) => {
                switch (selectedFilters.sortBy) {
                    case "featured":
                        return b.featured - a.featured
                    case "lowToHigh":
                        return a.price - b.price
                    case "highToLow":
                        return b.price - a.price
                    default:
                        return 0
                }
            })
    }, [selectedFilters])


    const handleFilterChange = (type, value) => {
        switch (type) {
            case "category":
                setSelectedFilters({
                    ...selectedFilters,
                    category: selectedFilters.category.includes(value)
                        ? selectedFilters.category.filter((item) => item !== value)
                        : [...selectedFilters.category, value],
                })
                break
            case "priceRange":
                setSelectedFilters({
                    ...selectedFilters,
                    priceRange: value,
                })
                break
            case "sortBy":
                setSelectedFilters({
                    ...selectedFilters,
                    sortBy: value,
                })
                break
            default:
                break
        }
    }

    
    return (
        <section className="w-full py-12">
            <div className="container grid gap-6 md:gap-8 px-4 md:px-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                    <div className="grid gap-1">
                        <h1 className="text-2xl font-bold tracking-tight">Fall Collection</h1>
                        <p className="text-gray-500 dark:text-gray-400">
                            Discover Cozy Elegance: The Fall Collection for a Stylish Season Ahead
                        </p>
                    </div>
                </div>
                <div className="grid md:grid-cols-[240px_1fr] gap-6 md:gap-8">
                    <Accordion type="single" collapsible className="w-full" defaultValue="filters">
                        <AccordionItem value="filters">
                            <AccordionTrigger className="text-base">Filters</AccordionTrigger>
                            <AccordionContent>
                                <div className="grid gap-4">
                                    <div>
                                        <h3 className="font-medium mb-2">Category</h3>
                                        <div className="grid gap-2">
                                            <Label className="flex items-center gap-2 font-normal">
                                                <Checkbox onCheckedChange={() => handleFilterChange("category", "cozyblanket")} />
                                                Cozy Blanket
                                            </Label>
                                            <Label className="flex items-center gap-2 font-normal">
                                                <Checkbox onCheckedChange={() => handleFilterChange("category", "autumnmug")} />
                                                Autumn Mug
                                            </Label>
                                            <Label className="flex items-center gap-2 font-normal">
                                                <Checkbox onCheckedChange={() => handleFilterChange("category", "fallfragrancecandle")} />
                                                Fall Fragrance Candle
                                            </Label>
                                            <Label className="flex items-center gap-2 font-normal">
                                                <Checkbox onCheckedChange={() => handleFilterChange("category", "autumnleaveswall")} />
                                                Autumn Leaves Wall Art
                                            </Label>
                                            <Label className="flex items-center gap-2 font-normal">
                                                <Checkbox onCheckedChange={() => handleFilterChange("category", "fallharvestwreath")} />
                                                Fall Harvest Wreath
                                            </Label>
                                            <Label className="flex items-center gap-2 font-normal">
                                                <Checkbox onCheckedChange={() => handleFilterChange("category", "spicedapplecider")} />
                                                Spiced Apple Cider Syrup
                                            </Label>
                                            <Label className="flex items-center gap-2 font-normal">
                                                <Checkbox onCheckedChange={() => handleFilterChange("category", "fallfoliagetable")} />
                                                Fall Foliage Table Runner
                                            </Label>
                                            <Label className="flex items-center gap-2 font-normal">
                                                <Checkbox onCheckedChange={() => handleFilterChange("category", "fallfashionhat")} />
                                                Fall Fashion Hat
                                            </Label>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-medium mb-2">Price Range</h3>
                                        <div />
                                    </div>
                                    <div>
                                        <h3 className="font-medium mb-2">Sort By</h3>
                                        <RadioGroup
                                            value={selectedFilters.sortBy}
                                            onValueChange={(value) => handleFilterChange("sortBy", value)}
                                        >
                                            <div className="grid gap-2">
                                                <Label className="flex items-center gap-2 font-normal">
                                                    <RadioGroupItem value="featured" />
                                                    Featured
                                                </Label>
                                                <Label className="flex items-center gap-2 font-normal">
                                                    <RadioGroupItem value="lowToHigh" />
                                                    Price: Low to High
                                                </Label>
                                                <Label className="flex items-center gap-2 font-normal">
                                                    <RadioGroupItem value="highToLow" />
                                                    Price: High to Low
                                                </Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <div className="grid gap-6 md:gap-8">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredItems.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-medium">{item.name}</TableCell>
                                        <TableCell>{item.description}</TableCell>
                                        <TableCell>${item.price.toFixed(2)}</TableCell>
                                        <TableCell>
                                            <Button size="sm">Add to Cart</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </section>
    )
}