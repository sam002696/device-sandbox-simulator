<?php

namespace App\Services\Preset;

use App\Models\Preset;
use App\Services\ResponseBuilder\ApiResponseService;

class PresetService
{
    // Fetch presets, optionally filtered by device type
    public function getPresets($type = null)
    {
        // Query presets with optional type filtering
        $presets = Preset::when(
            $type,
            fn($query) =>
            $query->where('device->type', $type)

        )
            ->orderBy('created_at', 'desc') // Order by newest first
            ->get(); // Execute the query

        // Return the custom response
        return ApiResponseService::successResponse(
            $presets,
            'Presets fetched successfully'
        );
    }

    // Creating and storing a new preset
    public function createPreset(array $data)
    {
        // Creating the preset record
        $preset = Preset::create($data);
        // Returning the custom response
        return ApiResponseService::successResponse(
            $preset,
            'Preset saved successfully',
            201
        );
    }
}
