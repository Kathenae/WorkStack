<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Proposal>
 */
class ProposalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'coverLetter' => fake()->text(rand(50, 600)),
            'price' => fake()->numberBetween(10, 500),
            'job_id' => fake()->numberBetween(1, 20),
            'user_id' => fake()->numberBetween(1, 10),
        ];
    }
}
