import { SidebarTrigger } from "@/Components/ui/sidebar";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, Link, usePage } from "@inertiajs/react";

export default function Beranda({ auth }: PageProps) {
    const user = usePage().props.auth.user;
    const judul = usePage().props.judul;
    return (
        <AuthenticatedLayout>
            <Head title={judul} />
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold mb-4"> Halo {user.name}</h1>
                <h1 className="text-4xl font-bold mb-4">
                    {" "}
                    Selamat Datang di {judul}
                </h1>
            </div>

            {/* <nav className="overflow-hidden bg-white shadow-sm sm:rounded-lg flex flex-row items-center p-4">
                {auth.user ? (
                    <Link href={route("beranda")}>
                        Selamat Datang {user.name}
                    </Link>
                ) : (
                    <>
                        <Link href={route("login")}>Masuk</Link>
                        <Link href={route("register")}>Daftar</Link>
                    </>
                )}
            </nav> */}
        </AuthenticatedLayout>
    );
}
