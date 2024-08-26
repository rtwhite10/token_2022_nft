import { createCollection, mplCore } from '@metaplex-foundation/mpl-core'
import { createUmi, generateSigner, publicKey } from '@metaplex-foundation/umi'


export const createNftCollection = async () => {
  const umi = createUmi().use(mplCore())

  const collectionSigner = generateSigner(umi)

  try {
    await createCollection(umi, {
      collection: collectionSigner,
      name: 'My NFT',
      uri: 'https://gateway.pinata.cloud/ipfs/QmNRQ2tttFrPWLFD4RG9py5DP8WkHwLV2qU6wig3QNs3AM',
      plugins: [
        {
          type: 'MasterEdition',
          maxSupply: 100,
          name: 'My Master Edition',
          uri: 'https://gateway.pinata.cloud/ipfs/QmNRQ2tttFrPWLFD4RG9py5DP8WkHwLV2qU6wig3QNs3AM',
        },
      ],
    }).sendAndConfirm(umi)

  } catch(err) {
    console.error(err)
  } finally {

  }
}


