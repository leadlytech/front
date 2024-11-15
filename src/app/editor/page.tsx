import { redirect } from "next/navigation";

import { routes } from "@/routes";

export default function Page() {
    redirect(routes.auth.login);
}
