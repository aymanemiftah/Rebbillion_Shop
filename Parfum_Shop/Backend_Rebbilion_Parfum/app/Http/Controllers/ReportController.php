<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Report::select( "id","user_id","issue_description","report_status")->paginate(10);
    }
    public function ReportsAll()
    {
        return Report::select( "id","user_id","issue_description","report_status")->get();
    }

    
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',                      
            'issue_description' => 'required|string|max:1000',            
            'report_status' => 'nullable|in:pending,resolved,rejected',  
        ]);
    
        
        $report = Report::create([
           'user_id'=> $validatedData['user_id'],
           'issue_description'=> $validatedData['issue_description'],
           'report_status'=> $validatedData['report_status'] ?? 'pending',
            ]
        );
    
       
        return response()->json([
            'message' => 'Report created successfully',
            'report' => $report
        ], 201);
    }

    
    public function show(Report $report)
    {
        return response()->json([
            'report'=>$report
        ]);
    }

    
    
    public function update(Request $request, Report $report)
    {
        $validatedData = $request->validate([
            'report_status' => 'nullable|in:pending,resolved,rejected', 
        ]);
    
        $report->update([
           "report_status"=> $validatedData["report_status"]?? null ,
        ]
           
        );
    
        return response()->json([
            'message' => 'Report Updated successfully',
            'report' => $report
        ], 200);
    }

   
    public function destroy(Report $report)
    {
        $report->delete();
        return response()->json([
            'message'=>'Report Deleted successfully'
        ],204);
    }
}
