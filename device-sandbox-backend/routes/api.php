<?php


use App\Http\Controllers\Api\PresetController;
use Illuminate\Support\Facades\Route;

// Preset routes
Route::prefix('presets')->group(function () {
    Route::get('/', [PresetController::class, 'index']);  // GET /api/presets?type=fan
    Route::post('/', [PresetController::class, 'store']); // POST /api/presets
});
