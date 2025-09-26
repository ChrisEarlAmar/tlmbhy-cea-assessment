<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Http\Controllers\SensorController;
use App\Events\TestEvent;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('web')->group(function () {
    Route::post('/login', function (Request $request) {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        auth()->login($user);

        return response()->json(['message' => 'Logged in successfully']);
    });

    Route::post('/logout', function (Request $request) {
        auth()->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logged out successfully']);
    });

    Route::get('/me', function (Request $request) {
        return $request->user();
    })->middleware('auth:sanctum');
});

Route::post('/register', function (Request $request) {
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:6|confirmed',
    ]);

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
    ]);

    // Auto-login after registration
    auth()->login($user);

    return response()->json(['message' => 'Registered successfully', 'user' => $user]);
});

Route::get('/test-event', function () {
    event(new TestEvent('This is an instant test message!'));
    return response()->json(['status' => 'Event dispatched']);
});


Route::post('/sensor/event', [SensorController::class, 'triggerEvent']);
