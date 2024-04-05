<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

// Database controllers
use App\Http\Controllers\RoomController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::get('/check-database-connection', function () {
    try {
        DB::connection()->getPdo();
        return 'Conexión exitosa a la base de datos.';
    } catch (\Exception $e) {
        return 'Error de conexión a la base de datos: ' . $e->getMessage();
    }
});



////index
//->sessions
//->rooms
//->users
//->messages

Route::get('/1', function () {
    return '1';
});


//SESSIONS////////////////
Route::get('/api/sessions', [SessionController::class, 'getAll']);
Route::post('/api/create-session', [SessionController::class, 'create']);
Route::delete('/api/delete-session/{session_id}', [SessionController::class, 'delete']);
////////////////

//ROOMS/////////////////
Route::get('/api/rooms', [RoomController::class, 'getAll']);
Route::post('/capi/reate-room', [RoomController::class, 'create']);
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

