<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    /**
     * Izinkan pengisian massal untuk semua field.
     * (Untuk development. Di produksi, pertimbangkan $fillable)
     */
    protected $guarded = [];

    /**
     * Otomatis ubah kolom 'images' dari JSON menjadi array
     */
    protected $casts = [
        'images' => 'array',
        'project_date' => 'date',
    ];
}