<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('attendances', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->string('attendance_note')->nullable();
            $table->string('attendance_time_in')->nullable();
            $table->string('attendance_time_out')->nullable();
            $table->integer('attendance_status_id')->default(1);
            $table->rememberToken()->nullable();
            $table->foreignId('attendance_employee_id')->constrained('employees');
            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();      
            $table->timestamps();
        });
    }

 
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendances');
    }
};
