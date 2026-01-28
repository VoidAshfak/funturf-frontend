import InputField from "@/components/InputField";
import MultiSelect from "@/components/MultiSelect";
import RequiredSign from "@/components/RequiredSign";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getAllVenues } from "@/utils/getData";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const players = [
    { id: 1, label: "Rizwan", value: "RIZWAN" },
    { id: 2, label: "Asif", value: "ASIF" },
    { id: 3, label: "Bappi", value: "BAPPI" },
];

export default function EventCreationForm({ setOpen }) {

    const { data: session, status } = useSession();

    if (status === "loading") return null;
    if (status === "unauthenticated") redirect("/login");

    const [venues, setVenues] = useState([]);
    const [grounds, setGrounds] = useState([]);
    const [sports, setSports] = useState([]);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        watch,
        setValue
    } = useForm({
        defaultValues: {
            title: '',
            venue_id: '',
            ground_id: '',
            sport_type: '',
            event_date: null,
            start_time: '',
            end_time: '',
            description: '',
            max_players: 1,
            min_players: 1,
            event_type: 'friendly',
            skill_level_required: 'any',
            total_cost: '',
            cost_split_type: 'equal',
            current_players: []
        }
    });

    const onSubmit = async (values) => {
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
                // setOpen(false)
            }
        } catch (error) {
            console.error(error)
        }
    };

    const fetchVenues = async () => {
        try {
            const { data: allVenues } = await getAllVenues();
            setVenues(allVenues);
        } catch (error) {
            setVenues([]);
        }
    };

    useEffect(() => {
        fetchVenues();
    }, []);

    return (
        <form
            className="space-y-5"
            onSubmit={handleSubmit(onSubmit)}
        >

            {/* title */}
            <div className="space-y-2">
                <Label>Event Title <RequiredSign /> </Label>
                <InputField errors={errors}>
                    <Input
                        type="text"
                        id="title"
                        placeholder="Enter Event Title"
                        className={`${errors?.title ? 'border-2 border-red-500' : ''}`}
                        {...register("title", {
                            required: "Event title is required"
                        })}
                    />
                </InputField>
            </div>

            {/* venue and ground */}
            <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                    <Label>Venue <RequiredSign /></Label>
                    <InputField errors={errors}>
                        <Controller
                            name="venue_id"
                            control={control}
                            rules={{ required: "Select a venue" }}
                            render={({ field }) => (
                                <Select
                                    value={field.value}
                                    onValueChange={(value) => {
                                        field.onChange(value);
                                        const grounds = venues.find(venue => venue.id === value)?.grounds;
                                        setGrounds(grounds);
                                        setValue("ground_id", "");
                                        setValue("sport_type", "");
                                        setSports([]);
                                    }}
                                >
                                    <SelectTrigger className={`w-full ${errors?.venue_id ? 'border-2 border-red-500' : ''}`}>
                                        <SelectValue placeholder="Select Venue" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {venues.map((venue) => (
                                            <SelectItem key={venue.id} value={venue.id}>
                                                {venue.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </InputField>
                </div>

                <div className="space-y-2">
                    <Label>Ground <RequiredSign /> </Label>
                    <InputField errors={errors}>
                        <Controller
                            name="ground_id"
                            control={control}
                            rules={{ required: "Select a ground" }}
                            render={({ field }) => (
                                <Select
                                    value={field.value}
                                    onValueChange={(value) => {
                                        field.onChange(value);
                                        const sports = grounds.find(ground => ground.id === value).sport_type;
                                        setSports(Array.isArray(sports) ? sports : [sports]);
                                        setValue("sport_type", "");
                                    }}
                                >
                                    <SelectTrigger
                                        className={`w-full ${errors?.ground_id ? 'border-2 border-red-500' : ''}`}
                                    >
                                        <SelectValue placeholder="Select Ground" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {grounds.map((ground) => (
                                            <SelectItem key={ground.id} value={ground.id}>{ground.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </InputField>
                </div>
            </div>

            {/* sport and date */}
            <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                    <Label>Sport<RequiredSign /> </Label>
                    <InputField errors={errors}>
                        <Controller
                            name="sport_type"
                            control={control}
                            rules={{ required: "First Select a sport" }}
                            render={({ field }) => (
                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger className={`w-full ${errors?.sport_type ? 'border-2 border-red-500' : ''}`}>
                                        <SelectValue placeholder="Select Sport" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {sports.map((sport) => (
                                            <SelectItem key={sport} value={sport}>{sport}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </InputField>
                </div>

                <div className="space-y-2">
                    <Label>Date <RequiredSign /></Label>
                    <InputField errors={errors}>
                        <Controller
                            name="event_date"
                            control={control}
                            rules={{ required: "Pick a date" }}
                            render={({ field }) => (
                                <Popover>
                                    <PopoverTrigger
                                        asChild
                                        className={`${errors?.event_date ? 'border-2 border-red-500' : ''}`}
                                    >
                                        <Button
                                            variant="outline"
                                            data-empty={!field.value}
                                            className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
                                        >
                                            <CalendarIcon />
                                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} />
                                    </PopoverContent>
                                </Popover>
                            )}
                        />
                    </InputField>
                </div>
            </div>

            {/* Start and End time */}
            <fieldset className="border border-gray-300 rounded-xl p-4">
                <legend className="px-2 text-sm  text-gray-700">Select Slot</legend>
                <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <Label>Start Time</Label>
                        <InputField errors={errors}>
                            <Input
                                type="time"
                                className={`${errors?.start_time ? 'border-2 border-red-500' : ''}`}
                                {...register('start_time', {
                                    required: 'Start time is requires'
                                })}
                            />
                        </InputField>
                    </div>
                    <div className="space-y-2">
                        <Label>End Time</Label>
                        <InputField errors={errors}>
                            <Input
                                type="time"
                                className={`${errors?.end_time ? 'border-2 border-red-500' : ''}`}
                                {...register('end_time', {
                                    required: 'End time is requires'
                                })}
                            />
                        </InputField>
                    </div>
                </div>
            </fieldset>

            {/* event details */}
            <div className="space-y-2">
                <Label>Event Details  </Label>
                <InputField errors={errors}>
                    <Textarea
                        type="text"
                        id="description"
                        placeholder="Enter Event Details Here"
                        className={`${errors?.description ? 'border-2 border-red-500' : ''}`}
                        {...register("description")}
                    />
                </InputField>
            </div>

            {/* max player, min player, event type, skill level */}
            <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                    <Label>Minimum Players Required <RequiredSign /></Label>
                    <InputField errors={errors}>
                        <Input
                            type="number"
                            className={`${errors?.min_Players ? 'border-2 border-red-500' : ''}`}
                            {...register('min_Players', {
                                required: "Enter minimum number of players required",
                                min: {
                                    value: 1,
                                    message: "Minimum players must be at least 1"
                                }
                            })}
                        />
                    </InputField>
                </div>
                <div className="space-y-2">
                    <Label>Maximum Players Required <RequiredSign /></Label>
                    <InputField errors={errors}>
                        <Input
                            type="number"
                            className={`${errors?.max_players ? 'border-2 border-red-500' : ''}`}
                            {...register('max_players', {
                                required: "Enter maximum number of players can join",
                                min: {
                                    value: 1,
                                    message: "Maximum players must be at least 1"
                                },
                                validate: (value) => {
                                    const minPlayers = Number(watch("min_Players"));
                                    return (
                                        Number(value) >= minPlayers ||
                                        `Maximum players cannot be less than minimum players (${minPlayers})`
                                    );
                                }
                            })}
                        />
                    </InputField>
                </div>

                <div className="space-y-2">
                    <Label>Event Type <RequiredSign /> </Label>
                    <InputField errors={errors}>
                        <Controller
                            name="event_type"
                            control={control}
                            rules={{ required: "Select a type" }}
                            render={({ field }) => (
                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger
                                        className={`w-full ${errors?.event_type ? 'border-2 border-red-500' : ''}`}
                                    >
                                        <SelectValue placeholder="Select Event Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="friendly">Friendly</SelectItem>
                                        <SelectItem value="tournament">Tournament</SelectItem>
                                        <SelectItem value="practice">Practice</SelectItem>
                                        <SelectItem value="league">League</SelectItem>
                                        <SelectItem value="pickup">Pickup</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </InputField>
                </div>
                <div className="space-y-2">
                    <Label>Skill Level <RequiredSign /></Label>
                    <InputField errors={errors}>
                        <Controller
                            name="skill_level_required"
                            control={control}
                            rules={{ required: "Select a skill" }}
                            render={({ field }) => (
                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Venue" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="any">Any</SelectItem>
                                        <SelectItem value="beginner">Beginner</SelectItem>
                                        <SelectItem value="intermediate">Intermediate</SelectItem>
                                        <SelectItem value="advanced">Advanced</SelectItem>
                                        <SelectItem value="professional">Professional</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </InputField>
                </div>
            </div>

            {/* event fee and cost split type */}
            <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                    <Label>Total Cost (BDT)  <RequiredSign /></Label>
                    <InputField errors={errors}>
                        <Input
                            type="number"
                            className={`${errors?.total_cost ? 'border-2 border-red-500' : ''}`}
                            {...register('total_cost', {
                                required: "Enter event cost",
                                min: {
                                    value: 1,
                                    message: "Cost must be greater than 0"
                                },
                            })}
                        />
                    </InputField>
                </div>

                <div className="space-y-2">
                    <Label>Cost Split <RequiredSign /> </Label>
                    <InputField errors={errors}>
                        <Controller
                            name="cost_split_type"
                            control={control}
                            rules={{ required: "Select a ground" }}
                            render={({ field }) => (
                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger
                                        className={`w-full ${errors?.cost_split_type ? 'border-2 border-red-500' : ''}`}
                                    >
                                        <SelectValue placeholder="Select Ground" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="equal">Equal</SelectItem>
                                        <SelectItem value="organizer_pays">Organizer Pays</SelectItem>
                                        <SelectItem value="custom">Custom</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </InputField>
                </div>
            </div>

            {/* add players */}
            <div className="space-y-2">
                <Label htmlFor="addPlayers">Add Players</Label>
                <Controller
                    name="current_players"
                    control={control}
                    render={({ field }) => (
                        <MultiSelect
                            options={players}
                            values={field.value}
                            onChange={field.onChange}
                            placeholder="Search and select names..."
                        />
                    )}
                />
            </div>

            <Button type="submit" className="w-full">Submit</Button>

        </form>
    )
}