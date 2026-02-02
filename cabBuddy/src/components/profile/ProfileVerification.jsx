import { Card } from "@/components/ui/card";
import VerificationRow from "./VerificationRow";

export default function ProfileVerification({ user }) {
  const v = user?.verified || {};

  return (
    <Card className="px-6 py-4">
      <h2 className="text-base md:text-lg font-semibold text-slate-900 mb-2">
        Verification
      </h2>
      <p className="text-xs text-slate-500 mb-4">
        Keep your profile verified to build trust with other CabBuddy users.
      </p>
      

      <div className="space-y-1">

        <VerificationRow
          label="Mobile number"
          value={user?.phone || "Not added"}
          verified={v.phone}
          actionLabel="Verify phone"
          actionRoute="/verify/phone"
        />

        <VerificationRow
          label="Email address"
          value={user?.email || "Not added"}
          verified={v.email}
          actionLabel="Verify email"
          actionRoute="/verify/email"
        />

        <VerificationRow
          label="Government ID"
          value={v.govtId ? "Uploaded" : "Not uploaded"}
          verified={v.govtId}
          actionLabel="Upload ID"
          actionRoute="/verify/govt-id"
        />

        <VerificationRow
          label="Driving license"
          value={v.drivingLicense ? "Added" : "Not added"}
          verified={v.drivingLicense}
          actionLabel="Add license"
          actionRoute="/verify/driving-license"
        />

      </div>
    </Card>
  );
}
