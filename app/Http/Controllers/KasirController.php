<?php

namespace App\Http\Controllers;

use App\Models\Kasir;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KasirController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Kasir/Index', [
            'judul' => 'Daftar Kasir',
            'kasir' => Kasir::orderBy('created_at', 'desc')->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Kasir/Create', [
            'judul' => 'Tambah Kasir'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Kasir::create($request->all());

        return redirect()->route('kasir.index')->with('success', 'Kasir berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Kasir $kasir)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Kasir $kasir)
    {
        return Inertia::render('Kasir/Edit', [
            'judul' => 'Edit Kasir',
            'kasir' => $kasir
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Kasir $kasir)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $kasir->update($request->all());

        return redirect()->route('kasir.index')->with('success', 'Kasir berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $kasir = Kasir::findOrFail($id);
        $kasir->delete();

        return redirect()->route('kasir.index')->with('success', 'Kasir berhasil dihapus');
    }
}
