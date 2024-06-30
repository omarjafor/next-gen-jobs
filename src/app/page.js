import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

async function Home() {
  const profile = null;
  const user = await currentUser();
  console.log(user);
  if (!user) return <div>Not signed in</div>;
  if(user && !profile?._id) redirect('/onboard')

  return (
    <section>
      <div>Hello {user?.firstName}</div>
    </section>
  );
}

export default Home;
