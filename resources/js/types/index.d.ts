export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface Produk {
    id: number;
    name: string;
    barcode: string;
    category_id: string;
    stock: number;
    purchase_price: number;
    selling_price: number;
    kategori: Kategori[];
}

export interface Kategori {
    id: number;
    name: string;
}

export interface Transaksi {
    id: number;
    total_price: number;
    transaction_date: string;
    cashier_id: number;
}

export interface Kasir {
    id: number;
    name: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
    judul: string;
    kategori: Kategori[];
    produk: Produk[];
    transaksi: Transaksi[];
    kasir: Kasir[];
};
