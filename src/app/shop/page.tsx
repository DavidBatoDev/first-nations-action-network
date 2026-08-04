import { redirect } from "next/navigation";
import { EXTERNAL_LINKS } from "@/lib/external-links";

export default function ShopPage() {
  redirect(EXTERNAL_LINKS.shop);
}
