
import { FcGoogle } from 'react-icons/fc';
import { Link, } from 'react-router-dom';
// import { AuthContext } from '../Provider/AuthProvider';
// import { toast } from 'react-toastify';
// import axios from 'axios';
import loginAnimation from '../json/Login.json'
import Lottie from 'lottie-react';

const Login = () => {
//   const { handleLoginwithEmail,handleLoginWithGoogle } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const from = location.state?.from?.pathname || '/';

//   const handelLogin = (e) => {
//     e.preventDefault();
//     const email = e.target.email.value;
//     const password = e.target.password.value;
//     console.log(email,password);
//     handleLoginwithEmail(email, password)
//       .then((result) => {
//         if (result?.user) {
//           toast.success('Login successful!');
//           setTimeout(() => {
//             navigate(from, { replace: true });
//           }, 1000);
//         } else {
//           toast.error('Login failed: User not found!');
//         }
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//         toast.error(`Login failed: ${error.message}`);
//       });
//   };

//   const handelLoginwithGoogle = ()=>{
//     handleLoginWithGoogle()
//    .then((result) => {
//       if ( result?.user?.photoURL) {
//         console.log(result?.user.photoURL);
//         toast.success('Login with Google successful!');
//         const userInfo = {
//           name: result?.user?.displayName,
//           email: result?.user?.email,
//           image: result?.user?.photoURL
//         };

//         axios.post("https://resturent-management-server-three.vercel.app/users", userInfo)
//           .then(res => {
//             console.log("User saved to DB:");
//           })
//           .catch(err => {
//             console.error("DB Save Error:", err);
//           });

//         setTimeout(() => {
//           navigate(from, { replace: true });
//         }, 1000);
//       } else {
//         toast.error('Google login failed!');
//       }
//     })
//     .catch((error) => {
//       console.error('Google Login Error:', error);
//       toast.error(`Google login failed: ${error.message}`);
//     });
//   }

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f6f8ff] to-[#e9efff] px-4">
  <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">

    {/* Form Section */}
    <div className="p-6 sm:p-10 flex flex-col justify-center">
      <h1 className="text-center text-sm font-semibold text-red-500 tracking-widest mb-2">
        WELCOME BACK TO FRESHEAT
      </h1>
      <h2 className="text-center text-3xl font-bold mb-8">
        Login to Your Account
      </h2>

      <form className="space-y-5">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="input input-bordered w-full bg-gray-50 focus:bg-white"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="input input-bordered w-full bg-gray-50 focus:bg-white"
            required
          />
          <div className="text-right mt-1">
            <Link to="/forgetpassword" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>
        </div>

        {/* Button */}
        <button className="btn btn-primary w-full mt-2">
          Login
        </button>

        {/* Register */}
        <p className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-red-500 font-semibold hover:underline">
            Register
          </Link>
        </p>
      </form>

      {/* Google Login */}
      <div className="mt-6">
        <button className="btn btn-outline w-full flex items-center justify-center gap-2">
          <FcGoogle size={20} />
          Login with Google
        </button>
      </div>
    </div>

    {/* Animation Section */}
    <div className="hidden lg:flex items-center justify-center bg-[#f3f6ff]">
      <Lottie
        animationData={loginAnimation}
        loop={true}
        className="w-[420px] h-[380px]"
      />
    </div>

  </div>
</div>


  );
};

export default Login;
