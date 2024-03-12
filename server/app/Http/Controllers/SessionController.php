<?php

namespace App\Http\Controllers;

use App\Models\Session;
use Illuminate\Http\Request;

class SessionController extends Controller
{
    //

    public function getAll(){
        $sessions = Session::all();
        return response()->json(['sessions' => $sessions], 200);
    }


    public function create(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'session_id' => 'required|string',
            'associated_user_id' => 'required|int',
        ]);
        // Create a new room instance with the validated data
        $session = Session::create($validatedData);
        // Set the session ID as a cookie
        $response = response()->json(['message' => 'Session created successfully', 'session' => $session], 201);
        //$response->cookie('session_id', $session->session_id, 60); // 60 minutes expiration, adjust as needed
        return $response;
    }

    public function delete($session_id)
    {
        $session = Session::findOrFail($session_id);
        $session->delete();
        return response()->json(['message' => 'Session deleted successfully']);
    }
}
