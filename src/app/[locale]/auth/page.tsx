import { redirect } from "@/i18n/routing";
import { routes } from "@/routes";

export default function Page({ params }: { params: { locale: string } }) {
    redirect({
        href: routes.auth.login,
        locale: params.locale,
    });
}
