import { SubmitHandler, useForm } from "react-hook-form";
import { Head, router, usePage } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

type FormData = {
    id: number;
    total_price: number;
    transaction_date: string;
    cashier_id: number;
};

export default function EditTransaksi() {
    const { transaksi, kasir } = usePage().props as unknown as {
        transaksi: FormData;
        kasir: { id: number; name: string }[];
    };
    const judul = usePage().props.judul;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: transaksi,
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {
        router.put(`/transaksi/${transaksi.id}`, data);
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Edit ${judul}`} />
            <Card className="max-w-2xl mx-auto mt-10">
                <CardHeader className="text-center">
                    <h2 className="text-xl font-bold">Edit Transaksi</h2>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <div>
                            <Label htmlFor="total_price">Total Harga</Label>
                            <Input
                                id="total_price"
                                type="number"
                                {...register("total_price", {
                                    required: "Total harga wajib diisi",
                                    min: {
                                        value: 0,
                                        message: "Total minimal 0",
                                    },
                                })}
                            />
                            {errors.total_price && (
                                <p className="text-red-500 text-sm">
                                    {errors.total_price.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="transaction_date">
                                Tanggal Transaksi
                            </Label>
                            <Input
                                id="transaction_date"
                                type="date"
                                {...register("transaction_date", {
                                    required: "Tanggal transaksi wajib diisi",
                                })}
                            />
                            {errors.transaction_date && (
                                <p className="text-red-500 text-sm">
                                    {errors.transaction_date.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="cashier_id">Kasir</Label>
                            <select
                                id="cashier_id"
                                {...register("cashier_id", {
                                    required: "Kasir wajib dipilih",
                                })}
                                className="w-full border rounded px-2 py-1"
                            >
                                <option value="">Pilih Kasir</option>
                                {kasir &&
                                    kasir.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.name}
                                        </option>
                                    ))}
                            </select>
                            {errors.cashier_id && (
                                <p className="text-red-500 text-sm">
                                    {errors.cashier_id.message}
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
                            <Button type="submit">Update Transaksi</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
