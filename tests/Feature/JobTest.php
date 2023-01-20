<?php

namespace Tests\Feature;

use App\Models\Job;
use App\Models\Skill;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class JobTest extends TestCase
{

    use RefreshDatabase;

    /**
     * @group JobFeatures
     */
    public function test_can_display_job_list_page()
    {
        $response = $this->get(route('jobs.index'));
        $response->assertOk();
    }

    /**
     * @group JobFeatures
     */
    public function test_can_display_job_detail_page()
    {
        $user = User::factory()->create();
        $job = $user->jobs()->create([
            'title' => 'New Job',
            'description' => 'New Job Description',
            'min_price' => 20.0,
            'max_price' => 40.0,
            'type' => 'hourly',
            'status' => 'open',
        ]);
        $response = $this->get(route('jobs.show', $job->id));
        $response->assertOk();
    }

    /**
     * @group JobFeatures
     */
    public function test_can_display_job_create_page()
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->get(route('jobs.create'));
        $response->assertOk();
    }

    /**
     * @group JobFeatures
     */
    public function test_can_create_job()
    {
        $user = User::factory()->create();
        Skill::insert([
            ['name' => 'Skill 1'],
            ['name' => 'Skill 2'],
            ['name' => 'Skill 3'],
        ]);

        $new_job = [
            'title' => 'New Job',
            'description' => 'New Job Description',
            'min_price' => 20.0,
            'max_price' => 40.0,
            'type' => 'hourly',
            'status' => 'open',
            'skills' => [1, 2, 3],
        ];
        $response = $this->actingAs($user)->post(route('jobs.store'), $new_job);

        $this->assertDatabaseCount('jobs', 1);
        $response->assertRedirect('/jobs');
    }

    /**
     * @group JobFeatures
     */
    public function test_can_display_job_edit_page()
    {
        $user = User::factory()->create();
        $job = $user->jobs()->create([
            'title' => 'New Job',
            'description' => 'New Job Description',
            'min_price' => 20.0,
            'max_price' => 40.0,
            'type' => 'hourly',
            'status' => 'open',
        ]);
        $response = $this->actingAs($user)->get(route('jobs.edit', $job->id));
        $response->assertOk();
    }

    /**
     * @group JobFeatures
     */
    public function test_can_update_job()
    {
        $user = User::factory()->create();

        $job = $user->jobs()->create([
            'title' => 'New Job',
            'description' => 'New Job Description',
            'min_price' => 20.0,
            'max_price' => 40.0,
            'type' => 'hourly',
            'status' => 'open',
        ]);

        $response = $this->actingAs($user)->patch(route('jobs.update', $job->id), [
            'title' => 'Updated Job Title',
            'description' => 'Updated Job Description',
        ]);

        $this->assertDatabaseHas('jobs', [
            'id' => $job->id,
            'title' => 'Updated Job Title',
            'description' => 'Updated Job Description',
        ]);
        $response->assertOk();
    }

    /**
     * @group JobFeatures
     */
    public function test_can_delete_job()
    {
        $user = User::factory()->create();

        $job = $user->jobs()->create([
            'title' => 'New Job',
            'description' => 'New Job Description',
            'min_price' => 20.0,
            'max_price' => 40.0,
            'type' => 'hourly',
            'status' => 'open',
        ]);

        $response = $this->actingAs($user)->delete(route('jobs.destroy', $job->id));

        // Check if we deleted the job
        $this->assertDatabaseEmpty('jobs');
        $response->assertOk();
    }
}
