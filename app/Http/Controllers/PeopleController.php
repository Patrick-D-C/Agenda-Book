<?php

namespace App\Http\Controllers;

use App\Models\People;
use Illuminate\Http\Request;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;

class PeopleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Inicio', [
            'list_people' => People::orderBy('name')->get()->map(function ($people) {
                return [
                    'id' => $people->id,
                    'name' => $people->name,
                    'description' => $people->description,
                    'view_url' => URL::route('people.show', $people)
                ];
            }),
            'create_url' => URL::route('people.create')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('People/New');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100|unique:people',
            'description' => 'string|max:255',
        ]);

        People::create([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        return redirect()->route('inicio');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\People  $people
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $people = People::with('contacts:id,people_id,name,value')->findOrFail($id);

        return Inertia::render('People/Show', [
            'people' => $people,
            'edit_url' => "/people/$people->id/edit",
            'destroy_url' => URL::route('people.destroy', $people)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\People  $people
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $people = People::findOrFail($id);
        return Inertia::render('People/Edit', [
            'people' => $people
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\People  $people
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $request->validate([
            'name' => ['required', 'string', 'max:100', \Illuminate\Validation\Rule::unique('people')->ignore($id)],
            'description' => 'string|max:255',
        ]);

        $people = People::findOrFail($id);

        $people->update([
            'name' => $request->name,
            'description' => $request->description
        ]);

        return redirect()->route('people.show', $people);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\People  $people
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $people = People::findOrFail($id);
        $people->delete();

        return redirect()->route('inicio');
    }
}
