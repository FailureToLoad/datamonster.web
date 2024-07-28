"use client";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Avatar,
} from "@nextui-org/react";

type UserDropdownProps = {
  email: string;
};

export default function UserDropdown({ email }: UserDropdownProps) {
  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          name="you"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">{email}</p>
        </DropdownItem>
        <DropdownItem key="settlements" href="/settlements">
          Settlement Selection
        </DropdownItem>
        <DropdownItem key="signout" color="danger" href="/signout">
          Sign Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
