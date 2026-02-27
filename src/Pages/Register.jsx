import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import loginAnimation from '../json/success.json';
import Lottie from 'lottie-react';
import { AuthContext } from '../provider/AuthProvider';

const Register = () => {
  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // New Loading State
  
  // Note: Check if these names match exactly what is in your AuthProvider
  const { handelWithRegister, SetUser } = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.files[0];

    // Basic Image Validation
    if (!image) {
      setError("Please upload a profile image.");
      setLoading(false);
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      setError("Password must be at least 6 characters and include uppercase, lowercase, number & special character.");
      setLoading(false);
      return;
    }

    try {
      // 1. Firebase Register
      const result = await handelWithRegister(email, password);

      // 2. Image Upload to ImgBB
      const formData = new FormData();
      formData.append("image", image);

      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`, 
        formData
      );
      const imageUrl = imgRes.data.data.url;

      // 3. Update Firebase Profile
      await updateProfile(result.user, {
        displayName: name,
        photoURL: imageUrl,
      });

      // 4. Save to your Backend Database
      const userInfo = {
        name,
        email,
        image: imageUrl,
        role: "user",
      };
      await axios.post(`${import.meta.env.VITE_URL}/users`, userInfo);


      toast.success("Registration successful!");
      form.reset();
      setPreview(null);
      navigate("/");

    } catch (err) {
      console.error("Registration error: ", err);
      if (err.code === 'auth/email-already-in-use') {
        setError("This email is already registered.");
      } else {
        toast.error(err.message || "Registration failed!");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="bg-gray-200 py-10 md:py-20 flex items-center justify-center px-4">
      <div className="w-full max-w-[1200px] h-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-white rounded-lg overflow-hidden shadow-xl">
        
        {/* Form Section */}
        <div className="h-full flex items-center justify-center bg-[#6f817b1a] p-6 md:p-10">
          <form onSubmit={handleRegister} className="w-full max-w-md space-y-5">
            <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Register</h2>

            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input type="text" name="name" required className="w-full px-4 py-2 border rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input type="email" name="email" required className="w-full px-4 py-2 border rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <label className="block mb-1 font-medium">Profile Image</label>
              <input type="file" name="image" accept="image/*" required onChange={handleImageChange} className="w-full border rounded-md bg-gray-50" />
              {preview && <img src={preview} alt="Preview" className="mt-2 w-20 h-20 object-cover rounded-full border-2 border-blue-500" />}
            </div>

            <div className="relative">
              <label className="block mb-1 font-medium">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                className="w-full px-4 py-2 border rounded-md bg-gray-50 pr-10 focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute bottom-3 right-3 cursor-pointer text-gray-600" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {error && <p className="text-red-600 text-sm font-semibold">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-md text-white transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>

      
        <div className="w-full hidden md:flex justify-center items-center p-4">
          <Lottie animationData={loginAnimation} loop={true} style={{ maxWidth: 400 }} />
        </div>

      </div>
    </div>
  );
};

export default Register;