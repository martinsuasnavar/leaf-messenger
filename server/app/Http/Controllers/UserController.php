<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function getAll(){
        $users = User::all();
        return response()->json(['users' => $users], 200);
    }

    public function create(Request $request)
    {
        echo "validating";
        // Validate the incoming request data
        $validatedData = $request->validate([
            'id' => 'required|int',
            'username' => 'required|string',
            'password' => 'required|string',
        ]);
        // Create a new room instance with the validated data
        $user = User::create($validatedData);
        // Set the session ID as a cookie
        $response = response()->json(['message' => 'User created successfully', 'user' => $user], 201);
        //$response->cookie('session_id', $session->session_id, 60); // 60 minutes expiration, adjust as needed
        return $response;
    }

}
