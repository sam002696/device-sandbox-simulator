<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\Preset\PresetService;
use App\Services\ResponseBuilder\ApiResponseService;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

// Preset management controller
class PresetController extends Controller
{
    // Preset service instance
    protected $presetService;

    // Dependency injection of PresetService
    public function __construct(PresetService $presetService)
    {
        $this->presetService = $presetService;
    }

    // List all presets, optionally filtered by type
    public function index(Request $request)
    {
        try {
            $type = $request->query('type'); // ?type=fan or ?type=light
            return $this->presetService->getPresets($type);
        } catch (\Throwable $e) {
            return ApiResponseService::handleUnexpectedError($e);
        }
    }

    // Storing a new preset with validation
    public function store(Request $request)
    {
        try {
            // Validating incoming request data
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'device' => 'required|array',
                'device.type' => 'required|string|in:fan,light',
                'device.settings' => 'required|array',
            ]);

            // Creating a new preset using the validated data
            return $this->presetService->createPreset($validated);
        } catch (ValidationException $e) { // Handle validation errors
            return ApiResponseService::handleValidationError($e); // 422 Unprocessable Entity
        } catch (\Throwable $e) {
            return ApiResponseService::handleUnexpectedError($e); // 500 Internal Server Error
        }
    }
}
