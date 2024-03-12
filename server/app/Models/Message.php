<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    public $timestamps = false;
    protected $fillable = ['message_id', 'content', 'parent_room_id', 'messager_user_id', /* ... */];
    
    
    protected $primaryKey = 'message_id';
    public function __construct(array $attributes = [])
    {
        $dbHost = env('DB_HOST');
        $database = '';
        $model = 'message';
    
        if ($dbHost == '127.0.0.1') {
            $database = 'leaf.';
        }
    
        $this->table = "{$database}{$model}";
    }
    use HasFactory;
}
