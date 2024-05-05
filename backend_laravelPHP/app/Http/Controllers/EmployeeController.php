<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;


class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Employee::all();

        return response($data, 201);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $data = $request->validate([
                'employee_fullname' => 'required|string',
                'employee_email' => 'required|string|unique:employees,employee_email',
                'employee_contact_no' => 'required|string|max:11',
                'employee_position' => 'required|string',
                'employee_role' => 'required|string',
                'employee_department' => 'required|integer',
                'employee_status' => 'required|integer',

            ]);
    
            $employee = Employee::create([
                'employee_fullname' => $data['employee_fullname'],
                'employee_email' => $data['employee_email'],
                'employee_contact_no' => $data['employee_contact_no'],
                'employee_position' => $data['employee_position'],
                'employee_role' => $data['employee_role'],
                'employee_department' => $data['employee_department'],
                'employee_status' => $data['employee_status'],
            ]);
    
            $response_data = [
                'success' => true,
                'message' => 'Employee has successfully created!',
                'employee' => $employee,
            ];
    
            return response($response_data, 201);
        } catch (ValidationException $e) {
           
            return response()->json([
                'success' => false,
                'errors' => $e->errors(),
            ], 422);
        } 
    }
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $employee = Employee::findOrFail($id);
        
            return response()->json([
                'success' => true,
                'employee' => $employee,
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Employee not found.',
            ], 404);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch employee. Please try again later.',
            ], 500);
        }
    }

    public function search(Request $request)
    {
        try {
            $data = $request->input('data');
            
            $employees = Employee::where('id', 'like', '%' . $data . '%')
                ->orWhere('employee_fullname', 'like', '%' . $data . '%')
                ->orWhere('employee_email', 'like', '%' . $data . '%')
                ->get();
    
            if ($employees->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'No employees found for the given search criteria.',
                ], 404);
            }
    
            return response()->json([
                'success' => true,
                'employees' => $employees,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to search employees. Please try again later.',
            ], 500);
        }
    }
    
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $employee = Employee::find($id);
        $employee->update($request->all());

        return response($employee, 201);
    }

    public function deactivate(Request $request, string $id)
    {
        $employee = Employee::find($id);
        $employee->update(['employee_status' => 0]);

        return response()->json([
            'success' => true,
            'status' => 201,
            'message' => 'Employee deactivated successfully',
            'data' => $employee
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return Employee::destroy($id);
    }


    public function uploadAndUpdateEmployeeImage(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'employee_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:10240', // Max size is 10MB lang 
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'status' => 400,
                'message' => $validator->errors()->first('employee_image'),
            ]);
        }
    
        $user = Employee::findOrFail($id);
    
        if ($request->hasFile('employee_image')) {
            $image = $request->file('employee_image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            // $imagePath = public_path('images') . '/' . $imageName;
    
            // Delete the previous image if it exists
            if ($user->employee_image) {
                $existingImagePath = public_path($user->employee_image);
                if (File::exists($existingImagePath)) {
                    File::delete($existingImagePath);
                }
            }
    
            // Move the new image to the images directory
            $image->move(public_path('images'), $imageName);
    
            // Update the user's image path with the full URL
            $user->employee_image = url('images/' . $imageName);
        }
    
        // Save the user object
        $user->save();
    
        return response()->json([
            'success' => true,
            'status' => 200,
            'message' => 'Employee image updated successfully',
            'image_url' => $user->employee_image, // Directly use the updated user image path
            'image_details' => $user,
        ]);
    }
    



}
