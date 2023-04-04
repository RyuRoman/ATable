<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCookerGradeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cooker_grade', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->unsignedTinyInteger('grade');
            $table->text('comment')->nullable();

            $table->unsignedInteger('customer_id');
            $table->unsignedInteger('cooker_id');

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
        Schema::dropIfExists('cooker_grade');
    }
}
