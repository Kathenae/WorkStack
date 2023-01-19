<?php

namespace Database\Factories;

use App\Models\Skill;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Job>
 */
class JobFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'title' => fake()->jobTitle,
            'description' => fake()->paragraph(5),
            'min_price' => fake()->randomFloat(2, 0, 100),
            'max_price' => fake()->randomFloat(2, 100, 200),
            'type' => fake()->randomElement(['fixed_price', 'hourly']),
            'status' => fake()->randomElement(['open', 'closed', 'canceled', 'completed']),
            'created_at' => fake()->dateTimeBetween('2022-01-01', '2022-12-31'),
        ];
    }
}
