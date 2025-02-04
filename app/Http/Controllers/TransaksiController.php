<?php

namespace App\Http\Controllers;

use App\Models\Transaksi;
use App\Http\Controllers\Controller;
use App\Models\Kasir;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransaksiController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Transaksi/Index', [
            'judul' => 'Daftar Transaksi',
            'transaksi' => Transaksi::orderBy('created_at', 'desc')->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Transaksi/Create', [
            'judul' => 'Tambah Transaksi',
            'kasir' => Kasir::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'total_price' => 'required|numeric|min:0',
            'transaction_date' => 'required|date',
            'cashier_id' => 'required|exists:kasir,id',

        ]);

        Transaksi::create($request->all());

        return redirect()->route('transaksi.index')->with('success', 'Transaksi berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Transaksi $transaksi)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Transaksi $transaksi)
    {
        return Inertia::render('Transaksi/Edit', [
            'judul' => 'Edit Transaksi',
            'kasir' => Kasir::all(),
            'transaksi' => $transaksi
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Transaksi $transaksi)
    {
        $request->validate([

            'total_price' => 'required|numeric|min:0',
            'transaction_date' => 'required|date',
            'cashier_id' => 'required|exists:kasir,id',
        ]);

        $transaksi->update($request->all());

        return redirect()->route('transaksi.index')->with('success', 'Transaksi berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    { {
            $transaksi = Transaksi::findOrFail($id);
            $transaksi->delete();

            return redirect()->route('transaksi.index')->with('success', 'transaksi berhasil dihapus');
        }
    }
}
