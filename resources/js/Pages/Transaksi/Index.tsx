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

export default function Transaksi() {
    const { transaksi, judul } = usePage<PageProps>().props;

    return (
        <AuthenticatedLayout>
            <Head title={judul} />
            <h1 className="text-2xl font-bold mb-4">{judul}</h1>
            <Link href={route("transaksi.create")}>
                <Button className="mt-4">
                    <CirclePlus />
                    Tambah Transaksi
                </Button>
            </Link>
            <Table className="mt-2">
                <TableHeader>
                    <TableRow>
                        <>Total Price</>
                        <TableHead>Transaction Date</TableHead>
                        <TableHead>Cashier ID</TableHead>
                        <TableHead>Tindakan</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transaksi.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.total_price}</TableCell>
                            <TableCell>{item.transaction_date}</TableCell>
                            <TableCell>{item.cashier_id}</TableCell>
                            <TableCell>
                                <div className="flex flex-row gap-x-2">
                                    <Button size={"icon"}>
                                        <Link
                                            href={route(`transaksi.edit`, {
                                                transaksi: item.id,
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
                                                    "Are you sure you want to delete this transaction?"
                                                )
                                            ) {
                                                Inertia.delete(
                                                    route(
                                                        "transaction.destroy",
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
