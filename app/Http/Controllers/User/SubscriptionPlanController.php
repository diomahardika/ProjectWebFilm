<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\SubscriptionPlan;
use App\Models\UserSubscription;
use Carbon\Carbon;

class SubscriptionPlanController extends Controller
{
    public function index()
    {
        $subscriptions = SubscriptionPlan::all();
        return Inertia::render(
            'User/Dashboard/Subscription/Index',
            compact('subscriptions')
        );
    }

    public function subscribe(SubscriptionPlan $subscriptions)
    {
        
        $data = [
            'user_id' => auth()->id(),
            'subscription_plan_id' => $subscriptions->id,
            'price' => $subscriptions->price,
            'expired_date' => Carbon::now()->addMonths($subscriptions->active_period_in_months),
            'payment_status' => 'paid'
        ];

        UserSubscription::create($data);
        return redirect(route('user.dashboard.index'));
    }
    
}
