import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { PageProps } from "@/types";
import { Button } from "@/Components/ui/button";
import { CirclePlus, SquarePen, Trash } from "lucide-react";
import { Inertia } from "@inertiajs/inertia";

export default function Kasir() {
    const { kasir, judul } = usePage<PageProps>().props;

    return (
        <AuthenticatedLayout>
            <Head title={judul} />
            <h1 className="text-2xl font-bold mb-4">{judul}</h1>
            <Link href={route("kasir.create")}>
                <Button className="mt-4">
                    <CirclePlus />
                    Tambah Kasir
                </Button>
            </Link>
            <Table className="mt-2">
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Tindakan</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {kasir.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>
                                <div className="flex flex-row gap-x-2">
                                    <Button size={"icon"}>
                                        <Link
                                            href={route(`kasir.edit`, {
                                                kasir: item.id,
                                            })}
                                        >
                                            <SquarePen />
                                        </Link>
                                    </Button>
                                    <Button
                                        variant={"destructive"}
                                        size={"icon"}
                                        onClick={() => {
                                            if (
                                                confirm(
                                                    "Are you sure you want to delete this product?"
                                                )
                                            ) {
                                                Inertia.delete(
                                                    route(
                                                        "kasir.destroy",
                                                        item.id
                                                    )
                                                );
                                            }
                                        }}
                                    >
                                        <Trash />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </AuthenticatedLayout>
    );
}
