import Header from "@/components/shared/Header";
import TransformationForm from "@/components/shared/TransformationForm";
import { transformationTypes } from "@/constants";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/actions/user.actions";
const AddTransformationPage = async ({
  params: { type },
}: SearchParamProps) => {
  const Transformation = transformationTypes[type];

  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);
  return (
    <>
      <Header title={Transformation.title} subtitle={Transformation.subTitle} />
      <TransformationForm
        action="Add"
        userId={user._id}
        type={Transformation.type as TransformationTypeKey}
        creditBalance={user.creditBalance}
      />
    </>
  );
};

export default AddTransformationPage;
