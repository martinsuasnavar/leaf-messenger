<?php

namespace App\Http\Middleware;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
class ReturnModelName
{
public function construct(array $attributes = [])
    {
        $dbHost = env('DB_HOST');
        $database = '';

        if ($dbHost == '127.0.0.1') {
            $database = 'leaf.';
        }

        $this->table = "{$database}room";
    }
}