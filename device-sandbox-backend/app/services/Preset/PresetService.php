<?php

namespace App\Services\Preset;

use App\Models\Preset;
use App\Services\ResponseBuilder\ApiResponseService;

class PresetService
{
    public function getPresets($type = null)
    {
        $presets = Preset::when(
            $type,
            fn($query) =>
            $query->where('device->type', $type)

        )
            ->orderBy('created_at', 'desc')
            ->get();

        return ApiResponseService::successResponse(
            $presets,
            'Presets fetched successfully'
        );
    }

    public function createPreset(array $data)
    {
        $preset = Preset::create($data);
        return ApiResponseService::successResponse(
            $preset,
            'Preset saved successfully',
            201
        );
    }
}
