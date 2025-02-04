<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaksi extends Model
{
    use HasFactory;
    protected $table = 'transaksi';

    protected $fillable = [
        'cashier_id',
        'total_price',
        'transaction_date',
    ];

    public function cashier()
    {
        return $this->belongsTo(Kasir::class);
    }
    public function transactionDetails()
    {
        return $this->hasMany(DetailTransaksi::class);
    }
}
