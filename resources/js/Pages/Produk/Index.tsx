import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link, usePage } from "@inertiajs/react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Button } from "@/Components/ui/button";
import { CirclePlus, SquarePen, Trash } from "lucide-react";
import { PageProps } from "@/types";

export default function Produk() {
    const { produk, judul } = usePage<PageProps>().props;

    return (
        <AuthenticatedLayout>
            <Head title={judul} />
            <h1 className="text-2xl font-bold mb-4">{judul}</h1>
            <Link href={route("produk.create")}>
                <Button className="mt-4">
                    <CirclePlus />
                    Tambah Produk
                </Button>
            </Link>
            <Table className="mt-2">
                <TableHeader>
                    <TableRow>
                        <TableHead>Nama</TableHead>
                        <TableHead>Barcode</TableHead>
                        <TableHead>Kategori</TableHead>
                        <TableHead>Stok</TableHead>
                        <TableHead>Harga Beli</TableHead>
                        <TableHead>Harga Jual</TableHead>
                        <TableHead>Tindakan</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {produk.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.barcode}</TableCell>
                            <TableCell>{item.category_id}</TableCell>
                            <TableCell>{item.stock}</TableCell>
                            <TableCell>{item.purchase_price}</TableCell>
                            <TableCell>{item.selling_price}</TableCell>
                            <TableCell>
                                <div className="flex flex-row gap-x-2">
                                    <Button size={"icon"}>
                                        <Link
                                            href={route(`produk.edit`, {
                                                produk: item.id,
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
                                                        "produk.destroy",
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
