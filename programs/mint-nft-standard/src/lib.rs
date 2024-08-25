use anchor_lang::prelude::*;

declare_id!("G3DnvWBgoehH7bJMGWaVHUphGwK8Q2cXNChvsK6evF5H");

pub mod contexts;

pub use contexts::*;

#[program]
pub mod mint_nft_standard {

    use super::*;
    pub fn create_collection(ctx: Context<CreateCollection>) -> Result<()> {
        ctx.accounts.create_collection(&ctx.bumps)
    }
    
    pub fn mint_nft(ctx: Context<MintNFT>) -> Result<()> {
        ctx.accounts.mint_nft(&ctx.bumps)
    }

    pub fn verify_collection(ctx: Context<VerifyCollectionMint>) -> Result<()> {
        ctx.accounts.verify_collection(&ctx.bumps)
    }
}
