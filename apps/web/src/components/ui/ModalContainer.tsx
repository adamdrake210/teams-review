import React, { ReactNode } from "react";
import { Loading } from "../Loading";

type Props = {
  handleClose: () => void;
  open: boolean;
  children: ReactNode;
  error?: Error;
};

export default function ModalContainer({ open, children, error }: Props) {
  return open ? (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div
          className="relative w-auto my-6 mx-auto max-w-3xl justify-center items-center"
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className="bg-white border-2 shadow-2xl p-8 rounded-lg">
            {!error ? children : <Loading error={error} isError />}
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  ) : null;
}
