"use client";

import { getToken, isAuthenticated } from "@/utils/auth";
import { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation"
import { generateColumns, generateData } from "@/utils/generateData";
import { DataTableImageList } from "@/containers/data-table";

export default function Page() {
  const router = useRouter();

  useLayoutEffect(() => {
    const isAuth = isAuthenticated;

    if (!isAuth()) {
      router.push("/login");
    }
  }, []);

  const [imageData, setImageData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getImageLists = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/imagelist", {
          method: "GET",
          headers: {
            authorization: getToken(),
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log("data", data);
        setLoading(false);
        setImageData(data.data);
        setError("");
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      }
    };
    getImageLists();
  }, []);

  if (loading) return <p>Loading...</p>;

  const data = generateData(imageData);
  const columns = generateColumns();
  console.log(data, columns);

  const openUpload = () => {
    router.push("/imageupload");
  };
  return (
    <div className="flex flex-col">
      <button onClick={openUpload} type="button"> Upload </button>
      <DataTableImageList columns={columns} data={data} />
    </div>
  );
}
