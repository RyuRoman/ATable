<?php

namespace App\Console;

use App\Models\Dish;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // Test purpose only
        /*
        $schedule->call(function() {
            $nd = new Dish();

            $nd->name = uniqid();
            $nd->description = "Generated with cron 2";
            $nd->price = 2.00;
            $nd->quantity = rand(1, 10);
            $nd->is_prepared = rand(0, 1);
            $nd->preparation_time = rand(10,90);
            $nd->expiration_date = "2019-12-07 18:00:00";
            $nd->cooker_id = 1;
            $nd->dish_category_id = 1;

            $nd->save();
        })->everyMinute();
        */

        // Check dishes lapsing
        $schedule->call(function () {
            $dtd = Dish::whereDate("expiration_date", "=", Carbon::now())
                ->whereTime("expiration_date", "<=", Carbon::now())
                ->orWhereDate("expiration_date", "<", Carbon::now())
                ->update(["quantity" => 0]);
        })->daily();

        // Check reset pwd token lapsing
        $schedule->call(function () {
            $dtd = User::whereDate("reset_pwd_token_expiration_date", "<=", Carbon::now()->toDateString())
                ->update([
                    "reset_pwd_token" => null,
                    "reset_pwd_token_expiration_date" => null
                ]);
        })->daily();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
