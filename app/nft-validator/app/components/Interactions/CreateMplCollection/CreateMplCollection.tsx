'use client'

import { createNftCollection } from "@/app/utils/metaplex/createCollection"
import { useWallet } from "@solana/wallet-adapter-react"

const CreateMplCollection = () => {
  const {} = useWallet();
  const handleClick = () => {
    createNftCollection()
  }
  return (
    <div>
      <button onClick={handleClick}>
        create collection
      </button>
    </div>
  )
}

export default CreateMplCollection;