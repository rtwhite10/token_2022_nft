use anchor_lang::prelude::*;

declare_id!("73mDoPfiVb7MJtXchdzteB1APVzzzMHKYdrSU7R93B5S");

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
