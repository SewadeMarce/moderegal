import Resume from "@/components/payement/Resum";
import Step from "@/components/payement/Step";
import { BtnBack } from "@/components/ui/BtnBack";

export default function Layout({
    children,
 }:
    Readonly<{ children: React.ReactNode; }>
) {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="mx-auto px-6">
                <BtnBack />
                <Step />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {children}

                    <Resume />
                </div>
            </div>
        </div>
    )
}