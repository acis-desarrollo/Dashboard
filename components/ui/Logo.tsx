'use client'

import Image from "next/image";

export default function Logo() {
   return (
      <Image
         src={'/logo.svg'}
         alt="Logo ACIS Especialización"
         width={0}
         height={0}
         className="w-full"
         priority
      />
   )
}