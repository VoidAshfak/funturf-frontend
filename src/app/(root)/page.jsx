import FeaturedTurfs from "@/sections/FeaturedTurfs";
import FeaturedEvents from "@/sections/FeaturedEvents";
import Hero from "@/sections/Hero";
import Banner from "@/sections/Banner";
import Turfmates from "@/components/Turfmates";


export default function Home() {
    return (
        <>
            <Hero />
            <Turfmates />
            <FeaturedTurfs />
            <FeaturedEvents />
            <Banner />
        </>
    );
}
