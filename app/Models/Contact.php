<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Contact extends Model
{
    use HasFactory;

    protected $table = 'contact';
    protected $primaryKey = 'id';
    protected $fillable = [
        'id', 'people_id', 'name', 'value', 'created_at', 'updated_at'
    ];


    public function people(): BelongsTo
    {
        return $this->belongsTo(People::class, 'people_id');
    }
}
