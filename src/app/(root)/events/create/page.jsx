'use client';

import { getAllVenues } from "@/utils/getData";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import EventBasicInfo from "./_components/EventBasicInfo";
import EventVenueSchedule from "./_components/EventVenueSchedule";
import EventSummary from "./_components/EventSummary";

export default function CreateEventPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [step, setStep] = useState(1);
    const [venues, setVenues] = useState([]);
    const [grounds, setGrounds] = useState([]);
    const [sports, setSports] = useState([]);

    // Slot related states
    const [availableSlots, setAvailableSlots] = useState([]);
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        trigger,
        getValues
    } = useForm({
        defaultValues: {
            // Step 1 Fields
            title: '',
            description: '',
            event_type: 'friendly',
            skill_level_required: 'any',
            min_Players: 1,
            max_players: 1,
            total_cost: '',
            cost_split_type: 'equal',
            current_players: [],

            // Step 2 Fields
            venue_id: '',
            ground_id: '',
            sport_type: '',
            event_date: null,
            start_time: '',
            end_time: '',
        }
    });

    // Handle authentication redirect
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    // Fetch Venues on mount
    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const { data: allVenues } = await getAllVenues();
                setVenues(allVenues || []);
            } catch (error) {
                console.error("Failed to fetch venues", error);
                setVenues([]);
            }
        };
        fetchVenues();
    }, []);

    // Fetch Slots
    const fetchSlots = async (venueId, groundId, date) => {
        setLoadingSlots(true);
        setAvailableSlots([]);
        setSelectedSlot(null);

        try {
            await new Promise(resolve => setTimeout(resolve, 800));

            const mockSlots = [
                { id: 1, start: '08:00', end: '10:00', available: true, price: 500 },
                { id: 2, start: '10:00', end: '12:00', available: true, price: 500 },
                { id: 3, start: '12:00', end: '14:00', available: false, price: 600 },
                { id: 4, start: '14:00', end: '16:00', available: true, price: 600 },
                { id: 5, start: '16:00', end: '18:00', available: true, price: 700 },
                { id: 6, start: '18:00', end: '20:00', available: false, price: 800 },
                { id: 7, start: '20:00', end: '22:00', available: true, price: 800 },
            ];
            setAvailableSlots(mockSlots);

        } catch (error) {
            console.error("Error fetching slots", error);
        } finally {
            setLoadingSlots(false);
        }
    };

    const watchVenue = watch("venue_id");
    const watchGround = watch("ground_id");
    const watchDate = watch("event_date");

    useEffect(() => {
        if (watchVenue && watchGround && watchDate) {
            fetchSlots(watchVenue, watchGround, format(watchDate, 'yyyy-MM-dd'));
        }
    }, [watchVenue, watchGround, watchDate]);


    const onSubmit = async (values) => {
        if (step !== 3) {
            handleNext();
            return;
        }

        try {
            const response = await fetch('https://app4-osju.onrender.com/api/v1/events/create-event', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session?.user?.access_token}`,
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();
            if (data?.success) {
                alert("Event created successfully!");
                router.push("/events");
            } else {
                alert(data?.message || "Failed to create event");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        }
    };

    const handleNext = async () => {
        let isValid = false;
        if (step === 1) {
            isValid = await trigger([
                'title', 'description', 'event_type', 'skill_level_required',
                'min_Players', 'max_players', 'total_cost', 'cost_split_type'
            ]);
        } else if (step === 2) {
            isValid = await trigger([
                'venue_id', 'ground_id', 'sport_type', 'event_date', 'start_time', 'end_time'
            ]);
        }

        if (isValid) {
            setStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        setStep(prev => prev - 1);
    };

    const handleSlotSelect = (slot) => {
        if (!slot.available) return;
        setSelectedSlot(slot);
        setValue('start_time', slot.start);
        setValue('end_time', slot.end);
    };

    if (status === "loading") return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <div className="flex items-center justify-center">
                        <div className="flex items-center">
                            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-gray-300 text-gray-600'}`}>
                                1
                            </div>
                            <div className="text-sm ml-2 font-medium hidden sm:block">Basic Info</div>
                        </div>
                        <div className={`w-16 h-1 mx-2 ${step >= 2 ? 'bg-primary' : 'bg-gray-300'}`}></div>
                        <div className="flex items-center">
                            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-gray-300 text-gray-600'}`}>
                                2
                            </div>
                            <div className="text-sm ml-2 font-medium hidden sm:block">Date & Venue</div>
                        </div>
                        <div className={`w-16 h-1 mx-2 ${step >= 3 ? 'bg-primary' : 'bg-gray-300'}`}></div>
                        <div className="flex items-center">
                            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 3 ? 'bg-primary text-primary-foreground' : 'bg-gray-300 text-gray-600'}`}>
                                3
                            </div>
                            <div className="text-sm ml-2 font-medium hidden sm:block">Summary</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="p-8">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {step === 1 && (
                                <EventBasicInfo
                                    register={register}
                                    control={control}
                                    errors={errors}
                                    watch={watch}
                                    handleNext={handleNext}
                                />
                            )}

                            {step === 2 && (
                                <EventVenueSchedule
                                    register={register}
                                    control={control}
                                    errors={errors}
                                    venues={venues}
                                    grounds={grounds}
                                    setGrounds={setGrounds}
                                    sports={sports}
                                    setSports={setSports}
                                    watchVenue={watchVenue}
                                    watchGround={watchGround}
                                    watchDate={watchDate}
                                    setValue={setValue}
                                    handleBack={handleBack}
                                    availableSlots={availableSlots}
                                    loadingSlots={loadingSlots}
                                    selectedSlot={selectedSlot}
                                    handleSlotSelect={handleSlotSelect}
                                />
                            )}

                            {step === 3 && (
                                <EventSummary
                                    formData={getValues()}
                                    venues={venues}
                                    grounds={grounds}
                                    handleBack={handleBack}
                                />
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}