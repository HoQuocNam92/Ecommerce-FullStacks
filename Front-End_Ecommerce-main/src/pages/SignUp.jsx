import SignUpForm from "@/components/Form/SignUpForm";
import Images from "@/components/Form/Images";

const SignUp = () => {
  return (
    <div className="container">
      <div className="flex justify-between gap-10  ">
        <div>
          <Images />
        </div>
        <div className="w-[500px] flex flex-col justify-center  ">
          <h2 className="text-4xl font-semibold font-inter">Create an account</h2>
          <p className="py-2">Enter your details below</p>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
