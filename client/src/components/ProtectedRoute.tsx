import React from "react";
import { Show } from "@clerk/react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Show when="signed-in">{children}</Show>

      <Show when="signed-out">
        <Navigate to={"/auth"} replace />
      </Show>
    </>
  );
}

export default ProtectedRoute;
