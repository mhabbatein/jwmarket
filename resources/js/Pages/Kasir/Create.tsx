import { SubmitHandler, useForm } from "react-hook-form";
import { Head, router, usePage } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

type FormData = {
    name: string;
};

export default function CreateKasir() {
    const judul = usePage().props.judul;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = (data) => {
        router.post("/kasir", data);
    };

    return (
        <AuthenticatedLayout>
            <Head title={judul} />
            <Card className="max-w-2xl mx-auto mt-10">
                <CardHeader className="text-center">
                    <h2 className="text-xl font-bold">Tambah Kasir</h2>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <div>
                            <Label htmlFor="name">Nama Kasir</Label>
                            <Input
                                id="name"
                                {...register("name", {
                                    required: "Nama kasir wajib diisi",
                                })}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm">
                                    {errors.name.message}
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
                            <Button type="submit">Simpan Kasir</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
