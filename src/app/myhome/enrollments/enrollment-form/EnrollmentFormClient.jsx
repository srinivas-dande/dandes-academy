"use client";

import { Suspense } from "react";
import EnrollmentFormInner from "./EnrollmentFormInner";

export default function EnrollmentFormClient() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <EnrollmentFormInner />
    </Suspense>
  );
}
