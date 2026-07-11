import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";
// import { useForm } from "react-router-dom";
import toast from "react-hot-toast";
import { Check, Coins, Sparkles, Zap, ShieldCheck } from "lucide-react";
import { CreditPlans } from "../utils/CreditPlans";
import { GlobalLoader } from "../components/Loaders";
const Pricing = () => {
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);
  const { token, user, setUser } = useAuth();

  const handlePayment = async (packId) => {
    setIsVerifyingPayment(true);
    console.log("ID", packId);
    try {
      const res = await axiosInstance.post(
        "/api/payment/create",
        { packId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("Payment", res.data);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: res.data.order.amount,
        currency: res.data.order.currency,
        name: "InterviewIQ",
        description: "Purchase Interview Credits",
        order_id: res.data.order.id,

        handler: async function (response) {
          console.log("Payment successful:", response);
          const res = await axiosInstance.post(
            "/api/payment/verify",
            response,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          setUser(res.data.user);
          toast.success("Payment successful");
        },

        prefill: {
          name: user?.name,
          email: user?.email,
        },

        theme: {
          color: "#6A0002",
        },
        modal: {
          ondismiss: () => {
            console.log("Payment window closed");
          },
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", (response) => {
        console.error(response.error);
        toast.error("Payment failed");
      });

      rzp.open();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Could not start payment");
    } finally {
      setIsVerifyingPayment(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-10 max-w-4xl mx-auto text-linen-950 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-linen-950 sm:text-4xl lg:text-5xl">
            Choose the right plan for your
            <span className="text-dark-garnet"> interview practice</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-linen-600 sm:text-base">
            Buy credits and use them whenever you want to practice interviews,
            improve your answers, and track your performance.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3 lg:mt-14 lg:gap-6">
          {Object.entries(CreditPlans).map(([planId, plan]) => {
            const isPopular = planId === "popular";

            return (
              <div
                key={planId}
                className={`relative flex flex-col overflow-hidden rounded-3xl border bg-linen-50 transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  isPopular
                    ? "border-2 border-dark-garnet shadow-lg shadow-dark-garnet/10"
                    : "border-linen-300 shadow-sm"
                }`}
              >
                {/* Popular badge */}
                {isPopular && (
                  <div className="bg-dark-garnet px-4 py-2 text-center text-xs font-semibold uppercase tracking-widest text-linen-50">
                    Most Popular
                  </div>
                )}

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  {/* Plan icon */}
                  <div
                    className={`flex size-12 items-center justify-center rounded-2xl ${
                      isPopular
                        ? "bg-dark-garnet text-linen-50"
                        : "bg-dark-garnet-50 text-dark-garnet"
                    }`}
                  >
                    {planId === "default" && <Coins size={23} />}
                    {planId === "popular" && <Zap size={23} />}
                    {planId === "pro" && <Sparkles size={23} />}
                  </div>

                  {/* Plan information */}
                  <div className="mt-5">
                    <h2 className="text-xl font-bold text-linen-950">
                      {plan.name}
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-linen-600">
                      {planId === "default" &&
                        "Free trail available from InterviewIQ to pratice few interviews."}

                      {planId === "popular" &&
                        "The best choice for regular practice and improving your interview skills."}

                      {planId === "pro" &&
                        "Built for serious preparation with plenty of credits for more practice."}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mt-7 flex items-end gap-1">
                    <span className="text-4xl font-bold tracking-tight text-dark-garnet sm:text-5xl">
                      {planId === "default" ? "Free" : `₹${plan.price}`}
                    </span>

                    <span className="mb-1 text-sm text-linen-500">
                      {planId != "default" && "one time"}
                    </span>
                  </div>

                  {/* Credits */}
                  <div className="mt-5 rounded-2xl border border-linen-200 bg-linen-100 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs text-linen-600">
                          {planId === "default"
                            ? "You have received"
                            : "You will receive"}
                        </p>

                        <p className="mt-1 text-2xl font-bold text-linen-950">
                          {plan.credits}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 rounded-full bg-dark-garnet-50 px-3 py-1.5 text-xs font-semibold text-dark-garnet">
                        <Coins size={14} />
                        Credits
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mt-6 flex-1 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-dark-garnet-50">
                        <Check size={12} className="text-dark-garnet" />
                      </div>

                      <p className="text-sm text-linen-700">
                        AI-powered mock interviews
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-dark-garnet-50">
                        <Check size={12} className="text-dark-garnet" />
                      </div>

                      <p className="text-sm text-linen-700">
                        Detailed performance reports
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-dark-garnet-50">
                        <Check size={12} className="text-dark-garnet" />
                      </div>

                      <p className="text-sm text-linen-700">
                        Resume-based interview questions
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-dark-garnet-50">
                        <Check size={12} className="text-dark-garnet" />
                      </div>

                      <p className="text-sm text-linen-700">
                        Credits never expire
                      </p>
                    </div>
                  </div>

                  {/* Buy button */}
                  {planId !== "default" && (
                    <button
                      type="button"
                      onClick={() => handlePayment(planId)}
                      className={`mt-7 w-full rounded-xl px-5 py-3.5 text-sm font-semibold transition ${
                        isPopular
                          ? "bg-dark-garnet text-linen-50 hover:bg-dark-garnet-900"
                          : "border border-dark-garnet bg-linen-50 text-dark-garnet hover:bg-dark-garnet hover:text-linen-50"
                      }`}
                    >
                      {planId === "default" ? null : `Buy ${plan.name}`}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom trust section */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 rounded-2xl border border-linen-300 bg-linen-50 px-5 py-5 text-center sm:flex-row sm:text-left">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-dark-garnet-50">
            <ShieldCheck size={20} className="text-dark-garnet" />
          </div>

          <div>
            <p className="text-sm font-semibold text-linen-900">
              Secure one-time payment
            </p>

            <p className="mt-0.5 text-xs leading-5 text-linen-600">
              Your payment is processed securely. Credits are added to your
              account after successful payment verification.
            </p>
          </div>
        </div>
      </div>
      {isVerifyingPayment && <GlobalLoader />}
    </div>
  );
};

export default Pricing;
