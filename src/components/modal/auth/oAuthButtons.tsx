import { Button, Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/src/firebase/clientApp";
import { User } from "firebase/auth";
import { setDoc, collection, doc } from "firebase/firestore";
const OAuthButtons = () => {
  const [signInWithGoogle, userCred, loading, userError] =
    useSignInWithGoogle(auth);
  const createUserDocument = async (user: User) => {
    const userDocRef = doc(firestore, "users", user.uid);
    await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
  };
  useEffect(() => {
    if (userCred) {
      createUserDocument(userCred.user);
    }
  }, [userCred]);
  return (
    <Flex direction={"column"} width={"100%"} mb={4}>
      <Button
        variant={"oauth"}
        mb={2}
        isLoading={loading}
        onClick={() => {
          signInWithGoogle();
        }}
      >
        <Image src={"/images/googlelogo.png"} height={"20px"} mr={4} />
        Continue With Google
      </Button>
      <Text textAlign={"center"} color={"red"} fontSize={"10pt"}>
        {userError?.message}
      </Text>
    </Flex>
  );
};
export default OAuthButtons;
