pub use crate::errors::GameErrorCode;
pub use anchor_lang::prelude::*;
pub use session_keys::{ session_auth_or, Session, SessionError };
pub mod contexts;
pub mod errors;
pub use contexts::*;

declare_id!("CfWK53q7cVf3vNj6K6BfqmnUVKo1uDGFXujR9fKV7dd6");

#[program]
pub mod nft_2022 {
    use super::*;
    pub fn mint_nft(ctx: Context<MintNft>) -> Result<()> {
        mint_nft::mint_nft(ctx)
    }
}
