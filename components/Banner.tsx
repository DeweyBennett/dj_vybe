"use client"

import React, { useState } from 'react'
import { Button } from './Button'
import Link from 'next/link'
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { CheckCheck } from 'lucide-react'
import { createEventBooking } from '@/lib/actions/order.actions'
 
function Banner() {
    const [formView, setFormView] = useState<boolean>(false)
    const [successView, setSuccessView] = useState<boolean>(false)
    const [contactView, setContactView] = useState<boolean>(false)
    const [eventView, setEventView] = useState<boolean>(false)
    const [logisticsView, setLogisticsView] = useState<boolean>(false)
    const [title, setTitle] = useState<string>("")
    const [date, setDate] = useState<Date>(new Date())
    const [startTime, setStartTime] = useState(new Date())
    const [endTime, setEndTime] = useState(new Date())
    const [totalHours, setTotalHours] = useState<string>("")
    const [estimatedAttendance, setEstimatedAttendance] = useState<number>(0)
    const [cost, setCost] = useState<number>(15000)
    const [locationStreet, setLocationStreet] = useState<string>('');
    const [locationCity, setLocationCity] = useState<string>('');
    const [locationState, setLocationState] = useState<string>('');
    const [locationZip, setLocationZip] = useState<string>('');
    const [hostName, setHostName] = useState<string>('');
    const [hostEmail, setHostEmail] = useState<string>('');
    const [hostPhone, setHostPhone] = useState<string>('');
    const [additionalInfo, setAdditionalInfo] = useState<string>('');

    const { user } = useUser();

    const isBlank = title == "" || totalHours == "" || locationStreet == "" || locationCity == "" || locationState == "" || locationZip == "" || hostName == "" || hostEmail == "" || hostPhone == ""
        || additionalInfo == ""

    function handleChange(e: number) {
        console.log("Estimated Cost: ", e)
        setCost(e)

        if (e == 15000) {
            setTotalHours("One Hours")
        }
        if (e == 27500) {
            setTotalHours("Two Hours")
        }
        if (e == 40000) {
            setTotalHours("Three Hours")
            console.log("Total Hours: ", totalHours)
        }
        if (e == 52500) {
            setTotalHours("Four Hours")
        }
        if (e == 65000) {
            setTotalHours("Five Hours")
        }
        if (e == 77500) {
            setTotalHours("Six Hours")
        }
    }

    function setData() {
        console.log("User: ", user)
        setHostName(user!.fullName! ? user!.fullName : '')
        setHostEmail(user!.emailAddresses.length != 0 ? user!.emailAddresses[0]!.emailAddress! : '')
        setHostPhone(user!.phoneNumbers.length != 0 ? user!.phoneNumbers[0]!.phoneNumber! : '')
    }

    const onCheckout = async () => {
        // if (formView == true && isBlank) {
        //     alert('Please include all necessary details')
        // }

        if (formView == true && !isBlank) {

            const order = {
                title: title,
                date: date.toLocaleDateString(),
                startTime: startTime.toLocaleDateString(),
                endTime: endTime.toLocaleDateString(),
                totalHours: totalHours,
                estimatedAttendance: estimatedAttendance,
                cost: cost,
                locationStreet: locationStreet,
                locationCity: locationCity,
                locationState: locationState,
                locationZip: locationZip,
                hostName: hostName,
                hostEmail: hostEmail,
                hostPhone: hostPhone,
                additionalInfo: additionalInfo,
            }

            const response = await createEventBooking(order);

            console.log("Response: ", response)

            if (response == "Complete") {
                setSuccessView(true)
                cancelFormView()
            }
        }
    }

    function cancelFormView() {
        setFormView(false)
        setContactView(false)
        setEventView(false)
        setLogisticsView(false)
        setHostName(user!.fullName!)
        setHostEmail(user!.emailAddresses.length != 0 ? user!.emailAddresses[0]!.emailAddress! : '')
        setHostPhone(user!.phoneNumbers.length != 0 ? user!.phoneNumbers[0]!.phoneNumber! : '')
        setTitle('')
        setAdditionalInfo('')
        setEstimatedAttendance(0)
        setDate(new Date())
        setStartTime(new Date())
        setEndTime(new Date())
        setTotalHours('')
        setCost(0)
        setLocationStreet('')
        setLocationCity('')
        setLocationState('')
        setLocationZip('')
    }

    return (
        <div>
            {!successView ?
                <>
                    {!formView &&
                        <div className="flex flex-col justify-center gap-8">
                            <h1 className="font-bold text-[40px] leading-[48px] lg:text-[48px] lg:leading-[60px]  xl:text-[58px] xl:leading-[74px] text-gradient">Want to book DJ Vybe for your event? Contact us today.</h1>
                            <p className="text-[20px] font-normal leading-[30px] tracking-[2%] md:font-normal md:text-[24px] md:leading-[36px] text-primary">Turn any occasion into an unforgettable experience with DJ Vybe. We will work together to curate a personalized playlist that not only mirrors your tastes but also enhances the overall ambiance of the event. Our dedication extends beyond merely providing music, we aim to craft an experience that transcends your expectations.</p>
                            <SignedOut>
                                <Button className="rounded-full h-[54px] text-[16px] font-normal leading-[24px] w-full sm:w-fit bg-secondary border-2 border-primary hover:bg-transparent hover:border-primary hover:text-secondary" variant={'secondary'} size="lg">
                                    <Link href="/auth/sign-in">
                                        Book Event
                                    </Link>
                                </Button>
                            </SignedOut>

                            <SignedIn>
                                <Button type='button' onClick={() => { setData(), setFormView(true), setContactView(true) }} size="lg" className="rounded-full h-[54px] text-[16px] font-normal leading-[24px] w-full mb-6 sm:w-fit bg-secondary border-2 border-primary hover:bg-transparent hover:border-primary hover:text-secondary">
                                    Book Event
                                </Button>
                            </SignedIn>
                        </div>
                    }

                    {formView &&
                        <div className="flex flex-col justify-center gap-8">
                            <form className=' shadow-lg shadow-primary bg-secondary p-4 rounded-lg'>
                                <h3 className='text-3xl text-center font-semibold'>Book Your Event Today!</h3>
                                {contactView &&
                                    <>
                                        <div className='flex flex-col p-2 space-x-2'>
                                            <label className='text-center text-lg font-semibold text-primary'>Host Name</label>
                                            <input value={hostName} onChange={(e) => setHostName(e.target.value)} className='outline-none border-primary focus:bg-primary text-primary focus:text-secondary focus:ring-none flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50' />
                                        </div>
                                        <div className='flex flex-col p-2 space-x-2'>
                                            <label className='text-center text-lg font-semibold text-primary'>Host Email</label>
                                            <input value={hostEmail} onChange={(e) => setHostEmail(e.target.value)} className='outline-none border-primary focus:bg-primary text-primary focus:text-secondary focus:ring-none flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50' />
                                        </div>
                                        <div className='flex flex-col p-2 space-x-2'>
                                            <label className='text-center text-lg font-semibold text-primary'>Host Phone</label>
                                            <input value={hostPhone} onChange={(e) => setHostPhone(e.target.value)} className='outline-none border-primary focus:bg-primary text-primary focus:text-secondary focus:ring-none flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50' />
                                        </div>

                                    </>
                                }

                                {eventView &&
                                    <>
                                        <div className='flex flex-col p-2 space-x-2'>
                                            <label className='text-center text-lg font-semibold text-primary'>Event Title</label>
                                            <input value={title} onChange={(e) => setTitle(e.target.value)} className='outline-none border-primary focus:bg-primary text-primary focus:text-secondary focus:ring-none flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50' />
                                        </div>
                                        <div className='flex flex-col p-2 space-x-2'>
                                            <label className='text-center text-lg font-semibold text-primary'>Additional Information</label>
                                            <input value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} className='outline-noneborder-primary focus:bg-primary text-primary focus:text-secondary focus:ring-none flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50' />
                                        </div>
                                        <div className='flex flex-col p-2 space-x-2'>
                                            <label className='text-center text-lg font-semibold text-primary'>Estimated Attendance</label>
                                            <input value={estimatedAttendance | 0} onChange={(e) => setEstimatedAttendance(parseInt(e.target.value))} className='outline-none border-primary focus:bg-primary text-primary focus:text-secondary focus:ring-none flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50' />
                                        </div>
                                    </>
                                }

                                {logisticsView &&
                                    <>
                                        <div className='flex'>
                                            <div className='flex flex-col p-2 space-x-2 justify-center items-center'>
                                                <label htmlFor="hours" className='text-center text-lg font-semibold text-primary'>Date of Event</label>
                                                <DatePicker
                                                    selected={date}
                                                    onChange={(date: any) => setDate(date!)}
                                                    // showTimeSelect
                                                    // timeIntervals={120}
                                                    // timeClassName={(time: any) => handleColor(time)}
                                                    dateFormat="MM/dd/yyyy"
                                                    className='outline-none bg-transparent border-2 border-primary rounded-md p-2 text-primary ml-0'
                                                />
                                            </div>

                                            <div className='flex flex-col p-2 space-x-2 justify-center items-center mx-auto'>
                                                <label htmlFor="hours" className='text-center text-lg font-semibold text-primary'>Estimated Cost</label>
                                                <p className='text-center text-lg text-primary'><span className=''>$</span>{cost * .01}</p>
                                            </div>
                                        </div>
                                        <div className='flex'>
                                            <div className='flex flex-col p-2 space-x-2'>
                                                <label htmlFor="hours" className='text-center text-lg font-semibold text-primary'>Start Time</label>
                                                <DatePicker
                                                    selected={startTime}
                                                    onChange={(time) => setStartTime(time!)}
                                                    showTimeSelect
                                                    showTimeSelectOnly
                                                    timeIntervals={15}
                                                    timeCaption="Time"
                                                    dateFormat="h:mm aa"
                                                    className='outline-none bg-transparent border-2 border-primary rounded-md p-2 text-primary ml-0'
                                                />
                                            </div>

                                            <div className='flex flex-col p-2 space-x-2'>
                                                <label htmlFor="hours" className='text-center text-lg font-semibold text-primary'>End Time</label>
                                                <DatePicker
                                                    selected={endTime}
                                                    onChange={(time) => setEndTime(time!)}
                                                    showTimeSelect
                                                    showTimeSelectOnly
                                                    timeIntervals={15}
                                                    timeCaption="Time"
                                                    dateFormat="h:mm aa"
                                                    className='outline-none bg-transparent border-2 border-primary rounded-md p-2 text-primary ml-0'
                                                />
                                            </div>
                                        </div>
                                        <div className='flex flex-col p-2 space-x-2'>
                                            <label htmlFor="hours" className='text-center text-lg font-semibold text-primary'>Total Hours Requested</label>
                                            <select name="hours" id="hours" onChange={(e) => handleChange(Number(e.target.value))} className='bg-transparent outline-none border-2 border-primary text-primary focus:bg-primary focus:text-secondary cursor-pointer h-12 rounded-md p-2'>
                                                <option value={15000}>One Hour</option>
                                                <option value={27500}>Two Hours</option>
                                                <option value={40000}>Three Hours</option>
                                                <option value={52500}>Four Hours</option>
                                                <option value={65000}>Five Hours</option>
                                                <option value={77500}>Six Hours</option>
                                            </select>
                                        </div>
                                        <div className='flex flex-col p-2 space-x-2'>
                                            <label className='text-center text-lg font-semibold text-primary'>Location Street</label>
                                            <input value={locationStreet} onChange={(e) => setLocationStreet(e.target.value)} className='outline-none border-primary focus:bg-primary text-primary focus:text-secondary focus:ring-none flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50' />
                                        </div>
                                        <div className='flex justify-center'>
                                            <div className='flex flex-col p-2 space-x-2'>
                                                <label className='text-center text-lg font-semibold text-primary'>City</label>
                                                <input value={locationCity} onChange={(e) => setLocationCity(e.target.value)} className='outline-none border-primary focus:bg-primary text-primary focus:text-secondary focus:ring-none flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50' />
                                            </div>
                                            <div className='flex flex-col p-2 space-x-2'>
                                                <label className='text-center text-lg font-semibold text-primary'>State</label>
                                                <input value={locationState} onChange={(e) => setLocationState(e.target.value)} className='outline-none border-primary focus:bg-primary text-primary focus:text-secondary focus:ring-none flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50' />
                                            </div>
                                            <div className='flex flex-col p-2 space-x-2'>
                                                <label className='text-center text-lg font-semibold text-primary'>Zip Code</label>
                                                <input value={locationZip} onChange={(e) => setLocationZip(e.target.value)} className='bg-transparent outline-none border-primary focus:bg-primary text-primary focus:text-secondary focus:ring-none flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50' />
                                            </div>
                                        </div>
                                    </>
                                }
                            </form>

                            {contactView &&
                                <div className='flex justify-center mb-6'>
                                    <div className="flex items-center gap-3">
                                        <Button type="button" onClick={() => { setContactView(false), setEventView(true) }} size="lg" variant="secondary" className="rounded-full h-[54px] text-[16px] font-normal leading-[24px] w-full sm:w-fit bg-secondary border-2 border-primary hover:bg-transparent hover:border-primary hover:text-secondary">
                                            Event Information
                                        </Button>

                                        <Button className="rounded-full h-[54px] text-[16px] font-normal leading-[24px] min-w-[170px] sm:w-fit bg-secondary border-2 border-primary hover:bg-transparent hover:border-primary hover:text-secondary" variant={'secondary'} size="lg" onClick={() => cancelFormView()}>
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            }

                            {eventView &&
                                <div className='flex justify-center mb-6'>
                                    <div className="flex items-center gap-3">
                                        <Button type="button" onClick={() => { setContactView(true), setEventView(false) }} size="lg" variant="secondary" className="rounded-full h-[54px] text-[16px] font-normal leading-[24px] w-full sm:w-fit bg-secondary border-2 border-primary hover:bg-transparent hover:border-primary hover:text-secondary">
                                            Contact Information
                                        </Button>

                                        <Button type="button" onClick={() => { setEventView(false), setLogisticsView(true) }} size="lg" variant="secondary" className="rounded-full h-[54px] text-[16px] font-normal leading-[24px] w-full sm:w-fit bg-secondary border-2 border-primary hover:bg-transparent hover:border-primary hover:text-secondary">
                                            Date and Time
                                        </Button>

                                        <Button className="rounded-full h-[54px] text-[16px] font-normal leading-[24px] min-w-[170px] sm:w-fit bg-secondary border-2 border-primary hover:bg-transparent hover:border-primary hover:text-secondary" variant={'secondary'} size="lg" onClick={() => cancelFormView()}>
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            }

                            {logisticsView &&
                                <div className='flex justify-center mb-6'>
                                    <div className="flex items-center gap-3">
                                        <Button type="button" onClick={() => { setEventView(true), setLogisticsView(false) }} size="lg" variant="secondary" className="rounded-full h-[54px] text-[16px] font-normal leading-[24px] w-full sm:w-fit bg-secondary border-2 border-primary hover:bg-transparent hover:border-primary hover:text-secondary">
                                            Date and Time
                                        </Button>

                                        <Button type="button" onClick={onCheckout} size="lg" variant="secondary" className="rounded-full h-[54px] text-[16px] font-normal leading-[24px] w-full sm:w-fit bg-secondary border-2 border-primary hover:bg-transparent hover:border-primary hover:text-secondary">
                                            Request Booking
                                        </Button>

                                        <Button className="rounded-full h-[54px] text-[16px] font-normal leading-[24px] min-w-[170px] sm:w-fit bg-secondary border-2 border-primary hover:bg-transparent hover:border-primary hover:text-secondary" variant={'secondary'} size="lg" onClick={() => cancelFormView()}>
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            }
                        </div>
                    }
                </>

                :
                <>
                    <div>
                        <CheckCheck className="mx-auto h-10 w-10 text-secondary" />
                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-secondary sm:text-5xl">
                            Your booking request has been received.
                        </h1>
                        <h3 className="mt-8 text-2xl leading-7 text-primary">
                            Thank you, <span className="font-extrabold text-secondary">{user!.fullName}</span>!
                        </h3>
                        <p className="mt-8 text-primary">
                            Check your purchase email{" "}
                            <span className="mx-1 font-extrabold text-secondary">{user!.emailAddresses[0].emailAddress}</span> for your confirmation. We will be getting in touch with you soon for additional details.
                        </p>
                    </div>
                </>
            }
        </div>
    )
}

export default Banner