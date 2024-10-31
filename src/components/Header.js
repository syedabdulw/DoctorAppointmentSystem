import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Header() {
  const session = { name: "Bilal" };
  return (
    <div className="bg-secondary py-3">
      <div className="flex container mx-auto justify-between">
        <h1 className="text-xl font-bold font-mono">LOGO</h1>
        {session ? (
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger className={"border-none bg-transparent p-0"}>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>DAS</AvatarFallback>
                </Avatar>
              </MenubarTrigger>
              <MenubarContent>
                <Link href={"/profile"}>
                  <MenubarItem>Profile</MenubarItem>
                </Link>
                <MenubarSeparator />
                <Link href={"/appointments"}>
                  <MenubarItem>My Appointments</MenubarItem>
                </Link>

                <MenubarSeparator />
                <MenubarItem>Logout</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        ) : (
          <Link href={"/signin"}>
            <Button variant={"outline"}>Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
