import Authenticated from "@/Layouts/Authenticated/Index";
import SubscriptionCard from "@/Components/SubscriptionCard";
import { router } from "@inertiajs/react";
export default function SubscriptionPlan({ auth, subscriptions }) {
    const selectSubscription = (id) => {
        router.post(
            route("user.dashboard.subscription.subscribe", {
                subscriptions: id,
            })
        );
    };

    return (
        <Authenticated auth={auth}>
            {/* <!-- START: Content --> */}
            <div className="py-20 flex flex-col items-center">
                <div className="text-black font-semibold text-[26px] mb-3">
                    Pricing for Everyone
                </div>
                <p className="text-base text-gray-1 leading-7 max-w-[302px] text-center">
                    Invest your little money to get a whole new experiences from
                    movies.
                </p>

                {/* <!-- Pricing Card --> */}
                <div className="flex justify-center gap-10 mt-[70px]">
                    {subscriptions.map((subscription) => (
                        <SubscriptionCard
                            name={subscription.name}
                            price={subscription.price}
                            durationInMonth={
                                subscription.active_period_in_months
                            }
                            features={JSON.parse(subscription.features)}
                            isPremium={subscription.name === "Premium"}
                            key={subscription.id}
                            onSelectSubscription={() =>
                                selectSubscription(subscription.id)
                            }
                        />
                    ))}
                </div>
                {/* <!-- /Pricing Card --> */}
            </div>
            {/* <!-- END: Content --> */}
        </Authenticated>
    );
}
