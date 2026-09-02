import { permanentRedirect } from "next/navigation";

/** Compatibility redirect: the application moved to /contributors/apply. */
export default function MembershipApplyPage() {
  permanentRedirect("/contributors/apply");
}
