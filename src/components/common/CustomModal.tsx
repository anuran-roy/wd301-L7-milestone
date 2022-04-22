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
      <div className="w-100 h-100 h-100 z-10 flex min-h-screen items-center bg-gray-500 opacity-100">
        <div className="z-20 mx-auto my-auto rounded-md bg-white p-4 text-black opacity-100">
          Hello there!
        </div>
      </div>
    </>
  );
}
