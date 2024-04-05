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
Route::get('/sessions', [SessionController::class, 'getAll']);
Route::post('create-session', [SessionController::class, 'create']);
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

