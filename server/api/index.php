<?php  require __DIR__ . '/../public/index.php';

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Database controllers
use App\Http\Controllers\RoomController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\MessageController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

////index
//->sessions
//->rooms
//->users
//->messages

//SESSIONS////////////////
Route::get('/sessions', [SessionController::class, 'getAll']);
Route::post('/create-session', [SessionController::class, 'create']);
Route::delete('/delete-session/{session_id}', [SessionController::class, 'delete']);
////////////////

//ROOMS/////////////////
Route::get('/rooms', [RoomController::class, 'getAll']);
Route::post('/create-room', [RoomController::class, 'create']);
Route::get('/room/{room_id}', [RoomController::class, 'getById']);
////////////////

//USERS////////////////
Route::get('/users', [UserController::class, 'getAll']);
Route::post('/create-user', [UserController::class, 'create']);
////////////////



//MESSAGES////////////////
Route::get('/messages', [MessageController::class, 'getAll']);
Route::post('/create-message', [MessageController::class, 'create']);
////////////////