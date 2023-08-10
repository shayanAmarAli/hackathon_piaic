import { SignUp } from "@clerk/nextjs/app-beta";
 
export default function Page() {
  return <SignUp signInUrl="https://ecommerce-flame-delta.vercel.app/sign-in" />;
}