"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx";

async function fetchCustomer(id) {
  if (!id) return null;
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_ENDPOINT + `/customers?customer_id=${id}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch customer");
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching customer:", error);
    return null;
  }
}

export default function ReadPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [customerInfo, setCustomerInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCustomer() {
      if (id) {
        const data = await fetchCustomer(id);
        setCustomerInfo(data && data.length > 0 ? data[0] : null);
      }
      setLoading(false);
    }
    
    loadCustomer();
  }, [id]);

  if (loading) return <div className="loading loading-spinner loading-lg"></div>;

  return (
    <>
      <div className="alert alert-success">更新しました</div>
      <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
        {customerInfo ? (
          <OneCustomerInfoCard {...customerInfo} />
        ) : (
          <div className="p-4">顧客情報が見つかりませんでした</div>
        )}
      </div>
      <button 
        className="btn btn-outline btn-accent"
        onClick={() => router.push("/customers")}
      >
        一覧に戻る
      </button>
    </>
  );
}
