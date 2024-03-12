<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    public $timestamps = false;
    protected $fillable = ['room_id', 'room_name', 'password', 'creation_date', 'hoster_user_id', /* ... */];
    protected $primaryKey = 'room_id';
    public function __construct(array $attributes = [])
    {
        $dbHost = env('DB_HOST');
        $database = '';
        $model = 'room';
    
        if ($dbHost == '127.0.0.1') {
            $database = 'leaf.';
        }
    
        $this->table = "{$database}{$model}";
    }
}