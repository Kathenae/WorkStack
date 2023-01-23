<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Proposal extends Model
{
    use HasFactory;

    public function job()
    {
        $this->belongsTo(Job::class);
    }

    public function owner()
    {
        $this->belongsTo(User::class);
    }
}
