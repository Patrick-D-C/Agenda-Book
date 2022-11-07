<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class People extends Model
{
    use HasFactory;

    protected $table = 'people';
    protected $primaryKey = 'id';
    protected $fillable = [
        'id', 'name', 'description', 'created_at', 'updated_at'
    ];


    public function contacts(): HasMany
    {
        return $this->hasMany(Contact::class, 'people_id', 'id');
    }
}
