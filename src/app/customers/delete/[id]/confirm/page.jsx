"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ConfirmPage() {
  const searchParams = useSearchParams();
  const [customerId, setCustomerId] = useState(null);
  
  useEffect(() => {
    if (searchParams) {
      setCustomerId(searchParams.get("customer_id") || '不明な顧客ID');
    }
  }, [searchParams]);

  return (
    <>
      <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
        <div className="alert alert-success p-4 text-center text-white">
          {customerId ? `${customerId}を削除しました` : '顧客を削除しました'}
        </div>
        <Link href="/customers" className="flex justify-center">
          <button className="btn btn-outline btn-accent">一覧に戻る</button>
        </Link>
      </div>
    </>
  );
}
