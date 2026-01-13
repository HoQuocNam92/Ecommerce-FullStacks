import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom";
import { signupSchema } from "@/schema/authSchemas"; // tách validate ra file riêng
import { Button } from "@/components/ui/button"
import { Loader2Icon } from "lucide-react"
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
const SignUpForm = () => {
  const signup = useAuthStore((state) => state.signup);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: yupResolver(signupSchema) });

  const onSubmit = async (data) => {
    try {
      const res = await signup(data);
      if (res) {
        toast.success("Đăng ký tài khoản thành công!", { duration: 1000 });
        navigate("/signin");
      }
    } catch (error) {
      toast.error(error || "Đăng ký tài khoản thất bại!", { duration: 1000 });
    }
  }

  return (
    <div className="space-y-4"  >
      <form onSubmit={handleSubmit(onSubmit)}   >

        <div className="py-1">
          <Input type="text" className="bg-white" placeholder="Name" {...register("name")} />
          {errors.name && <p className="text-red-700">{errors.name.message}</p>}
        </div>
        <div className="py-2">

          <Input type="email" className="bg-white" placeholder="Email"
            {...register("email")} />
          {errors.email && <p className="text-red-700">{errors.email.message}</p>}
        </div>

        <div className="py-1">
          <Input type="password" className="bg-white" placeholder="Password" {...register("password")} />
          {errors.password && <p className="text-red-700">{errors.password.message}</p>}

        </div>
        <div className="flex flex-col ">

          <Button type="submit" disabled={isSubmitting}  >Tạo tài khoản
            <span>
              {isSubmitting && <Loader2Icon className="animate-spin" />}
            </span></Button>

        </div>
      </form>
      <div className="flex  text-red  ">
        <div>
          <span>
            Đã có tài khoản
          </span><Link className="text-orange-600 ml-1 hover:text-blue-400" to="/auth/signin">Đăng nhập</Link>
        </div>

      </div>




    </div>
  );
};

export default SignUpForm;
