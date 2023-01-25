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
    public function test_cannot_display_non_existent_job_detail_page()
    {
        $response = $this->get(route('jobs.show', 697968));
        $response->assertNotFound();
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
    public function test_cannot_access_job_creation_page_if_unauthenticated()
    {
        $response = $this->get(route('jobs.create'));
        $response->assertRedirect(route('login'));
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
        $response->assertRedirect(route('jobs.index'));
    }

    /**
     * @group JobFeatures
     */
    public function test_cannot_create_job_if_unauthorized()
    {
        // Try to submit job data without being unauthorized
        $response = $this->post(route('jobs.store'), [
            'title' => 'New Job',
            'description' => 'New Job Description',
            'min_price' => 20.0,
            'max_price' => 40.0,
            'type' => 'hourly',
            'status' => 'open',
            'skills' => [1, 2, 3],
        ]);

        // Check if redirected to login page
        $response->assertRedirect(route('login'));
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
    public function test_cannot_edit_another_users_job()
    {
        // A user creates a job
        $user = User::factory()->create();
        $job = Job::factory()->create(['user_id' => $user->id]);

        // Another tries to view the edit form for that job
        $user = User::factory()->create();
        $response = $this->actingAs($user)->get(route('jobs.edit', $job->id));

        $response->assertForbidden();
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
        $response->assertRedirect(route('jobs.index'));
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
        $response->assertRedirect(route('jobs.index'));
    }
}
