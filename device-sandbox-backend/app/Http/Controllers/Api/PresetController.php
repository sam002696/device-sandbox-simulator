<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\Preset\PresetService;
use App\Services\ResponseBuilder\ApiResponseService;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class PresetController extends Controller
{
    protected $presetService;

    public function __construct(PresetService $presetService)
    {
        $this->presetService = $presetService;
    }

    public function index(Request $request)
    {
        try {
            $type = $request->query('type'); // ?type=fan or ?type=light
            return $this->presetService->getPresets($type);
        } catch (\Throwable $e) {
            return ApiResponseService::handleUnexpectedError($e);
        }
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'device' => 'required|array',
                'device.type' => 'required|string|in:fan,light',
                'device.settings' => 'required|array',
            ]);

            return $this->presetService->createPreset($validated);
        } catch (ValidationException $e) {
            return ApiResponseService::handleValidationError($e);
        } catch (\Throwable $e) {
            return ApiResponseService::handleUnexpectedError($e);
        }
    }
}
