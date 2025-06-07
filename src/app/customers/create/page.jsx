"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import createCustomer from "./createCustomer";

export default function CreatePage() {
  const formRef = useRef();
  const router = useRouter();
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);

    const newErrors = {};
    if (!formData.get("customer_name")?.trim()) newErrors.customer_name = "N: 顧客名を入力してください。";
    if (!formData.get("customer_id")?.trim()) newErrors.customer_id = "ID: 顧客IDを入力してください。";
    if (!formData.get("age")?.trim()) newErrors.age = "A: 年齢を入力してください。";
    if (!formData.get("gender")?.trim()) newErrors.gender = "G: 性別を入力してください。";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // ブロック: 不完全な入力の場合は送信しない
    }

    setErrors({}); // エラーがなければクリア
    await createCustomer(formData);
    router.push(`./create/confirm?customer_id=${formData.get("customer_id")}`);
  };

  return (
    <>
      <div className="card bordered bg-white border-blue-200 border-2 max-w-md m-4">
        <div className="m-4 card bordered bg-blue-200 duration-200 hover:border-r-red">
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="card-body">
              
              <h2 className="card-title">
                <p>
                  <input
                    type="text"
                    name="customer_name"
                    placeholder="桃太郎"
                    className={`input input-bordered ${errors.customer_name ? "input-error" : ""}`}
                  />
                  {errors.customer_name && (
                    <p className="text-red-500 text-sm mt-1">{errors.customer_name}</p>
                  )}
                </p>
              </h2>
              <p>
                <span className={errors.customer_id ? "text-error" : ""}>Customer ID:</span>
                <input
                  type="text"
                  name="customer_id"
                  placeholder="C030"
                  className={`input input-bordered ${errors.customer_id ? "input-error" : ""}`}
                />
                {errors.customer_id && (
                  <p className="text-red-500 text-sm mt-1">{errors.customer_id}</p>
                )}
              </p>
              <p>
                <span className={errors.age ? "text-error" : ""}>Age:</span>
                <input
                  type="number"
                  name="age"
                  placeholder="30"
                  className={`input input-bordered ${errors.age ? "input-error" : ""}`}
                />
                {errors.age && (
                  <p className="text-red-500 text-sm mt-1">{errors.age}</p>
                )}
              </p>
              <p>
                <span className={errors.gender ? "text-error" : ""}>Gender:</span>
                <input
                  type="text"
                  name="gender"
                  placeholder="女"
                  className={`input input-bordered ${errors.gender ? "input-error" : ""}`}
                />
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                )}
              </p>
            </div>
            <div className="flex justify-center">
              <button type="submit" className="btn btn-primary m-4 text-2xl">
                作成
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
