<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function register(Request $request){

        $validator = Validator::make($request->all(), [
            'name' =>'required',
            'email' =>'required|email',
            'password' =>'required|min:6',
            'passwordRepeat' => 'required|min:6'
        ] );

        if($validator->fails()){
            return response()->json(['errors'=>$validator->errors()->toArray()]);
        }

        if (  $request->password != $request->passwordRepeat ){
            return $this->sendResponse('error', 23, 'Password do not much');
        }

        $user = User::create([
            'name' =>   $request->name,
            'email' =>   $request->email,
            'password' =>  Hash::make($request->password),
        ]);

        $token = auth()->login($user);
//        return $this->respondWithToken($token);
//        return $this->respondWithToken($token);
        return $this->sendResponse('success', 10, ['token' => $token, 'user' => $user ]);
    }


    public function login( Request $request){
        $credentials = $request->only(['name', 'password']);

        if (!$token = auth()->attempt($credentials) ) {
            return $this->sendResponse('error', 24, 'Unauthorized');
        }

        return $this->sendResponse('success', 10, ['token' => $token, 'user' => auth()->user() ] );
    }

    public function getAuthUser(Request $request)
    {
        return response()->json(auth()->user());
    }

    public function logout()
    {
        auth()->logout();
        return response()->json(['message'=>'Successfully logged out']);
    }

    protected function responseToken($token)
    {
        return [
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ];
    }

    protected function sendResponse($status, $code, $message)
    {
        if ( $status == 'error'){
            return response()->json([
                'status' => $status,
                'error' => [
                    'code' => $code,
                    'message' => $message
                ]
            ]);
        }else{
            return response()->json([
                'status' => $status,
                'result' => [
                    'code' => $code,
                    'message' => $message
                ]
            ]);
        }
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
