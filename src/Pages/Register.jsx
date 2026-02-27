import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import Lottie from 'lottie-react';
import successAnimation from '../json/success.json';
import { AuthContext } from '../provider/AuthProvider';

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };


  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.files[0];

    if (!image) return setError("Please upload a profile image.");
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      return setError("Password must be 6+ chars with uppercase, lowercase, number & special char.");
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("image", image);
      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`,
        formData
      );
      const imageUrl = imgRes.data.data.url;

      const result = await createUser(email, password);

      await updateProfile(result.user, {
        displayName: name,
        photoURL: imageUrl,
      });

      const userInfo = {
        name,
        email,
        image: imageUrl,
        role: "user",
      };
      await axios.post(`${import.meta.env.VITE_URL}/users`, userInfo);

      
      toast.success("Registration Successful!");
      form.reset();
      setPreview(null);
      navigate("/");

    } catch (err) {
      console.error(err);
      setError(err.code === 'auth/email-already-in-use' ? "Email already exists!" : err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden grid md:grid-cols-2">
        
        {/* Form section */}
        <div className="p-8 lg:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Create Account</h2>
            <p className="text-gray-500 mt-2">Join CampusMart today</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-600 block mb-1">Full Name</label>
              <input type="text" name="name" required placeholder="John Doe" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#524ffc] focus:ring-2 focus:ring-[#524ffc20] outline-none transition" />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-600 block mb-1">Email Address</label>
              <input type="email" name="email" required placeholder="example@email.com" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#524ffc] focus:ring-2 focus:ring-[#524ffc20] outline-none transition" />
            </div>

            <div className="grid grid-cols-2 gap-4 items-end">
              <div>
                <label className="text-sm font-semibold text-gray-600 block mb-1">Profile Photo</label>
                <input type="file" name="image" accept="image/*" onChange={handleImageChange} className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-[#524ffc10] file:text-[#524ffc] hover:file:bg-[#524ffc20] cursor-pointer" />
              </div>
              <div className="flex justify-center">
                {preview ? <img src={preview} className="w-12 h-12 rounded-xl object-cover border-2 border-[#524ffc]" alt="preview" /> : <div className="w-12 h-12 rounded-xl bg-gray-100 border-2 border-dashed border-gray-300"></div>}
              </div>
            </div>

            <div className="relative">
              <label className="text-sm font-semibold text-gray-600 block mb-1">Password</label>
              <input type={showPassword ? "text" : "password"} name="password" required placeholder="••••••••" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#524ffc] focus:ring-2 focus:ring-[#524ffc20] outline-none transition" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute bottom-3 right-3 text-gray-400 hover:text-gray-600">
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>

            {error && <p className="text-red-500 text-xs font-medium bg-red-50 p-2 rounded-md">{error}</p>}

            <button type="submit" disabled={loading} className={`w-full py-3 rounded-lg font-bold text-white shadow-lg transition-all ${loading ? "bg-gray-300 cursor-not-allowed" : "bg-[#524ffc] hover:bg-[#433ee5] shadow-blue-200"}`}>
              {loading ? "Processing..." : "Register Now"}
            </button>
          </form>
        </div>

        {/* Animation Section */}
        <div className="hidden md:flex bg-[#f8f9fe] items-center justify-center p-10">
          <Lottie animationData={successAnimation} loop={true} className="max-w-[350px]" />
        </div>
      </div>
    </div>
  );
};

export default Register;