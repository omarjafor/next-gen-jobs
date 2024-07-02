import { fetchProfileAction } from '@/actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

async function Home() {
  
  const user = await currentUser();
  if (!user) return <div>Not signed in</div>;
  
  const profile = await fetchProfileAction(user?.id);
  if(!profile?._id) redirect('/onboard')

  return (
    <section>
      <div>Hello {user?.firstName}</div>
    </section>
  );
}

export default Home;
