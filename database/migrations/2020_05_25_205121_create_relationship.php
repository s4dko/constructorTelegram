<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRelationship extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
//        Schema::table('goods', function (Blueprint $table) {
//            $table->unsignedBigInteger('category_id');
//            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
//        });
//
//        Schema::table('bots', function (Blueprint $table) {
//            $table->unsignedBigInteger('user_id');
//            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
//
//            $table->unsignedBigInteger('components_id');
//            $table->foreign('components_id')->references('id')->on('components')->onDelete('cascade');
//
//            $table->unsignedBigInteger('store_id');
//            $table->foreign('store_id')->references('id')->on('stores')->onDelete('cascade');
//        });
//
//
//        Schema::table('components', function (Blueprint $table) {
//            $table->unsignedBigInteger('categories_id');
//            $table->foreign('categories_id')->references('id')->on('categories')->onDelete('cascade');
//        });
//
//        Schema::table('stores', function (Blueprint $table) {
//            $table->unsignedBigInteger('goods_id');
//            $table->foreign('goods_id')->references('id')->on('goods')->onDelete('cascade');
//        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('relationship');
    }
}
