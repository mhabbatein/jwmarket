<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produk extends Model
{
    use HasFactory;
    protected $table = 'produk';

    protected $fillable = [
        'name',
        'barcode',
        'category_id',
        'stock',
        'purchase_price',
        'selling_price',
    ];

    public $timestamps = true;

    public function category()
    {
        return $this->belongsTo(Kategori::class);
    }

    public function transactionDetails()
    {
        return $this->hasMany(DetailTransaksi::class);
    }
}
