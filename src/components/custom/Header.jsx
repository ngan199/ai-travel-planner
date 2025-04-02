import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout } from '@react-oauth/google'
import { useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Moon, Sun } from "lucide-react";


function Header() {
  const user = JSON.parse(localStorage.getItem('user'))
  const [openDialog, setOpenDialog] = useState(false)
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      GetUserProfile(codeResp)
    },
    onError: (error) => console.log('error', error)
  })

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,{
      headers:{
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((res) => {
      setOpenDialog(false)
      localStorage.setItem('user', JSON.stringify(res.data))
      navigate('/')
    }).catch(function (error) {
      console.log("erorr??", error.toJSON());
    });
  }

  return (
    <div className="p-4 flex justify-between items-center shadow-lg bg-opacity-50 dark:bg-opacity-50 backdrop-blur-md bg-white dark:bg-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
      {/* Logo */}
      <img onClick={() => navigate("/")} className="h-12 cursor-pointer hover:scale-105 transition-transform" src="/logo.svg" alt="Logo" />

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full border border-gray-300 dark:border-gray-600 bg-opacity-50 hover:bg-opacity-80 backdrop-blur-lg transition-all"
        >
          {darkMode ? <Sun className="text-yellow-400 h-6 w-6" /> : <Moon className="text-blue-500 h-6 w-6" />}
        </button>

        {/* If User is Logged In */}
        {!!user ? (
          <div className="flex items-center gap-4">
            {/* My Trips Button */}
            <Button
              variant="outline"
              className="relative px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 font-semibold tracking-wide hover:shadow-lg transform hover:scale-105 transition-all"
            >
              <a href="/my-trips" className='text-white font-semibold'>✨ My Trips</a>
            </Button>

            {/* User Profile Dropdown */}
            <Popover>
              <PopoverTrigger className="bg-transparent">
                <img className="h-10 w-10 rounded-full border border-gray-300 dark:border-gray-600 hover:scale-105 transition-transform" src={user.picture} alt="User" />
              </PopoverTrigger>
              <PopoverContent className="p-2 bg-white dark:bg-gray-800 shadow-md rounded-lg">
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    navigate("/");
                  }}
                >
                  Logout
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          // If User is Not Logged In
          <Button className="rounded-full px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white shadow-md transition-all" onClick={() => setOpenDialog(true)}>
            Sign in
          </Button>
        )}
      </div>

      {/* Sign In Dialog */}
      <Dialog open={openDialog}>
        <DialogContent className="bg-white dark:bg-gray-900 shadow-xl rounded-lg">
          <DialogHeader>
            <DialogDescription className="flex flex-col items-center">
              <img src="/logo.svg" alt="Logo" />
              <h2 className="font-bold text-lg mt-4">Sign In With Google</h2>
              <p className="text-gray-500 dark:text-gray-300">Sign in securely with Google authentication</p>
              <Button
                onClick={login}
                variant="outline"
                className="w-full mt-4 flex gap-4 items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              >
                <FcGoogle className="h-6 w-6" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}


export default Header
