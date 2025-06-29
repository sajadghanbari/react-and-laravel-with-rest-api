<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
// Public routes (no authentication needed)
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes (require Sanctum authentication)
Route::middleware('auth:sanctum')->group(function() {
    // Get authenticated user info
    Route::get('/user', function(Request $request) {
        return response()->json([
            'data' => $request->user(),
            'status' => 200,
            'message' => 'Authenticated user retrieved successfully'
        ]);
    });
    
    // Logout
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Users CRUD
    Route::apiResource('users', UserController::class)->except(['store']);
    
    // Special create user route with different permissions
    Route::post('/users', [UserController::class, 'store'])
        ->middleware('can:create-users');
});

// Test route to verify API is working
Route::get('/test', function() {
    return response()->json([
        'status' => 200,
        'message' => 'API is working!',
        'data' => [
            'version' => '1.0',
            'timestamp' => now()->toDateTimeString()
        ]
    ]);
});

