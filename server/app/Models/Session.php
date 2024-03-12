<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
 
    public $timestamps = false;
    protected $fillable = ['session_id', 'associated_user_id', /* ... */];

    protected $primaryKey = 'session_id';
    protected $casts = [
        'session_id' => 'string', // Cast session_id to string
    ];
    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);

        $dbHost = env('DB_HOST');
        $database = '';
        $model = 'session';

        if ($dbHost == '127.0.0.1') {
            $database = 'leaf.';
        }

        $this->table = "{$database}{$model}";
     }
}
