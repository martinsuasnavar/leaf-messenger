<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function getAll(){
        $messages = Message::all();
        return response()->json(['messages' => $messages], 200);
    }

    public function create(Request $request)
    {
        $validatedData = $request->validate([
            'content' => 'required|string',
            'parent_room_id' => 'required|int',
            'messager_user_id' => 'required|int',
        ]);
        $message = Message::create($validatedData);
        return response()->json(['message' => 'Room created successfully', 'chatMessage' => $message], 201);
    }
}
