import { permanentRedirect } from "next/navigation";

/** Compatibility redirect: the page moved to /learn. */
export default function TrainingPage() {
  permanentRedirect("/learn");
}
