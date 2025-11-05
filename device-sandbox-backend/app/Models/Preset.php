<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Preset extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'device'];

    protected $casts = [
        'device' => 'array',
    ];
}
