import { getSession } from "next-auth/react";

async function AboutUs() {
  const session = await getSession();
  console.log({ session });
  return <div>AboutUs</div>;
}

export default AboutUs;
