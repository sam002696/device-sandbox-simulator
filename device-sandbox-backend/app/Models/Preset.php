<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Preset extends Model
{
    // Using factory for model
    use HasFactory;

    // Mass assignable attributes
    protected $fillable = ['name', 'device'];

    // Cast 'device' attribute to array
    protected $casts = [
        'device' => 'array',
    ];
}
