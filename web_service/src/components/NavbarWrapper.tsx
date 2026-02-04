import { getSession } from "@/lib/session";
import Navbar from "./Navbar";

export default async function NavbarWrapper() {
  const session = await getSession();
  
  return <Navbar user={session} />;
}
