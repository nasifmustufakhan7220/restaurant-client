interface InfoRowProps {
  icon: string;
  label: string;
  value: string;
}

// একটা আইকন, ছোট label আর মান: location/vendor দেখাতে ব্যবহার হবে
export default function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-lg">
        {icon}
      </span>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
}