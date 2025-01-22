<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        try {
            $status = $request->query('status');

            switch ($status) {
                case 'completed':
                    $tasks = Task::where('completed', true)->orderBy('id', 'desc')->get();
                    break;
                case 'incomplete':
                    $tasks = Task::where('completed', false)->orderBy('id', 'desc')->get();
                    break;
                default:
                    $tasks = Task::orderBy('id', 'desc')->get();
                    break;
            }

            return response()->json($tasks);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while retrieving tasks.'], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $task = Task::create($request->all());
            return response()->json($task, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while creating the task.'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $task = Task::findOrFail($id);
            $task->update($request->all());
            return response()->json($task, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while updating the task.'], 500);
        }
    }

    public function destroy($id)
    {
        try {
            Task::findOrFail($id)->delete();
            return response()->json(null, 204);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while deleting the task.'], 500);
        }
    }
}
