import Image from "next/image";

export default function Icon() {
  return (
    <Image
      src="/logo.png"
      alt="GNC Logo"
      width={512}
      height={512}
    />
  );
}
