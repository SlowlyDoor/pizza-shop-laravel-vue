<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PizzaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Pizza::insert([
            ['name'=>'Маргарита','description'=>'Томаты, моцарелла, базилик','price'=>449.00,'image_url'=>'/images/margarita.jpg','created_at'=>now(),'updated_at'=>now()],
            ['name'=>'Пепперони','description'=>'Пепперони, моцарелла, соус','price'=>529.00,'image_url'=>'/images/pepperoni.jpg','created_at'=>now(),'updated_at'=>now()],
            ['name'=>'Четыре сыра','description'=>'Моцарелла, дор-блю, пармезан, чеддер','price'=>599.00,'image_url'=>'/images/4cheese.jpg','created_at'=>now(),'updated_at'=>now()],
        ]);
    }
}
