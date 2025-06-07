"use client";
import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx";
import fetchCustomer from "./fetchCustomer";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function CustomerConfirmContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const customer_id = searchParams ? searchParams.get("customer_id") : null;
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndSetCustomer = async () => {
      if (customer_id) {
        try {
          const customerData = await fetchCustomer(customer_id);
          setCustomer(customerData);
        } catch (error) {
          console.error('Error fetching customer data:', error);
        }
      }
      setLoading(false);
    };
    fetchAndSetCustomer();
  }, [customer_id]);

  if (loading) return <div className="loading loading-spinner loading-lg"></div>;

  return (
    <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
      <div className="alert alert-success p-4 text-center">
        正常に作成しました
      </div>
      {customer && <OneCustomerInfoCard {...customer} />}
      <button onClick={() => router.push("/customers")}>
        <div className="btn btn-primary m-4 text-2xl">戻る</div>
      </button>
    </div>
  );
}

export default function ConfirmPage() {
  return (
    <Suspense fallback={<div className="loading loading-spinner loading-lg"></div>}>
      <CustomerConfirmContent />
    </Suspense>
  );
}
