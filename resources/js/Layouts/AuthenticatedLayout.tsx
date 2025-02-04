import { AppSidebar } from "@/Components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar";
import { usePage } from "@inertiajs/react";
import { PropsWithChildren, ReactNode, useState } from "react";

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;

    useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <SidebarProvider>
                <AppSidebar />
                <main className="p-4 w-full bg-gray-100">{children}</main>
            </SidebarProvider>
        </div>
    );
}
