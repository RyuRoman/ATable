<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->string('first_name');
            $table->string('last_name');
            $table->date('date_of_birth')->nullable();
            $table->string('phone', 30)->unique()->nullable();
            $table->string('email', 190)->unique();
            $table->text('description')->nullable();
            $table->string('password');

            $table->unsignedInteger('customer_id')->nullable();
            $table->unsignedInteger('cooker_id')->nullable();

            $table->dateTime('email_verified_at')->nullable();

            $table->string('reset_pwd_token')->nullable();
            $table->date('reset_pwd_token_expiration_date')->nullable();

            $table->boolean('is_admin')->default(false);

            $table->rememberToken();
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
        Schema::dropIfExists('user');
    }
}
