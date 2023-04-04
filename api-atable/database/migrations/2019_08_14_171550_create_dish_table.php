<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDishTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dish', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->string('name');
            $table->text('description', 700)->nullable();
            $table->float('price');
            $table->string('photo_path')->nullable();
            $table->unsignedInteger('preparation_time');

            $table->unsignedInteger('quantity')->nullable();
            $table->dateTime('expiration_date');

            $table->unsignedInteger('cooker_id');
            $table->unsignedInteger('dish_category_id');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dish');
    }
}
