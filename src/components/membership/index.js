'use client'

import { membershipPlans } from "@/utils";
import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";
import { createPriceIdAction, createStripePaymentAction, updateProfileAction } from "@/actions";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const publishKey = process.env.NEXT_PUBLIC_SPK
const stripePromise = loadStripe(publishKey);

const MembershipPage = ({ profile }) => {
    console.log(profile);
    const pathName = useSearchParams();
    async function handlePayment(plan) {
        const stripe = await stripePromise
        const priceId = await createPriceIdAction({
            amount: Number(plan?.price)
        });
        if (priceId) {
            sessionStorage.setItem('currentPlan', JSON.stringify(plan))
            const result = await createStripePaymentAction({
                lineItems: [
                    {
                        price: priceId?.id,
                        quantity: 1
                    }
                ]
            })
            await stripe.redirectToCheckout({
                sessionId: result?.id
            })
        }
    }

    async function updateProfile() {
        const currentPlan = JSON.parse(sessionStorage.getItem('currentPlan'));
        await updateProfileAction({
            ...profile,
            isPremiumUser: true,
            memberShipType: currentPlan?.type,
            memberShipStartDate: new Date().toString(),
            memberShipEndDate: new Date(
                new Date().getFullYear() + currentPlan?.type === 'Basic' ? 1 : currentPlan?.type === 'Professional' ? 2 : 5, new Date().getMonth(), new Date().getDay()
            ),
        }, '/membership');
    }

    useEffect( () => {
        if (pathName.get('status') === 'success') updateProfile();
    } , [pathName]);

    return (
        <div className="mx-auto max-w-7xl">
            <div className="flex items-baseline justify-between border-b dark:border-white pb-6 pt-24">
                <h1 className="text-4xl font-bold tracking-tighter">
                    {
                        profile?.isPremiumUser ? 'You are a premium user' : 'Choose Your Best Plan'
                    }
                </h1>
                <div>
                    {profile?.isPremiumUser ? (
                        <Button className="flex h-11 items-center justify-center px-5">
                            {
                                membershipPlans.find(
                                    (planItem) => planItem.type === profile?.memberShipType
                                ).heading
                            }
                        </Button>
                    ) : null}
                </div>
            </div>
            <div className="py-20 pb-24 pt-6">
                <div className="container mx-auto p-0 space-y-8">
                    <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                        {
                            membershipPlans.map(plan =>
                                <CommonCard
                                    title={`$ ${plan.price} /yr`}
                                    icon={<div className="flex justify-between">
                                        <JobIcon />
                                        <h1 className="font-bold text-2xl dark:text-black">{plan.heading}</h1>
                                    </div>}
                                    description={plan.type}
                                    footerContent={<Button
                                        onClick={() => handlePayment(plan)}
                                        className='disabled:opacity-60 flex h-11 dark:bg-[#fffa27] items-center justify-center px-5'>Get Premium</Button>}
                                />)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MembershipPage;