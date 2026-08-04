import { redirect } from "next/navigation";
import { EXTERNAL_LINKS } from "@/lib/external-links";

export default function DonatePage() {
  redirect(EXTERNAL_LINKS.donate);
}
