import LoginForm from "@/components/Form/LoginForm";
import Images from "@/components/Form/Images";

const Login = () => {
  return (
    <div className="container">
      <div className="flex justify-between gap-10  ">
        <div>
          <Images />
        </div>
        <div className="w-full flex flex-col justify-center  ">
          <h2 className="text-4xl font-semibold font-inter">
            Log in to Exclusive
          </h2>
          <p className="py-2">Enter your details below</p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
