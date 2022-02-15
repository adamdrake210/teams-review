import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { User } from "next-auth";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@mui/material";

import { usePopper } from "react-popper";
import { USER_PROFILE } from "@/constants/routerConstants";

type NavDropDownMenuProps = {
  user: Partial<User>;
};

export const NavDropDownMenu = ({ user }: NavDropDownMenuProps) => {
  // Popper
  const [menuOpen, setMenuOpen] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom",
    modifiers: [
      {
        name: "offset",
        enabled: true,
        options: {
          offset: [-80, 10],
        },
      },
    ],
  });

  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="flex space-x-2">
      <button
        type="button"
        ref={setReferenceElement}
        onClick={handleMenuOpen}
        className="focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm text-center inline-flex items-center"
      >
        <Image
          className="w-40 h-40 rounded-full self-center ring-2 ring-white"
          src={user?.image}
          alt={user.name}
          width={40}
          height={40}
        />
      </button>

      <div ref={setPopperElement} style={styles.popper} {...attributes.popper}>
        <ul
          style={styles.offset}
          className={`${
            menuOpen
              ? "right-0 z-20 py-1 bg-slate-50 w-48 text-center shadow-xl"
              : "hidden"
          }`}
        >
          <li>
            <Link href={USER_PROFILE} passHref>
              <div className="block py-2 px-4 uppercase text-green-700 hover:bg-gray-200 cursor-pointer">
                Profile
              </div>
            </Link>
          </li>
          <li>
            {/* @ts-ignore */}
            <Button onClick={signOut}>Logout</Button>
          </li>
        </ul>
      </div>
    </div>
  );
};
