import React, { useState, useEffect } from "react";
import { formDataType, formFieldType } from "../../types/formTypes";

export default function Modal(props: {
  // children: React.ReactNode;
  // open: boolean;
  // closeCB: () => void;
}) {
  // const [mountStatus, setMountStatus] = useState(false);

  return (
    <>
      <div>Hello!</div>
      <div className="flex w-100 h-100 min-h-screen items-center h-100 bg-gray-500 opacity-100 z-10">
        <div className="bg-white p-4 rounded-md mx-auto my-auto text-black z-20 opacity-100">Hello there!</div>
      </div>
    </>
  );
}
