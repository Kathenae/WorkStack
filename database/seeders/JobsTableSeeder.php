<?php

namespace Database\Seeders;

use App\Models\Job;
use App\Models\Skill;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JobsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Job::factory(50)->make()->each(function (Job $job) {
            $job->user_id = User::inRandomOrder()->first()->id;
            $skills = Skill::inRandomOrder()->take(rand(2, 8))->get();
            $job->save();
            $job->skills()->saveMany($skills);
        });
    }
}
