<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    //
  
    public function getAll(){
        $rooms = Room::all();
        return response()->json(['rooms' => $rooms], 200);
    }

    public function create(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'room_name' => 'required|string',
            'password' => 'required|string',
            'hoster_user_id' => 'required|int'
        ]);

        // Create a new room instance with the validated data
        $room = Room::create($validatedData);

        return response()->json(['message' => 'Room created successfully', 'room' => $room], 201);
    }


    public function getById($room_id){
        $room = Room::where('room_id', $room_id)->first();
        return response()->json([''=> $room], 200);
    }
}
