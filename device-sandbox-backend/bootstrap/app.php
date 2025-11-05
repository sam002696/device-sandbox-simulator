<?php

use App\Services\ResponseBuilder\ApiResponseService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        api: __DIR__ . '/../routes/api.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->append(\App\Http\Middleware\TrimStrings::class);
        $middleware->append(\Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull::class);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        // 404: Route or Model not found
        $exceptions->render(function (NotFoundHttpException | ModelNotFoundException $exception, $request) {
            return ApiResponseService::errorResponse('The requested resource was not found', 404);
        });

        // 405: Invalid HTTP method
        $exceptions->render(function (MethodNotAllowedHttpException $exception, $request) {
            return ApiResponseService::errorResponse('Method not allowed for this endpoint', 405);
        });

        // 422: Validation error
        $exceptions->render(function (ValidationException $exception, $request) {
            return ApiResponseService::handleValidationError($exception);
        });

        // 500: Generic fallback
        $exceptions->render(function (Throwable $exception, $request) {
            return ApiResponseService::handleUnexpectedError($exception);
        });
    })->create();
