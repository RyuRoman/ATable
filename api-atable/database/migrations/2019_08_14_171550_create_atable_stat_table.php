<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAtableStatTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('atable_stat', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->unsignedInteger('website_entries');
            $table->unsignedInteger('nb_commands');

            $table->unsignedInteger('mvp_cooker_id');

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
        Schema::dropIfExists('atable_stat');
    }
}
