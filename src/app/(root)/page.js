import FeaturedTurfs from "@/sections/FeaturedTurfs";
import FeaturedEvents from "@/sections/FeaturedEvents";
import Hero from "@/sections/Hero";
import Banner from "@/sections/Banner";


export default function Home() {
    return (
        <>
            <Hero />
            <FeaturedTurfs />
            <FeaturedEvents />
            <Banner />
        </>
    );
}
