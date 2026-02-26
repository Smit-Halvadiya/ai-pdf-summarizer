
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'

const User = () => {
  
  return (
    <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  )
}

export default User