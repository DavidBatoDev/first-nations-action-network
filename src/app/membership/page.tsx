import { permanentRedirect } from "next/navigation";

/** Compatibility redirect: the page moved to /contributors. */
export default function MembershipPage() {
  permanentRedirect("/contributors");
}
