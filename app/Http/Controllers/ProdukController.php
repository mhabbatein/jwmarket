<?php

namespace App\Http\Controllers;

use App\Models\{Produk, Kategori};
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProdukController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Produk/Index', [
            'judul' => 'Daftar Produk',
            'produk' => Produk::orderBy('created_at', 'desc')->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Produk/Create', [
            'judul' => 'Tambah Produk',
            'kategori' => Kategori::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'barcode' => 'required|string|max:255',
            'category_id' => 'required|exists:kategori,id',
            'stock' => 'required|integer|min:0',
            'purchase_price' => 'required|numeric|min:0',
            'selling_price' => 'required|numeric|min:0',
        ]);

        Produk::create($request->all());

        return redirect()->route('produk.index')->with('success', 'Produk berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Produk $produk)
    {
        return Inertia::render('Produk/Show', [
            'judul' => 'Detail Produk',
            'produk' => $produk
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Produk $produk)
    {
        return Inertia::render('Produk/Edit', [
            'judul' => 'Edit Produk',
            'kategori' => Kategori::all(),
            'produk' => $produk
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Produk $produk)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'barcode' => 'required|string|max:255',
            'category_id' => 'required|exists:kategori,id',
            'stock' => 'required|integer|min:0',
            'purchase_price' => 'required|numeric|min:0',
            'selling_price' => 'required|numeric|min:0',
        ]);

        $produk->update($request->all());

        return redirect()->route('produk.index')->with('success', 'Produk berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $produk = Produk::findOrFail($id);
        $produk->delete();

        return redirect()->route('produk.index')->with('success', 'Produk berhasil dihapus');
    }
}
