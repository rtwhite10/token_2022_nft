use anchor_lang::prelude::*;

declare_id!("EA9mJkzBu8cYSGFyMRwBVYfgS3MUn2SxUjWn1E1UBVTx");

#[program]
pub mod test_program {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
