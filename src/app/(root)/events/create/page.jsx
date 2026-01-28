'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

// Mock API function - replace with your actual API call
const fetchAvailableSlots = async (venue, ground, date) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock response data
    const slots = [
        { id: 1, time: '08:00 AM - 10:00 AM', available: true, price: 500 },
        { id: 2, time: '10:00 AM - 12:00 PM', available: true, price: 500 },
        { id: 3, time: '12:00 PM - 02:00 PM', available: false, price: 600 },
        { id: 4, time: '02:00 PM - 04:00 PM', available: true, price: 600 },
        { id: 5, time: '04:00 PM - 06:00 PM', available: true, price: 700 },
        { id: 6, time: '06:00 PM - 08:00 PM', available: false, price: 800 },
        { id: 7, time: '08:00 PM - 10:00 PM', available: true, price: 800 },
    ];

    return slots;
};

export default function EventCreationForm() {
    const [step, setStep] = useState(1);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        trigger,
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            eventName: '',
            description: '',
            eventType: '',
            expectedAttendees: '',
            venue: '',
            ground: '',
            date: '',
        },
    });

    const watchVenue = watch('venue');
    const watchGround = watch('ground');
    const watchDate = watch('date');

    // Mock data for venues and grounds
    const venues = [
        { id: 'venue1', name: 'Sports Complex A' },
        { id: 'venue2', name: 'Sports Complex B' },
        { id: 'venue3', name: 'Community Center' },
    ];

    const grounds = {
        venue1: [
            { id: 'ground1', name: 'Cricket Ground 1' },
            { id: 'ground2', name: 'Football Field' },
        ],
        venue2: [
            { id: 'ground3', name: 'Basketball Court' },
            { id: 'ground4', name: 'Tennis Court' },
        ],
        venue3: [
            { id: 'ground5', name: 'Multi-purpose Hall' },
            { id: 'ground6', name: 'Outdoor Arena' },
        ],
    };

    const handleVenueChange = (e) => {
        setValue('venue', e.target.value);
        setValue('ground', '');
        setSelectedSlot(null);
        setAvailableSlots([]);
    };

    const handleGroundOrDateChange = () => {
        setSelectedSlot(null);
    };

    const handleFetchSlots = async () => {
        if (!watchVenue || !watchGround || !watchDate) {
            alert('Please select venue, ground, and date');
            return;
        }

        setLoadingSlots(true);
        try {
            const slots = await fetchAvailableSlots(watchVenue, watchGround, watchDate);
            setAvailableSlots(slots);
        } catch (error) {
            console.error('Error fetching slots:', error);
            alert('Failed to fetch available slots');
        } finally {
            setLoadingSlots(false);
        }
    };

    const handleSlotSelect = (slot) => {
        if (slot.available) {
            setSelectedSlot(slot);
        }
    };

    const handleNext = async () => {
        let isValid = false;

        if (step === 1) {
            isValid = await trigger(['eventName', 'description', 'eventType']);
        } else if (step === 2) {
            isValid = await trigger(['venue', 'ground', 'date']);
            if (isValid && !selectedSlot) {
                alert('Please select a time slot');
                return;
            }
        }

        if (isValid || step === 2) {
            setStep(step + 1);
        }
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const onSubmit = (data) => {
        if (!selectedSlot) {
            alert('Please select a time slot');
            return;
        }

        const finalData = {
            ...data,
            selectedSlot,
        };

        console.log('Form submitted:', finalData);
        alert('Event created successfully!');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Progress Steps */}
                <div className="mb-8">
                    <div className="flex items-center justify-center">
                        <div className="flex items-center">
                            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                                1
                            </div>
                            <div className="text-sm ml-2 font-medium">Event Details</div>
                        </div>

                        <div className={`w-24 h-1 mx-4 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>

                        <div className="flex items-center">
                            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                                2
                            </div>
                            <div className="text-sm ml-2 font-medium">Venue & Slots</div>
                        </div>

                        <div className={`w-24 h-1 mx-4 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>

                        <div className="flex items-center">
                            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                                3
                            </div>
                            <div className="text-sm ml-2 font-medium">Confirmation</div>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-lg p-8">
                    {/* Step 1: Event Details */}
                    {step === 1 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Event Details</h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Event Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    {...register('eventName', {
                                        required: 'Event name is required',
                                        minLength: {
                                            value: 3,
                                            message: 'Event name must be at least 3 characters'
                                        }
                                    })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    placeholder="Enter event name"
                                />
                                {errors.eventName && (
                                    <p className="mt-1 text-sm text-red-600">{errors.eventName.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Event Type <span className="text-red-500">*</span>
                                </label>
                                <select
                                    {...register('eventType', {
                                        required: 'Event type is required'
                                    })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                >
                                    <option value="">Select event type</option>
                                    <option value="sports">Sports Event</option>
                                    <option value="conference">Conference</option>
                                    <option value="workshop">Workshop</option>
                                    <option value="tournament">Tournament</option>
                                    <option value="other">Other</option>
                                </select>
                                {errors.eventType && (
                                    <p className="mt-1 text-sm text-red-600">{errors.eventType.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    {...register('description', {
                                        required: 'Description is required',
                                        minLength: {
                                            value: 10,
                                            message: 'Description must be at least 10 characters'
                                        }
                                    })}
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    placeholder="Enter event description"
                                />
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Expected Attendees
                                </label>
                                <input
                                    type="number"
                                    {...register('expectedAttendees', {
                                        min: {
                                            value: 1,
                                            message: 'Number of attendees must be at least 1'
                                        }
                                    })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    placeholder="Enter expected number of attendees"
                                />
                                {errors.expectedAttendees && (
                                    <p className="mt-1 text-sm text-red-600">{errors.expectedAttendees.message}</p>
                                )}
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Venue & Slot Selection */}
                    {step === 2 && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Venue & Slot Selection</h2>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Left Side: Selection Panel */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Select Venue <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            {...register('venue', {
                                                required: 'Venue is required'
                                            })}
                                            onChange={handleVenueChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                        >
                                            <option value="">Choose a venue</option>
                                            {venues.map(venue => (
                                                <option key={venue.id} value={venue.id}>
                                                    {venue.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.venue && (
                                            <p className="mt-1 text-sm text-red-600">{errors.venue.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Select Ground <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            {...register('ground', {
                                                required: 'Ground is required'
                                            })}
                                            onChange={(e) => {
                                                setValue('ground', e.target.value);
                                                handleGroundOrDateChange();
                                            }}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                            disabled={!watchVenue}
                                        >
                                            <option value="">Choose a ground</option>
                                            {watchVenue && grounds[watchVenue]?.map(ground => (
                                                <option key={ground.id} value={ground.id}>
                                                    {ground.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.ground && (
                                            <p className="mt-1 text-sm text-red-600">{errors.ground.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Select Date <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            {...register('date', {
                                                required: 'Date is required'
                                            })}
                                            onChange={(e) => {
                                                setValue('date', e.target.value);
                                                handleGroundOrDateChange();
                                            }}
                                            min={new Date().toISOString().split('T')[0]}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                        />
                                        {errors.date && (
                                            <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
                                        )}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleFetchSlots}
                                        disabled={!watchVenue || !watchGround || !watchDate || loadingSlots}
                                        className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                                    >
                                        {loadingSlots ? 'Loading Slots...' : 'Check Availability'}
                                    </button>

                                    {selectedSlot && (
                                        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                            <h3 className="font-semibold text-blue-900 mb-2">Selected Slot</h3>
                                            <p className="text-blue-800">{selectedSlot.time}</p>
                                            <p className="text-blue-700 text-sm mt-1">Price: ৳{selectedSlot.price}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Right Side: Slot Availability */}
                                <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Available Slots</h3>

                                    {availableSlots.length === 0 && !loadingSlots && (
                                        <div className="text-center py-12 text-gray-500">
                                            <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <p>Select venue, ground, and date to view available slots</p>
                                        </div>
                                    )}

                                    {loadingSlots && (
                                        <div className="text-center py-12">
                                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                                            <p className="mt-3 text-gray-600">Loading available slots...</p>
                                        </div>
                                    )}

                                    <div className="space-y-3">
                                        {availableSlots.map(slot => (
                                            <div
                                                key={slot.id}
                                                onClick={() => handleSlotSelect(slot)}
                                                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${!slot.available
                                                        ? 'bg-gray-200 border-gray-300 cursor-not-allowed opacity-60'
                                                        : selectedSlot?.id === slot.id
                                                            ? 'bg-blue-100 border-blue-500'
                                                            : 'bg-white border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                                                    }`}
                                            >
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <p className="font-medium text-gray-800">{slot.time}</p>
                                                        <p className="text-sm text-gray-600 mt-1">৳{slot.price}</p>
                                                    </div>
                                                    <div>
                                                        {slot.available ? (
                                                            <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                                                                Available
                                                            </span>
                                                        ) : (
                                                            <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">
                                                                Booked
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between mt-8">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                                >
                                    Back
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    disabled={!selectedSlot}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Confirmation */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Confirmation</h2>

                            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Event Name</h3>
                                    <p className="text-lg text-gray-800 mt-1">{watch('eventName')}</p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Event Type</h3>
                                    <p className="text-lg text-gray-800 mt-1 capitalize">{watch('eventType')}</p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Description</h3>
                                    <p className="text-gray-800 mt-1">{watch('description')}</p>
                                </div>

                                {watch('expectedAttendees') && (
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Expected Attendees</h3>
                                        <p className="text-lg text-gray-800 mt-1">{watch('expectedAttendees')}</p>
                                    </div>
                                )}

                                <div className="border-t pt-4">
                                    <h3 className="text-sm font-medium text-gray-500">Venue</h3>
                                    <p className="text-lg text-gray-800 mt-1">
                                        {venues.find(v => v.id === watch('venue'))?.name}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Ground</h3>
                                    <p className="text-lg text-gray-800 mt-1">
                                        {watchVenue && grounds[watchVenue]?.find(g => g.id === watch('ground'))?.name}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Date</h3>
                                    <p className="text-lg text-gray-800 mt-1">
                                        {watch('date') && new Date(watch('date')).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Time Slot</h3>
                                    <p className="text-lg text-gray-800 mt-1">{selectedSlot?.time}</p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Price</h3>
                                    <p className="text-xl font-bold text-green-600 mt-1">৳{selectedSlot?.price}</p>
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    Create Event
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}