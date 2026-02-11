import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { onAuthStateChanged } from "firebase/auth";
import { Center, Loader } from "@mantine/core";
import { auth } from "../services/firebase";
import type { ReactNode } from "react";

type ProtectedRouteProps = {
  children: ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [checked, setChecked] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthed(Boolean(user));
      setChecked(true);
    });
    return () => unsubscribe();
  }, []);

  if (!checked) {
    return (
      <Center mih="60vh">
        <Loader size="sm" />
      </Center>
    );
  }

  if (!isAuthed) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
