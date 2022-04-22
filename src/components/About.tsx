import AppContainer from "./AppContainer";
import Header from "./Header";
import { useState } from "react";
import CustomModal from "./common/CustomModal";
// import { Counter } from "./mock/Counter";

export default function About() {
  const [mounted, setMounted] = useState(false);

  if (mounted) {
    return (
      <>
        <CustomModal
        // open={true}
        ></CustomModal>
      </>
    );
  } else {
    return (
      <>
        {/* <Header title="About Page" /> */}
        {/* <Counter /> */}
        <div className="my-5 mx-2 flex justify-center py-5 px-2">
          <h1 className="text-4xl font-bold">
            Filler Page for practicing Raviger :D!
          </h1>
        </div>
        <button
          onClick={(_) => {
            setMounted(true);
          }}
        >
          Open Modal
        </button>
      </>
    );
  }
}
