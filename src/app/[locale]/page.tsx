import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

import { ThemeControl } from "@/components/custom";

export default function HomePage() {
    const t = useTranslations("HomePage");
    return (
        <div>
            <h1>{t("title")}</h1>
            <Link href="/about">{t("about")}</Link>
            <ThemeControl />
        </div>
    );
}
