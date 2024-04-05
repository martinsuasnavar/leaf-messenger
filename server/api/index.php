<?php  require __DIR__ . '/../public/index.php';

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

// Database controllers
use App\Http\Controllers\RoomController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\MessageController;


////index
//->sessions
//->rooms
//->users
//->messages


//SESSIONS////////////////
Route::get('/api/sessions', [SessionController::class, 'getAll']);
Route::post('/api/create-session', [SessionController::class, 'create']);
Route::delete('/api/delete-session/{session_id}', [SessionController::class, 'delete']);
////////////////

//ROOMS/////////////////
Route::get('/api/rooms', [RoomController::class, 'getAll']);
Route::post('/api/create-room', [RoomController::class, 'create']);
Route::get('/api/room/{room_id}', [RoomController::class, 'getById']);
////////////////

//USERS////////////////
Route::get('/api/users', [UserController::class, 'getAll']);
Route::post('/api/create-user', [UserController::class, 'create']);
////////////////



//MESSAGES////////////////
Route::get('/messages', [MessageController::class, 'getAll']);
Route::post('/create-message', [MessageController::class, 'create']);
////////////////

