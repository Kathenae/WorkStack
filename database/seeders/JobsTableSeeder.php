<?php

namespace Database\Seeders;

use App\Models\Job;
use App\Models\Proposal;
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
        $allUsers = User::all();
        $allSkills = Skill::all();
        Job::factory(50)->make()->each(function (Job $job) use ($allUsers, $allSkills) {
            $job->user_id = $allUsers->random()->id;
            $skills = $allSkills->random(rand(2, 8));
            $job->save();
            $job->skills()->saveMany($skills);


            for ($i = 0; $i < rand(5, 20); $i++) {
                Proposal::factory()->create([
                    'job_id' => $job->id,
                    'user_id' => $allUsers->random()->id
                ]);
            }
        });
    }
}
