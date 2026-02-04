import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import AdminDashboard from "./AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getSession();

  // Rediriger si non connecté
  if (!session) {
    redirect("/login");
  }

  // Rediriger si pas admin
  if (session.role_id !== 2) {
    redirect("/");
  }

  return <AdminDashboard />;
}
