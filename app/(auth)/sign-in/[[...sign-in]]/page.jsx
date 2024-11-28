import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="m-20 ml-[35%]">
      <SignIn />
    </div>
  );
}
