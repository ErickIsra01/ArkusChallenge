import React from "react";

function Login() {
    return(
        <div class="flex h-screen">
            <div class="m-auto">
                <div class="p-24 shadow-lg rounded-xl text-center bg-white">
                    <svg xmlns="http://www.w3.org/2000/svg" class="inline text-cyan-600 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <h1 class="text-3xl font-bold text-cyan-500">Sign In</h1>
                    <h3 class="text-1xl font-semibold text-gray-500">Sign in to your account!</h3>
                    <div class="text-left pt-3">
                        <input type="email" placeholder="Email" class="p-1 rounded-lg bg-gray-100 shadow-md focus:outline-none focus:border-2 border-cyan-500" />
                        <input type="password" placeholder="Password" class="block p-1 mt-3 rounded-lg bg-gray-100 shadow-md focus:outline-none focus:border-2 border-cyan-500" />
                        <a class="text-sm text-cyan-600 underline">Forgot password?</a>
                    </div>
                    <button type="submit" class="bg-cyan-200 p-2 pr-5 pl-5 text-gray-800 font-semibold rounded-xl border-cyan-700 focus:ring-2 m-4">Sign In</button>
                </div>
            </div>
        </div>
    )
} 

export default Login;