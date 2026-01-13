import { Input } from "@/components/ui";
import { Button } from "@/components/ui";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/schema/authSchemas"
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
const LoginForm = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const loginWithGoogle = useAuthStore((state) => state.loginWithGoogle);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (data) => {
    try {
      await login(data);

      toast.success("Đăng nhập thành công !", { duration: 1000 });
      navigate("/");
    } catch (error) {

      toast.error(error || "Đăng nhập thất bại", { duration: 1000 });

    }
  }


  const LoginWithGoogle = async (data) => {
    try {
      const id_token = data?.credential;

      await loginWithGoogle(id_token);

      toast.success("Đăng nhập thành công !", { duration: 1000 });
      navigate("/");
    } catch (error) {
      toast.error(error || "Đăng nhập thất bại", { duration: 1000 });

    }
  }
  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div >

        <Input type="email" className="bg-white" placeholder="Email" {...register("email")} />
        {errors.email && <p className="text-red-700">{errors.email.message}</p>}
      </div>

      <div  >
        <Input type="password" className="bg-white" placeholder="Password" {...register("password")} />
        {errors.password && <p className="text-red-700">{errors.password.message}</p>}

      </div>

      <div className="flex flex-col ">
        <Button type="submit">Đăng nhập
          <span>
            {isSubmitting && <Loader2Icon className="animate-spin" />}
          </span>
        </Button>




        <div className="mt-2">
          <GoogleOAuthProvider clientId={import.meta.env.VITE_ClientId}> <GoogleLogin
            onSuccess={LoginWithGoogle}
            onError={() => {
              console.log('Login Failed');
            }}
          />
          </GoogleOAuthProvider>

        </div>

      </div>
      <div className="flex justify-between text-red ">
        <div>
          <span>
            Chưa có tài khoản?
          </span><Link className="text-orange-600  hover:text-blue-400 ml-1" to="/SignUp">Đăng ký</Link>
        </div>
        <Link className="hover:text-blue-400" to="/forgot-password" >
          Quên mật khẩu ?</Link>
      </div>
    </form>
  );
};

export default LoginForm;
