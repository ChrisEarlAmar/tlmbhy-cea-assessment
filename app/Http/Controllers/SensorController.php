<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\TestEvent;
use App\Events\SensorEvent;

class SensorController extends Controller
{
    public function triggerEvent(Request $request)
    {

        $data = $request->all();

        // dd($data);

        event(new SensorEvent($data));

        return response()->json([
            'message' => 'Sensor event dispatched successfully!'
        ]);
    }
}
