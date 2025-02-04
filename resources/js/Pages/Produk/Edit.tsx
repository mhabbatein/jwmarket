import { SubmitHandler, useForm } from "react-hook-form";
import { Head, router, usePage } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

type FormData = {
    id: number;
    name: string;
    barcode: string;
    category_id: string;
    stock: number;
    purchase_price: number;
    selling_price: number;
};

type Category = {
    id: number;
    name: string;
};

export default function EditProduk() {
    const { produk, kategori } = usePage().props as unknown as {
        produk: FormData;
        kategori: Category[];
    };
    const judul = usePage().props.judul;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: produk,
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {
        router.put(`/produk/${produk.id}`, data);
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Edit ${judul}`} />
            <Card className="max-w-2xl mx-auto mt-10">
                <CardHeader className="text-center">
                    <h2 className="text-xl font-bold">Edit Produk</h2>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <div>
                            <Label htmlFor="name">Nama Produk</Label>
                            <Input
                                id="name"
                                {...register("name", {
                                    required: "Nama produk wajib diisi",
                                })}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="barcode">Barcode</Label>
                            <Input
                                id="barcode"
                                {...register("barcode", {
                                    required: "Barcode wajib diisi",
                                })}
                            />
                            {errors.barcode && (
                                <p className="text-red-500 text-sm">
                                    {errors.barcode.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="category_id">Kategori</Label>
                            <select
                                id="category_id"
                                {...register("category_id", {
                                    required: "Kategori wajib dipilih",
                                })}
                                className="w-full border rounded px-2 py-1"
                            >
                                <option value="">Pilih Kategori</option>
                                {kategori.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            {errors.category_id && (
                                <p className="text-red-500 text-sm">
                                    {errors.category_id.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="stock">Stock</Label>
                            <Input
                                id="stock"
                                type="number"
                                {...register("stock", {
                                    required: "Stock wajib diisi",
                                    min: 0,
                                })}
                            />
                            {errors.stock && (
                                <p className="text-red-500 text-sm">
                                    {errors.stock.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="purchase_price">Harga Beli</Label>
                            <Input
                                id="purchase_price"
                                type="number"
                                {...register("purchase_price", {
                                    required: "Harga beli wajib diisi",
                                    min: 0,
                                })}
                            />
                            {errors.purchase_price && (
                                <p className="text-red-500 text-sm">
                                    {errors.purchase_price.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="selling_price">Harga Jual</Label>
                            <Input
                                id="selling_price"
                                type="number"
                                {...register("selling_price", {
                                    required: "Harga jual wajib diisi",
                                    min: 0,
                                })}
                            />
                            {errors.selling_price && (
                                <p className="text-red-500 text-sm">
                                    {errors.selling_price.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-row justify-between items-center">
                            <Button
                                type="button"
                                variant={"destructive"}
                                onClick={() => window.history.back()}
                            >
                                Batal
                            </Button>
                            <Button type="submit">Update Produk</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
