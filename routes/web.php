<?php

use App\Http\Controllers\JobController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProposalController;
use App\Models\Proposal;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/dashboard', function (Request $request) {
    return Inertia::render('Dashboard', [
        'jobs' => $request->user()->jobs,
        'proposals' => Proposal::where('user_id', '=', $request->user()->id)->with(['job'])->get()
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::resource('jobs', JobController::class);

Route::middleware('auth')->group(function () {
    Route::resource('jobs.proposals', ProposalController::class)->only(['index', 'create', 'store']);
    Route::resource('proposals', ProposalController::class)->except(['index', 'create', 'store']);
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
